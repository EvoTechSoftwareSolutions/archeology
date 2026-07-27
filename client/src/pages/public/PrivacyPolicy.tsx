const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: `We collect information you provide directly to us, such as when you subscribe to our newsletter, contact us, or use interactive features of the platform. This may include your name, email address, and any messages you send us.

We also automatically collect certain information when you visit HeritageSriLanka, including IP address, browser type, pages viewed, and the date and time of your visit. This data is used solely to improve the platform experience.`,
    },
    {
      title: '2. How We Use Your Information',
      content: `We use the information we collect to:
• Provide, maintain, and improve our platform
• Send newsletters and heritage updates (only if you have subscribed)
• Respond to your comments and questions
• Monitor and analyse usage to improve the user experience
• Comply with legal obligations`,
    },
    {
      title: '3. Information Sharing',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
• With service providers who assist us in operating our platform (under strict confidentiality agreements)
• If required by law or to protect the rights and safety of HeritageSriLanka or others
• In connection with a merger, acquisition, or sale of assets`,
    },
    {
      title: '4. Cookies',
      content: `We use cookies and similar tracking technologies to improve your experience. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the platform may not function properly without cookies.`,
    },
    {
      title: '5. Data Security',
      content: `We take reasonable measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: '6. Third-Party Links',
      content: `Our platform may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies before providing any personal information.`,
    },
    {
      title: '7. Children\'s Privacy',
      content: `HeritageSriLanka is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.`,
    },
    {
      title: '8. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date. Your continued use of the platform after any changes constitutes your acceptance of the new policy.`,
    },
    {
      title: '9. Contact Us',
      content: `If you have any questions about this Privacy Policy, please contact us at:\ninfo@heritagesrilanka.lk\n+94 11 234 5678`,
    },
  ];

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[35vh] min-h-[240px] flex flex-col justify-center items-center text-center px-6"
        style={{ background: 'linear-gradient(135deg,#1C3A2E 0%,#2a4a3a 60%,#1C5F46 100%)' }}
      >
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-2">LEGAL</p>
        <h1 className="font-serif text-white text-[2.8rem] md:text-[4rem] font-bold uppercase tracking-wide">
          Privacy Policy
        </h1>
        <p className="text-white/60 text-sm mt-3">Effective Date: 1 January 2026</p>
      </section>

      <section className="max-w-[860px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[#4b5563] text-[1.05rem] leading-relaxed mb-10 border-l-4 border-[#C89B3C] pl-5 italic">
          HeritageSriLanka ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you visit our platform.
        </p>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-serif font-bold text-[#1f2937] text-[1.3rem] mb-3">{s.title}</h2>
              <p className="text-[#4b5563] text-[0.95rem] leading-[1.9] whitespace-pre-line">{s.content}</p>
              {i < sections.length - 1 && <div className="border-b border-[#E2DED5] mt-8" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
