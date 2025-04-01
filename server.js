const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Listing = require('./Listings')
const dotenv = require('dotenv');

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS, images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { console.log('Connected to MongoDB'); });


// Home Route: Sends an EJS-rendered HTML page
app.get('/', async (req, res) => {

    try {
        const listings = await Listing.find();
        const data = {
            title: 'Welcome to My Website',
            message: 'This is a fully rendered HTML page from the server!',
            items: listings
        };
        res.render('index', data);

    } catch (error) {
        res.status(500).send('Error fetching listings');
        console.log(error)
    }

    
  
  
});

// About Route (Optional Example)
app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us', description: 'We serve dynamic HTML!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
