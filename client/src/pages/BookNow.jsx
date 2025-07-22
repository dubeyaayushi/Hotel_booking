import React from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react'

const BookNow = () => {

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        reason: '',
        checkInDate: '',
        checkOutDate: '',
        days: 1,
        guests: 1
    });

    const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

     const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        'http://localhost:3000/api/bookings',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
//         alert('Booking confirmed! Check your email for details.');
//         navigate('/');
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || 'Booking failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

  toast.success('Booking confirmed!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.', {
        position: "top-center"
      });
    } finally {
      setIsLoading(false);
    }
  };



return (
    <div
        className="py-16 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen"
        style={{
            backgroundImage:
                "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
         <ToastContainer 
          position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
         />
        <form 
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-2xl space-y-8 mt-12 mb-12 border-2 border-blue-200">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Book Your Stay</h2>
            <div>
                <label className="block mb-2 font-semibold text-blue-800">Name</label>
                <input
                    type="text"
                     name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-blue-800">Email Address</label>
                <input
                    type="email"
                     name="email"
                     value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-blue-800">Reason for Visit</label>
                <input
                    type="text"
                     name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Business, Vacation, etc."
                    required
                />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex-1">
                    <label className="block mb-2 font-semibold text-blue-800">From</label>
                    <input
                        type="date"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        required
                    />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                    <label className="block mb-2 font-semibold text-blue-800">To</label>
                    <input
                        type="date"
                          name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block mb-2 font-semibold text-blue-800">Number of Days</label>
                <input
                    type="number"
                    name="days"
                     min="1"
                    value={formData.days}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Number of days"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold text-blue-800">Number of Guests</label>
                <input
                    type="number"
                    name="guests"
                     min="1"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Number of guests"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg  ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
            >
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>
        </form>
    </div>
)
}

export default BookNow