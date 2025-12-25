import { useState } from "react";
import ContactCard from "../views/ContactCard";
import NewsletterSignup from "../views/NewsletterSignup";
import PricingCards from "../views/PricingCards";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  // 1. useState to store 6 project-relevant fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    firmName: "",
    practiceArea: "General Law",
    inquiryType: "Demo Request",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Log the collected data as a clean JavaScript object to the console
    console.log("--- LawVerse AI Form Submission ---");
    console.log(formData);
    // store this form data to firestore
    const docRef = await addDoc(collection(db, "lawyers"), formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };
 
  // Consistent Tailwind styles for a "Legal Tech" look
  const inputStyle =
    "w-full bg-[#1a2a42] border border-gray-700 text-gray-100 px-4 py-3 rounded-md focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all";
  const labelStyle =
    "block text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2";

  return (
    <main className="relative overflow-hidden animated-gradient min-h-screen py-12 px-4">
      {/* Floating particles background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-2 text-fade-in">
            Contact <span className="text-cyan-400">LawVerse AI</span>
          </h1>
          <p className="text-gray-400 text-slide-right animate-delay-200">
            Deploy smart legal assistance to your practice today.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-[#16243a] p-8 rounded-xl border border-gray-800 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Field 1: Name */}
                <div>
                  <label className={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Attorney Name"
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Field 2: Email */}
                <div>
                  <label className={labelStyle}>Work Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@firm.com"
                    className={inputStyle}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Field 3: Firm Name */}
                <div>
                  <label className={labelStyle}>Law Firm / Organization</label>
                  <input
                    type="text"
                    name="firmName"
                    value={formData.firmName}
                    onChange={handleChange}
                    placeholder="Legal Group LLC"
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Field 4: Practice Area (Dropdown) */}
                <div>
                  <label className={labelStyle}>Practice Area</label>
                  <select
                    name="practiceArea"
                    value={formData.practiceArea}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="Corporate">Corporate Law</option>
                    <option value="Litigation">Litigation</option>
                    <option value="IP">Intellectual Property</option>
                    <option value="Family">Family Law</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Field 5: Inquiry Type */}
              <div>
                <label className={labelStyle}>How can our AI help?</label>
                <div className="flex gap-4 flex-wrap">
                  {["Demo Request", "Pricing", "Technical Support"].map(
                    (type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="inquiryType"
                          value={type}
                          checked={formData.inquiryType === type}
                          onChange={handleChange}
                          className="text-cyan-400 focus:ring-cyan-400 bg-gray-700 border-gray-600"
                        />
                        <span className="text-gray-300 text-sm">{type}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Field 6: Message */}
              <div>
                <label className={labelStyle}>Additional Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your legal automation needs..."
                  rows="4"
                  className={inputStyle}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#0f1c2e] font-black py-4 rounded-md transition-all transform hover:scale-[1.01] active:scale-95 shadow-lg"
              >
                REQUEST SMART ASSISTANCE
              </button>
            </form>

            {submitted && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500 text-emerald-400 rounded-md text-center animate-pulse">
                ✓ Strategy request submitted. Check your console for the data
                log!
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1a2a42] to-[#0f1c2e] p-8 rounded-xl border border-cyan-900/50">
              <h3 className="text-xl font-bold text-white mb-4">
                LawVerse AI Global
              </h3>
              <ul className="text-gray-400 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">📍</span>
                  101 Silicon Tower, Legal District, San Francisco, CA
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">📞</span>
                  +1 (800) LAW-AI-01
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✉️</span>
                  intelligence@lawverse.ai
                </li>
              </ul>
            </div>
            <ContactCard />
          </div>
        </div>

        {/* Supporting Sections */}
        <div className="mt-20 border-t border-gray-800 pt-16">
          <PricingCards />
          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
