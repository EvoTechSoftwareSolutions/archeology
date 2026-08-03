import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is HeritageSriLanka?',
        a: 'HeritageSriLanka is a digital heritage platform dedicated to documenting, preserving, and sharing information about Sri Lanka\'s archaeological and cultural heritage sites. We provide immersive digital journeys, historical context, and practical travel information for each site.',
      },
      {
        q: 'Is HeritageSriLanka free to use?',
        a: 'Yes, HeritageSriLanka is completely free to use. We believe heritage knowledge should be accessible to everyone. There are no subscription fees or paywalls.',
      },
      {
        q: 'How often is the content updated?',
        a: 'Our team continuously researches and updates information. Opening hours, entry fees, and contact details are reviewed regularly. Historical content is updated when new archaeological discoveries are made.',
      },
    ],
  },
  {
    category: 'Visiting Sites',
    questions: [
      {
        q: 'Are the opening hours on the platform accurate?',
        a: 'We strive to keep opening hours up to date, but we recommend confirming with the site directly before your visit, especially during public holidays and religious festivals such as Vesak or Esala Perahera.',
      },
      {
        q: 'Do I need to book tickets in advance?',
        a: 'Most heritage sites in Sri Lanka do not require advance booking. However, popular sites like Sigiriya and the Temple of the Sacred Tooth Relic can get very busy. Arriving early in the morning is recommended.',
      },
      {
        q: 'What should I wear when visiting temples?',
        a: 'When visiting temples and religious sites, modest dress is required. Cover your shoulders and knees. Remove shoes before entering shrine rooms. Sarongs are often available for hire at the entrance.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'How do I report incorrect information on the platform?',
        a: 'If you spot incorrect or outdated information, please contact us at info@heritagesrilanka.lk with the page name and the correction. We greatly appreciate community contributions to keeping the platform accurate.',
      },
      {
        q: 'Can I use images from HeritageSriLanka for my own project?',
        a: 'All images and content on HeritageSriLanka are protected by copyright. For permission to use our content, please contact us with details of your intended use. Commercial use without permission is not allowed.',
      },
      {
        q: 'How do I subscribe to the newsletter?',
        a: 'You can subscribe to our newsletter by entering your email address in the "Stay Updated" form in the footer of any page. We send periodic updates about new heritage content, discoveries, and events.',
      },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-[16px] overflow-hidden transition-all duration-200 ${open ? 'border-[#1C5F46]/40 bg-[#F4F9F7]' : 'border-gray-100 bg-white'}`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <span className="font-bold text-[#1f2937] text-[0.95rem] leading-snug">{q}</span>
        {open
          ? <FiChevronUp className="text-[#1C5F46] shrink-0" size={20} />
          : <FiChevronDown className="text-gray-400 shrink-0" size={20} />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-[#4b5563] text-[0.9rem] leading-relaxed border-t border-[#1C5F46]/10 pt-4">
          {a}
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[35vh] min-h-[240px] flex flex-col justify-center items-center text-center px-6"
        style={{ background: 'linear-gradient(135deg,#1C3A2E 0%,#2a4a3a 60%,#1C5F46 100%)' }}
      >
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-2">HELP & SUPPORT</p>
        <h1 className="font-serif text-white text-[2.8rem] md:text-[4rem] font-bold uppercase tracking-wide">
          FAQs
        </h1>
        <p className="text-white/70 text-sm mt-3 max-w-[400px]">
          Frequently asked questions about HeritageSriLanka and visiting heritage sites.
        </p>
      </section>

      <section className="max-w-[860px] mx-auto px-6 md:px-10 py-16 space-y-14">
        {faqs.map((cat, i) => (
          <div key={i}>
            <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-2">{cat.category}</p>
            <h2 className="font-serif text-[1.6rem] font-bold text-[#1f2937] mb-6">{cat.category} Questions</h2>
            <div className="space-y-3">
              {cat.questions.map((item, j) => (
                <FAQItem key={j} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div
          className="rounded-[24px] p-10 text-center"
          style={{ background: 'linear-gradient(135deg,#1C3A2E 0%,#1C5F46 100%)' }}
        >
          <h3 className="font-serif text-white text-[1.5rem] font-bold mb-2">Still have questions?</h3>
          <p className="text-white/70 text-sm mb-6">Our team is happy to help. Drop us a message.</p>
          <a
            href="/contact-us"
            className="inline-block px-8 py-3 rounded-full bg-[#C89B3C] text-white font-bold text-sm hover:bg-[#b08830] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQs;
