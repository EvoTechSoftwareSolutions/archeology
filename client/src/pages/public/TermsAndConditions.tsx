const TermsAndConditions = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using HeritageSriLanka ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access the Platform.`,
    },
    {
      title: '2. Use of the Platform',
      content: `You may use HeritageSriLanka for lawful, personal, non-commercial purposes only. You agree not to:
• Reproduce, duplicate, or copy content from the Platform for commercial use without written permission
• Use the Platform to transmit unsolicited or unauthorised advertising or promotional material
• Attempt to gain unauthorised access to any part of the Platform or its related systems
• Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Platform`,
    },
    {
      title: '3. Intellectual Property',
      content: `All content on HeritageSriLanka — including text, photographs, illustrations, logos, and software — is the property of HeritageSriLanka or its content suppliers and is protected by applicable intellectual property laws.

You may not reproduce, distribute, or create derivative works from any content on this Platform without express written permission.`,
    },
    {
      title: '4. Accuracy of Information',
      content: `We strive to provide accurate and up-to-date information about heritage sites and archaeological locations in Sri Lanka. However, we make no warranties or representations about the completeness, accuracy, or reliability of any content on the Platform. You should verify critical information (such as opening hours and entry fees) with official sources before visiting any site.`,
    },
    {
      title: '5. Third-Party Links',
      content: `The Platform may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.`,
    },
    {
      title: '6. Disclaimer of Warranties',
      content: `The Platform is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. To the fullest extent permissible by applicable law, we disclaim all warranties, including implied warranties of merchantability and fitness for a particular purpose.`,
    },
    {
      title: '7. Limitation of Liability',
      content: `To the maximum extent permitted by law, HeritageSriLanka shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use the Platform.`,
    },
    {
      title: '8. Governing Law',
      content: `These Terms shall be governed and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.`,
    },
    {
      title: '9. Changes to Terms',
      content: `We reserve the right to modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of this page. Your continued use of the Platform after any changes constitutes your acceptance of the revised Terms.`,
    },
    {
      title: '10. Contact',
      content: `For questions about these Terms and Conditions, please contact us:\ninfo@heritagesrilanka.lk\n+94 11 234 5678`,
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
        <h1 className="font-serif text-white text-[2.4rem] md:text-[3.5rem] font-bold uppercase tracking-wide text-center">
          Terms &amp; Conditions
        </h1>
        <p className="text-white/60 text-sm mt-3">Effective Date: 1 January 2026</p>
      </section>

      <section className="max-w-[860px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[#4b5563] text-[1.05rem] leading-relaxed mb-10 border-l-4 border-[#C89B3C] pl-5 italic">
          Please read these Terms and Conditions carefully before using HeritageSriLanka. These terms govern your access to and use of our platform.
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

export default TermsAndConditions;
