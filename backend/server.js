const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB successfully');
    console.log('Database URI:', process.env.MONGODB_URI);
})
.catch(err => {
    console.error('MongoDB connection error details:', {
        message: err.message,
        code: err.code,
        name: err.name
    });
});

// Add error handler for MongoDB connection
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    cart: { type: Array, default: [] }
});

const User = mongoose.model('User', userSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    bookingType: { type: String, required: true }, // New field
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Order Schema
const orderItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: 'Completed', enum: ['Pending', 'Processing', 'Completed', 'Cancelled'] }
});

const Order = mongoose.model('Order', orderSchema);

// Energy Usage Schema
const energyUsageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    appliances: { type: Array, required: true }, // Array of { name, usage (kWh) }
    totalUsage: { type: Number, required: true },
    totalCost: { type: Number, required: true }
});

const EnergyUsage = mongoose.model('EnergyUsage', energyUsageSchema);

// Register
app.post('/api/register', async (req, res) => {
    try {
        console.log('Register request received:', req.body);
        const { email, password, name } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword,
            name
        });

        await user.save();
        console.log('User registered successfully:', email);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        console.log('Login attempt for:', req.body.email);
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );

        console.log('Login successful for:', email);
        res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Create Booking
app.post('/api/bookings', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { name, email, date, time, bookingType } = req.body; // Include bookingType

        if (!name || !email || !date || !time || !bookingType) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const booking = new Booking({
            name,
            email,
            date,
            time,
            bookingType, // Save bookingType
            userId: decoded.userId // Associate booking with the logged-in user
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get Bookings
app.get('/api/bookings/user', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const bookings = await Booking.find({ userId: decoded.userId });
        res.json(bookings);
    } catch (error) {
        console.error('Error retrieving user bookings:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update Booking
app.put('/api/bookings/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { date, time, bookingType } = req.body;

        if (!date || !time || !bookingType) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const booking = await Booking.findOne({ _id: req.params.id, userId: decoded.userId });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.date = date;
        booking.time = time;
        booking.bookingType = bookingType;

        await booking.save();

        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create Order
app.post('/api/orders', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { items, totalAmount } = req.body;

        if (!items || !items.length || !totalAmount) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const order = new Order({
            userId: decoded.userId,
            items,
            totalAmount
        });

        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get User Orders
app.get('/api/orders/user', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const orders = await Order.find({ userId: decoded.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving user orders:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add Energy Usage
app.post('/api/energy-usage', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { appliances, totalUsage, totalCost } = req.body;

        if (!appliances || !totalUsage || !totalCost) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        const energyUsage = new EnergyUsage({
            userId: decoded.userId,
            appliances,
            totalUsage,
            totalCost
        });

        await energyUsage.save();
        res.status(201).json({ message: 'Energy usage saved successfully', energyUsage });
    } catch (error) {
        console.error('Error saving energy usage:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get Energy Usage History
app.get('/api/energy-usage', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const energyUsageHistory = await EnergyUsage.find({ userId: decoded.userId }).sort({ date: -1 });
        res.json(energyUsageHistory);
    } catch (error) {
        console.error('Error retrieving energy usage history:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete Energy Usage Entry
app.delete('/api/energy-usage/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const energyUsage = await EnergyUsage.findOne({ _id: req.params.id, userId: decoded.userId });

        if (!energyUsage) {
            return res.status(404).json({ message: 'Energy usage entry not found' });
        }

        await EnergyUsage.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Energy usage entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting energy usage entry:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
});

app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const booking = await Booking.findOne({ _id: req.params.id, userId: decoded.userId });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await Booking.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error('Error canceling booking:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.put('/api/user/password', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Cart endpoints
