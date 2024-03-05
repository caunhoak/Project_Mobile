const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://miracle:3HuVOyNlh6fcPokQ@loveship.xdv8apo.mongodb.net/?retryWrites=true&w=majority&appName=LoveShip', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));
app.use('/api/orders', require('./routes/orders'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
