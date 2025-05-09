

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;




// Connect to the database, then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});




































// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Create Express app
// const app = express();



// const allowOrigins = ['https://myprotfolio-eta-indol.vercel.app'];

// // app.use(cors({
// //   origin: function (origin,callback) {
// //     if(!origin || allowOrigins.includes(origin)){
// //       console.log('Origin:', origin);
// //     callback(null,true)
// //     } else{
// //       callback(new Error('Not allowed by CORS'))
// //     } 
// //   }
// // }))

// app.use(cors({
//   origin : '*',
// }))

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database connection
// connectDB()


// // Routes
// // app.use('/api/projects', require('./routes/projects'));
// // app.use('/api/contact', require('./routes/contact'));
// // app.use('/api/auth', require('./routes/auth'));


// app.use(app)


// // 

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// }); 






// // app.use(cors())
// // Middleware

// // CORS options
// // const corsOptions = {
// //   origin: "https://myprotfolio-eta-indol.vercel.app/", // your React client
// //   credentials: true, // allows cookies & headers like Authorization
// // };

// // app.use(cors(corsOptions));




// // Serve static assets in production
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, '../client/build')));
  
// //   app.get('*', (req, res) => {
// //     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// //   });
// // }





// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch((err) => console.error('MongoDB connection error:', err));




// // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({ message: 'Something went wrong!' });
// // });