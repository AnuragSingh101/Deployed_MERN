const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://db:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define a simple schema for the message
const messageSchema = new mongoose.Schema({
  message: String
});

const Message = mongoose.model('Message', messageSchema);

// Insert data if the database is empty
const insertDefaultData = async () => {
  const count = await Message.countDocuments({});
  if (count === 0) {
    const defaultMessage = new Message({ message: 'Hello from MongoDB!' });
    await defaultMessage.save();
    console.log('Default message inserted into MongoDB');
  }
};

// Call the function to insert default data
insertDefaultData();

// API endpoint to retrieve data
app.get('/api', async (req, res) => {
  const message = await Message.findOne({});
  res.json({ message: message ? message.message : 'No message found!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
