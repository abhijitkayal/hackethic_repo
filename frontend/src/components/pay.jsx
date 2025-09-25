import React from "react";
import axios from "axios";

export default function PaymentComponent() {
  const startPayment = async () => {
    try {
      // 1️⃣ Create order on backend
      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: 500, // INR 500
        currency: "INR",
      });

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // put your key id here (not secret)
        amount: data.amount,
        currency: data.currency,
        name: "My Shop",
        description: "Test Transaction",
        order_id: data.id,
        handler: async function (response) {
          // 3️⃣ Verify payment on backend
          const verifyRes = await axios.post("http://localhost:5000/verify-payment", response);
          if (verifyRes.data.success) {
            alert("Payment Successful ✅");
          } else {
            alert("Payment Verification Failed ❌");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={startPayment}>Pay ₹500</button>;
}
