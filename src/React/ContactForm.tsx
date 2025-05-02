import { useState } from "react";
import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.PUBLIC_SERVICE_ID;
const templateId = import.meta.env.PUBLIC_TEMPLATE_ID;
const publicKey = import.meta.env.PUBLIC_PUBLIC_KEY;

interface FormData {
  name: string;
  email: string;
  message: string;
  orderType: string;
  bookTheme: string;
  items: string;
  language: string;
  timeline: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    orderType: "",
    bookTheme: "",
    items: "",
    language: "",
    timeline: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    for (const field in formData) {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = "This field is required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    emailjs.sendForm(serviceId, templateId, e.currentTarget, publicKey).then(
      (result) => {
        console.log("Message:", result); 
        console.log("Message Sent:", result.text);
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          message: "",
          orderType: "",
          bookTheme: "",
          items: "",
          language: "",
          timeline: "",
        });
      },
      (error) => {
        console.error("Error:", error.text);
      }
    );
  };

  return (
    <form onSubmit={sendEmail} className="space-y-6">
      {/* Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Your Name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {" "}
          Email
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder="Your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Order Type */}
      <div className="mb-4">
        <label
          htmlFor="orderType"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Order Type
        </label>
        <select
          name="orderType"
          value={formData.orderType}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        >
          <option value="">Select an option</option>
          <option value="Flannel story set">Flannel story set</option>
          <option value="Printable activity set">Printable activity set</option>
          <option value="Bilingual flyer or chant">
            Bilingual flyer or chant
          </option>
          <option value="Custom book-based activity">
            Custom book-based activity
          </option>
        </select>
        {errors.orderType && (
          <p className="text-red-500 text-sm mt-1">{errors.orderType}</p>
        )}
      </div>

      {/* Book or Theme */}
      <div className="mb-4">
        <label
          htmlFor="bookTheme"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Book or Theme
        </label>
        <input
          name="bookTheme"
          value={formData.bookTheme}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        {errors.bookTheme && <p className="text-red-500 text-sm mt-1">{errors.bookTheme}</p>}
      </div>

      {/* Items or Characters */}
      <div className="mb-4">
        <label
          htmlFor="items"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Items or Characters
        </label>
        <input
          name="items"
          value={formData.items}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        {errors.items && <p className="text-red-500 text-sm mt-1">{errors.items}</p>}
      </div>

      {/* Language */}
      <div className="mb-4">
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Language Preference
        </label>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        >
          <option value="">Select an option</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Bilingual">Bilingual</option>
        </select>
        {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
      </div>

      {/* Timeline */}
      <div className="mb-4">
        <label
          htmlFor="timeline"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Completion Timeline
        </label>
        <select
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        >
          <option value="">Select an option</option>
          <option value="1-2 weeks">1-2 weeks</option>
          <option value="2-3 weeks">2-3 weeks</option>
          <option value="No rush">No rush</option>
        </select>
        {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
      </div>

      {/* Message */}
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <button type="submit" className="btn-primary">
        Send
      </button>

      {submitted && <p className="text-green-500 text-md mt-1">Your message was sent!</p>}
    </form>
  );
};

export default ContactForm;
