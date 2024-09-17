import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TermsConditions() {

  const navigate = useNavigate()

  // without login it can't work on this
  useEffect(() => {
    !localStorage.getItem("token") ? navigate("/") : null
  })

  const termsConditions = [
    {
      title: "Acceptance of Terms",
      content:
        "By using our website and services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.",
    },
    {
      title: "Use of Services",
      content:
        "You agree to use our services for lawful purposes only and in a way that does not infringe the rights of others. You must not use our services to distribute harmful or unlawful content.",
    },
    {
      title: "Booking and Payments",
      content:
        "All bookings made through our website are subject to availability. Payments must be made at the time of booking, and any applicable taxes and fees will be included in the total price.",
    },
    {
      title: "Cancellation and Refunds",
      content:
        "Cancellations must be made within the specified time frame to be eligible for a refund. Refunds will be processed according to our refund policy, which may vary depending on the type of booking.",
    },
    {
      title: "Limitation of Liability",
      content:
        "We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services, except as required by law.",
    },
    {
      title: "Governing Law",
      content:
        "These Terms and Conditions are governed by the laws of the jurisdiction in which our hotel is located. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in that jurisdiction.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these Terms and Conditions, please contact us at terms@VKHOTEL.com.",
    },
  ];

  return (
    <>
      <div className="All-background-img">
        <h1 className="pt-2 text-4xl font-bold text-center mb-10 text-white m-9">
          Terms & Conditions
        </h1>
        <div className="pb-7 text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {termsConditions.map((term, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">
                  {term.title}
                </h2>
                <p className="text-lg text-gray-800">{term.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsConditions;
