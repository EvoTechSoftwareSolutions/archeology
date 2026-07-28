const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Privacy Policy for Department of Archaeology',
      content: `www.archaeology.gov.lk
Last Update 2022.07.19

At Department of Archaeology, accessible from http://www.archaeology.gov.lk, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Department of Archaeology and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Department of Archaeology. This policy is not applicable to any information collected offline or via channels other than this website.
`,
    },
    {
      title: 'Consent',
      content: `By using our website, you hereby consent to our Privacy Policy and agree to its terms.`,
    },
    {
      title: 'Information We Collect',
      content: `The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect in various ways, including to:
• Provide, operate, and maintain our website
• Improve, personalize, and expand our website
• Understand and analyze how you use our website
• Develop new products, services, features, and functionality
• Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
• Send you emails
• Find and prevent fraud`,
    },
    {
      title: 'Log Files',
      content: `Department of Archaeology follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.`,
    },
    {
      title: 'Cookies and Web Beacons',
      content: `Like any other website, Department of Archaeology uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.`,
    },
    {
      title: 'Advertising Partners Privacy Policies',
      content: `You may consult this list to find the Privacy Policy for each of the advertising partners of Department of Archaeology. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Department of Archaeology, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that Department of Archaeology has no access to or control over these cookies that are used by third-party advertisers.`,
    },
    {
      title: 'Third Party Privacy Policies',
      content: `Department of Archaeology's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.`,
    },
    {
      title: 'CCPA Privacy Rights (Do Not Sell My Personal Information)',
      content: `Under the CCPA, among other rights, California consumers have the right to:
• Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
• Request that a business delete any personal data about the consumer that a business has collected.
• Request that a business that sells a consumer's personal data, not sell the consumer's personal data.
If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.`,
    },
    {
      title: 'GDPR Data Protection Rights',
      content: `We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
• The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.
• The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.
• The right to erasure – You have the right to request that we erase your personal data, under certain conditions.
• The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.
• The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.
• The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.`,
    },
    {
      title: "Children's Information",
      content: `Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Department of Archaeology does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions or require more information about our Privacy Policy, please contact us through the Department of Archaeology website or via the contact details provided on the site.`,
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
        <p className="text-white/60 text-sm mt-3">Effective Date: 19 July 2022</p>
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
