import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
          <p className="text-gray-600">
            Have questions, feedback, or need assistance? Reach out to us using
            the contact details below or fill out our form.
          </p>

          <div className="mt-6 space-y-4 text-gray-700">
            <p>
              📍 <strong>Address:</strong> 281406 Mathura, India
            </p>
            <p>
              📞 <strong>Phone:</strong> +919876543210
            </p>
            <p>
              📩 <strong>Email:</strong> support@eshop.com
            </p>
          </div>

          {/* Contact Form */}
          <form className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 h-24"
              required
            ></textarea>
            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
              ✉️ Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
