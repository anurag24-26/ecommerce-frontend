import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
          <p className="text-gray-600 leading-relaxed">
            Welcome to{" "}
            <span className="font-semibold text-blue-600">EShop</span>, your
            go-to destination for high-quality products and exceptional customer
            service. Our mission is to provide the best online shopping
            experience with a seamless and secure platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">
            Our Values
          </h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>✔️ High-quality and innovative products</li>
            <li>✔️ Customer-first approach</li>
            <li>✔️ Secure and reliable transactions</li>
            <li>✔️ Fast and hassle-free delivery</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6">
            Why Shop With Us?
          </h2>
          <p className="text-gray-600">
            We focus on bringing a curated selection of products at competitive
            prices, making sure our customers always get the best deals and
            satisfaction.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
