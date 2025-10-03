
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors');
require('dotenv').config();

console.log('Razorpay Key:', process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Secret:', process.env.RAZORPAY_KEY_SECRET ? 'Loaded' : ' Missing');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.options(/.*/, (req, res) => {
  console.log(`OPTIONS request for: ${req.path}`);
  console.log('Headers:', req.headers);
  
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,Cache-Control');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  
  res.status(200).end();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Origin:', req.headers.origin);
  
  if (req.method === 'OPTIONS') {
    console.log('PREFLIGHT REQUEST');
  }
  
  next();
});

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error(' Missing Razorpay credentials in environment variables');
  console.log('Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your .env file');
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function testRazorpayConnection() {
  try {
    const testOrder = await razorpay.orders.create({
      amount: 100,
      currency: 'INR',
      receipt: `test_receipt_${Date.now()}`,
      notes: { test: 'connection_test' }
    });
    console.log('Razorpay connection successful - Test order created:', testOrder.id);
  } catch (error) {
    console.error('Razorpay connection test failed:', error.error || error.message);
  }
}

testRazorpayConnection();


// const nodemailer = require('nodemailer');

// //  Configure your email transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,       // e.g., smtp.gmail.com
//   port: process.env.EMAIL_PORT || 587,
//   secure: false,                       // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,      // your email
//     pass: process.env.EMAIL_PASS       // your email password or app password
//   },
// });

//  Function to send payment confirmation email
// async function sendPaymentConfirmationEmail({
//   studentName,
//   studentEmail,
//   course,
//   amount,
//   paymentId,
// }) {
  // const mailOptions = {
  //   from: `"CyberSec Academy" <${process.env.EMAIL_USER}>`,
  //   to: studentEmail,
  //   subject: `Payment Confirmation - ${course}`,
  //   html: `
  //     <h2>Payment Successful </h2>
  //     <p>Hi <b>${studentName}</b>,</p>
  //     <p>Thank you for enrolling in <b>${course}</b>.</p>
  //     <p><b>Payment ID:</b> ${paymentId}</p>
  //     <p><b>Amount Paid:</b> ₹${(amount / 100).toFixed(2)}</p>
  //     <p>We’re excited to have you onboard </p>
  //     <p>— CyberSec Academy</p>
  //   `
  // };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(` Confirmation email sent to ${studentEmail}`);
//   } catch (error) {
//     console.error('Failed to send email:', error.message);
//   }
// }

app.get('/api/health', async (req, res) => {
  let razorpayStatus = 'unknown';
  
  try {
    const testOrder = await razorpay.orders.create({
      amount: 100,
      currency: 'INR',
      receipt: `health_check_${Date.now()}`,
      notes: { test: 'health_check' }
    });
    razorpayStatus = 'connected';
  } catch (error) {
    razorpayStatus = 'failed';
  }

  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    port: PORT,
    razorpay_status: razorpayStatus,
    cors_origin: req.headers.origin || 'no-origin',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/cors-test', (req, res) => {
  console.log('CORS test endpoint hit');
  res.json({ 
    success: true,
    message: 'CORS is working correctly!',
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
    method: req.method
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'CyberSec Academy Payment Server',
    endpoints: ['/api/health', '/api/cors-test', '/api/create-order', '/api/verify-payment'],
    cors_enabled: true
  });
});

app.post('/api/create-order', async (req, res) => {
  try {
    console.log('=== CREATE ORDER REQUEST ===');
    console.log('Body:', req.body);
    console.log('Headers:', req.headers);
    console.log('Origin:', req.headers.origin);
    
    const { amount, currency = 'INR', course, studentName, studentEmail, coupon } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid amount. Amount must be greater than 0' 
      });
    }

    if (!course || !studentName || !studentEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: course, studentName, studentEmail' 
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(studentEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    const options = {
      amount: parseInt(amount),
      currency: currency.toUpperCase(),
      receipt: `receipt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      notes: { 
        course: course.substring(0, 100),
        studentName: studentName.substring(0, 100),
        studentEmail: studentEmail.substring(0, 100),
        coupon: coupon ? coupon.substring(0, 20) : 'none',
        created_at: new Date().toISOString()
      },
      payment_capture: 1
    };

    console.log('Creating Razorpay order with options:', options);

    const order = await razorpay.orders.create(options);
    
    console.log('Order created successfully:', order.id);

    res.json({ 
      success: true, 
      order: order,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error(' Error creating order:', error);
    
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.error?.description || 'Razorpay API error',
        error_code: error.error?.code
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

app.post('/api/verify-payment', async (req, res) => {
  try {
    console.log('=== VERIFY PAYMENT REQUEST ===');
    console.log('Body:', req.body);
    
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      course,
      studentName,
      studentEmail 
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing payment verification data' 
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      try {
        const payment = await razorpay.payments.fetch(razorpay_payment_id);
        console.log('Payment verified successfully:', {
          studentName,
          studentEmail,
          course,
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
          amount: payment.amount,
          status: payment.status
        });
        await sendPaymentConfirmationEmail({
      studentName,
      studentEmail,
      course,
      amount: payment.amount,
      paymentId: razorpay_payment_id
    });

        res.json({ 
          success: true, 
          message: "Payment verified successfully",
          payment_details: {
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            method: payment.method
          }
        });
      } catch (fetchError) {
        console.error('Error fetching payment details:', fetchError);
        res.json({ 
          success: true, 
          message: "Payment verified successfully"
        });
      }
    } else {
      console.error('Payment verification failed - signature mismatch');
      res.status(400).json({ 
        success: false, 
        message: "Payment verification failed - invalid signature" 
      });
    }

  } catch (error) {
    console.error(' Error verifying payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Payment verification failed due to server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

app.get('/api/test-razorpay', async (req, res) => {
  try {
    const testOrder = await razorpay.orders.create({
      amount: 100,
      currency: 'INR',
      receipt: `test_${Date.now()}`,
      notes: { test: 'manual_test' }
    });
    
    res.json({
      success: true,
      message: 'Razorpay connection working',
      test_order_id: testOrder.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Razorpay connection failed',
      error: error.error || error.message
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    available_routes: ['/api/health', '/api/cors-test', '/api/create-order', '/api/verify-payment', '/api/test-razorpay']
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received');
  process.exit(0);
});


app.listen(PORT, () => {
console.log("listening");
});

module.exports = app;