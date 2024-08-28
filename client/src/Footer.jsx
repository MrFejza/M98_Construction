const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10  ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">M98 Construction</h2>
            <p className="text-gray-400">Leading the industry in quality and innovation.</p>
          </div>
          {/* Navigation Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul>
              <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-400">Email: info@m98construction.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
            <p className="text-gray-400">1234 Street Address, City, State, 12345</p>
          </div>
        </div>
        {/* Social Media Links */}
        <div className="flex justify-center mt-8 space-x-6">
          <a href="https://facebook.com" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        {/* Copyright Information */}
        <div className="mt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} M98 Construction. All rights reserved.<br/> Developed by Ergis Fejza.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
