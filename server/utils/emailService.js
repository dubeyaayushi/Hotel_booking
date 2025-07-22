import nodemailer from 'nodemailer';

// 1. Configure Mailtrap SMTP
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  // port: 2525,
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER, // From .env
    pass: process.env.MAILTRAP_PASS  // From .env
  },
  tls: {
    // Only add this for local development/testing
    rejectUnauthorized: false // ⚠️ Remove this in production!
  }
});

// 2. Email Sending Function
export const sendBookingEmail = async (userEmail, bookingDetails) => {
 
   const { guests, checkInDate, checkOutDate } = bookingDetails;

  // Format dates (e.g., "June 15, 2024")
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  try {
    await transporter.sendMail({
      from: '"Hotel Booking" <no-reply@example.com>', // Fake sender
      to: userEmail,
      subject: "Booking Confirmed!",
      text: `Your booking for ${guests} guests from ${formatDate(checkInDate)} to ${formatDate(checkOutDate)} is confirmed. Enjoy your stay!`,
    });
    console.log("Email sent to:", userEmail);
  } catch (error) {
    console.error("Email failed:", error);
    throw error; // Let controller handle it
  }
};