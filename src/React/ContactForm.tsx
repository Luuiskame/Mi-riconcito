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

interface FormProps {
  lang: string;
}

const ContactForm = (lang: FormProps) => {
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
          {lang.lang === "en" ? "Your Name" : "Tu Nombre"}
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder={lang.lang === "en" ? "Your name" : "Tu nombre"}
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
         {lang.lang === "en" ? "Email" : "Correo Electrónico"}
        </label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder={lang.lang === "en" ? "Your email" : "Tu correo electrónico"}
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
          {lang.lang === "en" ? "Order Type" : "Tipo de pedido"}
        </label>
        <select
          name="orderType"
          value={formData.orderType}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        >
          <option value="">{lang.lang === "en" ? "Select an option" : "Selecciona una opción"}</option>
          <option value="Flannel story set">{lang.lang === "en" ? "Flannel story set" : "Conjunto de historias flan"}</option>
          <option value="Printable activity set">Printable activity set</option>
          <option value="Bilingual flyer or chant">
            {lang.lang === "en" ? "Bilingual flyer or chant" : "Estampilla bilingüe o canto"}
          </option>
          <option value="Custom book-based activity">
            {lang.lang === "en" ? "Custom book-based activity" : "Actividad basada en libros personalizada"}
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
          {lang.lang === "en" ? "Book or Theme" : "Libro o Tema"}
        </label>
        <input
          name="bookTheme"
          value={formData.bookTheme}
          onChange={handleChange}
          placeholder={lang.lang === "en" ? "Book or theme" : "Libro o tema"}
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
          {lang.lang === "en" ? "Items or Characters" : "Objetos o Personajes"}
        </label>
        <input
          name="items"
          value={formData.items}
          onChange={handleChange}
          placeholder={lang.lang === "en" ? "Items or characters" : "Objetos o personajes"}
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
          {lang.lang === "en" ? "Language Preference" : "Preferencia de idioma"}
        </label>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        >
          <option value="">{lang.lang === "en" ? "Select an option" : "Selecciona una opción"}</option>
          <option value="English">{lang.lang === "en" ? "English" : "Inglés"}</option>
          <option value="Spanish">{lang.lang === "en" ? "Spanish" : "Español"}</option>
          <option value="Bilingual">{lang.lang === "en" ? "Bilingual" : "Bilingüe"}</option>
        </select>
        {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
      </div>

      {/* Timeline */}
      <div className="mb-4">
        <label
          htmlFor="timeline"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {lang.lang === "en" ? "Completion Timeline" : "Plazos de finalización"}
        </label>
        <select
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        >
          <option value="">{lang.lang === "en" ? "Select an option" : "Selecciona una opción"}</option>
          <option value="1-2 weeks">{lang.lang === "en" ? "1-2 weeks" : "1-2 semanas"}</option>
          <option value="2-3 weeks">{lang.lang === "en" ? "2-3 weeks" : "2-3 semanas"}</option>
          <option value="No rush">{lang.lang === "en" ? "No rush" : "Sin prisas"}</option>
        </select>
        {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
      </div>

      {/* Message */}
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {lang.lang === "en" ? "Message" : "Mensaje"}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={lang.lang === "en" ? "Message" : "Mensaje"}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <button type="submit" className="btn-primary">
        {lang.lang === "en" ? "Send" : "Enviar"}
      </button>

      {submitted && <p className="text-green-500 text-md mt-1">{lang.lang === "en" ? "Your message was sent!" : "¡Tu mensaje ha sido enviado!"}</p>}
    </form>
  );
};

export default ContactForm;
