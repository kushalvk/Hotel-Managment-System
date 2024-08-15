function PrivacyPolicy() {
  const privacyPolicies = [
    {
      title: "Introduction",
      content:
        "We at VK Hotel are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information.",
    },
    {
      title: "Information Collection",
      content:
        "We collect personal information when you make a reservation, register for an account, or interact with our website. This includes your name, email address, phone number, and payment information.",
    },
    {
      title: "Use of Information",
      content:
        "Your information is used to process bookings, improve our services, and communicate with you. We may also use your data for marketing purposes, with your consent.",
    },
    {
      title: "Data Sharing",
      content:
        "We do not sell or rent your personal information to third parties. We may share your data with trusted partners who assist in providing our services, such as payment processors or email service providers.",
    },
    {
      title: "Security",
      content:
        "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You may also opt-out of marketing communications at any time.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about our Privacy Policy, please contact us at privacy@VKHOTEL.com.",
    },
  ];

  return (
    <>
      <div className="All-background-img">
        <h1 className="text-4xl font-bold text-center mb-10 text-white m-9">
          Privacy & Policy
        </h1>
        <div className="All-background-img text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {privacyPolicies.map((policy, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">
                  {policy.title}
                </h2>
                <p className="text-lg text-gray-800">{policy.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
