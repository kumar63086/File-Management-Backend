const express = require('express');
const cors = require('cors');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const globalErrorHandler = require('./src/middlewares/globalErrorHandler');  
const bodyParser = require('body-parser'); 
// Security middleware
app.use(helmet())
// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded()
app.use(cors({
  origin: [process.env.CORS_ORIGIN],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(jsonParser);
app.use(urlencodedParser);
app.use('/uploads', express.static(__dirname + '/src/uploads'));
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.get('/auth/health-check', (req, res) => {
  res.status(200).json({ message: 'Healthy', status: 'OK' });
});
const v1Router = require('./src/routes');
//main Routes
app.use('/api', v1Router);
// Global error handler (last middleware)
app.use(globalErrorHandler);
module.exports = app;