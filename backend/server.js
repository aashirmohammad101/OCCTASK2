const express = require('express'); //fetches the express package
const app= express(); //app holds express
const PORT =3000; // You can add any PORT of your choice
app.get('/',(req,res) =>{
 //send back hello from backend or your custom message
 res.send('Hello from backend');
});
app.listen(PORT,() =>
console.log(`SERVER running on http://localhost:${PORT}`)
);
