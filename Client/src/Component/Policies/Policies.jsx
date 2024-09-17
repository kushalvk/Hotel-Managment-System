function Policies() {
  const policies = [
    {
      title: "Check-in & Check-out",
      content:
        "Check-in time is from 2:00 PM, and check-out time is until 12:00 PM. Early check-in or late check-out may be available upon request and is subject to availability. Additional charges may apply.",
    },
    {
      title: "Cancellation Policy",
      content:
        "Cancellations made 48 hours prior to the arrival date will incur no charge. Cancellations made within 48 hours of the arrival date will be charged the first night’s stay.",
    },
    {
      title: "Pet Policy",
      content:
        "Pets are not allowed in the hotel premises. Service animals are permitted, and proper documentation is required at check-in.",
    },
    {
      title: "Smoking Policy",
      content:
        "Our hotel is a non-smoking property. Smoking is not allowed in any of the guest rooms or public areas. A cleaning fee will be charged for any violations.",
    },
    {
      title: "Payment Methods",
      content:
        "We accept all major credit cards, including Visa, MasterCard, and American Express. Cash payments are also accepted.",
    },
    {
      title: "Privacy Policy",
      content:
        "Your personal information is kept confidential and is used solely for the purpose of providing you with our services. We do not share your information with third parties without your consent.",
    },
  ];

  return (
    <>
      <div className="All-background-img">
        <h1 className="text-4xl font-bold text-center mb-10 text-white mx-9">
          Hotel Policies
        </h1>
        <div className="pb-7 text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {policies.map((policy, index) => (
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

export default Policies;
