import { useState } from "react";
import { contactService } from "../../services/contact.service";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheck,
  FiPrinter,
} from "react-icons/fi";

const ContactUs = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    setIsLoading(true);

    try {
      await contactService.createMessage(form);

      setSent(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSent(false);
      }, 4000);
    } catch (error: any) {
      setError(error.message || "Unable to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[40vh] min-h-[260px] flex flex-col justify-center items-center text-center px-6"
        style={{
          background:
            "linear-gradient(135deg,#1C3A2E 0%,#2a4a3a 60%,#1C5F46 100%)",
        }}
      >
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-2">
          GET IN TOUCH
        </p>
        <h1 className="font-serif text-white text-[2.8rem] md:text-[4rem] font-bold uppercase tracking-wide">
          Contact Us
        </h1>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">
          {/* Form */}
          <div>
            <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-2">
              SEND A MESSAGE
            </p>
            <h2 className="font-serif text-[2rem] font-bold text-[#1f2937] mb-8">
              We'd love to hear from you
            </h2>

            {sent && (
              <div className="flex items-center gap-3 bg-[#E8F3EE] border border-[#1C5F46]/30 rounded-[14px] p-4 mb-6 text-[#1C5F46] font-bold text-sm">
                <FiCheck size={18} /> Your message has been sent! We'll get back
                to you shortly.
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-[14px] p-4 mb-6 text-red-600 font-bold text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#1f2937] font-bold text-sm mb-1.5">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-white outline-none focus:border-[#1C5F46] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#1f2937] font-bold text-sm mb-1.5">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-white outline-none focus:border-[#1C5F46] text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#1f2937] font-bold text-sm mb-1.5">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-white outline-none focus:border-[#1C5F46] text-sm"
                />
              </div>
              <div>
                <label className="block text-[#1f2937] font-bold text-sm mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell us more..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-[12px] border border-gray-200 bg-white outline-none focus:border-[#1C5F46] text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#1C5F46] text-white font-bold text-sm hover:bg-[#154633] transition-colors shadow-md disabled:opacity-70"
              >
                <FiSend size={16} /> {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-2">
              CONTACT DETAILS
            </p>
            <h2 className="font-serif text-[1.8rem] font-bold text-[#1f2937] mb-6">
              Reach Us Directly
            </h2>

            {[
              {
                icon: FiMail,
                label: "Email",
                value: "info@archaeology.gov.lk",
                href: "mailto:info@archaeology.gov.lk",
              },
              {
                icon: FiPhone,
                label: "Phone",
                value: "+94 11 2692840, +94 11 2692841",
                href: "tel:+94112692840",
              },
              {
                icon: FiPrinter,
                label: "Fax",
                value: "+94 11 2696250",
                href: "#",
              },
              {
                icon: FiMapPin,
                label: "Address",
                value:
                  "Department of Archaeology, Sir Marcus Fernando Mawatha, Colombo - 07, Sri Lanka.",
                href: "#",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="flex items-start gap-4 bg-white rounded-[18px] p-5 border border-gray-100 shadow-sm hover:border-[#1C5F46]/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8F3EE] flex items-center justify-center shrink-0 group-hover:bg-[#1C5F46] transition-colors">
                  <item.icon
                    className="text-[#1C5F46] group-hover:text-white transition-colors"
                    size={18}
                  />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] uppercase tracking-wide font-bold mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-[#1f2937] font-bold text-[0.95rem]">
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Map */}
            <div className="rounded-[18px] overflow-hidden border border-gray-100 shadow-sm h-[200px]">
              <iframe
                title="Department of Archaeology Map"
                src="https://maps.google.com/maps?q=Department%20of%20Archaeology%2C%20Sir%20Marcus%20Fernando%20Mawatha%2C%20Colombo%2007%2C%20Sri%20Lanka&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
