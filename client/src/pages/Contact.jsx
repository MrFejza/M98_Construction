import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  function ContactForm() {
    const [state, handleSubmit] = useForm("mrbzrdnn");
    if (state.succeeded) {
        return <p className="text-green-600 text-center">Thanks for joining!</p>;
    }
    return (
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className="text-red-600 mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          ></textarea>
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
            className="text-red-600 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-500 transition-colors"
          disabled={state.submitting}
        >
          Submit
        </button>
      </form>
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-lg mb-4">
              <span className="font-semibold">Address:</span> 123 Main Street, Cityville, ST 12345
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Phone:</span> (123) 456-7890
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold">Email:</span> <a href="mailto:info@m98construction.com" className="text-blue-600">info@m98construction.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
