import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_API_KEY); // Replace with your key

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('booking');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent on the backend
      const { data } = await axios.post('http://localhost:3000/backend/payments/makepayment', { amount });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setStatus(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === 'succeeded') {
        setStatus('Payment successful!');
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
   <div className=' bg-neutral-300 dark:bg-slate-800 min-h-screen py-10 px-5'>
    <div className="max-w-md mx-auto p-6 bg-neutral-300 dark:bg-slate-800 border border-gray-500 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-purple-300 mb-6">Make a Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-2 dark:text-purple-300">
            Purpose:
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="booking">Pay for Booking</option>
            <option value="donation">Donate to Trust</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-2 dark:text-purple-300">
            Amount (₹):
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={100}
            className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <label className="block text-gray-600 text-sm font-semibold dark:text-purple-300">
            Card Details:
          </label>
        <div className="p-3 border border-gray-300 rounded-md bg-white">
          <CardElement />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full p-3 text-white bg-green-500 rounded-md hover:bg-green-600 disabled:opacity-50"
        >
          Pay
        </button>
      </form>
      {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
    </div>
   </div> 
  );
};

const DonationPage = () => (
  <Elements stripe={stripePromise}>
    <DonationForm />
  </Elements>
);

export default DonationPage;
