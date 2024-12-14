import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setStatus("Please fill in all fields.");
      return;
    }

    // Simulate form submission
    setStatus("Submitting...");

    setTimeout(() => {
      setStatus("Thank you for contacting us. We will get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" }); // Clear form
    }, 2000);
  };

  return (
    
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Contact Us
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-600"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Your Phone Number"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
              placeholder="Your Message"
            ></textarea>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>

        {status && (
          <div className="mt-4 text-center text-sm text-gray-500">{status}</div>
        )}
      </div>
    </Layout>
  );
};

export default ContactUs;
