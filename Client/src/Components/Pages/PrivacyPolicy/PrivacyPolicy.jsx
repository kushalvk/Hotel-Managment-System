import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DynamicContainer from "../../Organisms/DynamicContainer.jsx";
import ContainerBig from "../../Templates/ContainerBig.jsx";

function PrivacyPolicy() {

  const navigate = useNavigate()

  // without login it can't work on this
  useEffect(() => {
    !localStorage.getItem("token") ? navigate("/") : null
  })

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
      <ContainerBig title={"Privacy Policy"}>
        {privacyPolicies.map((policy, index) => (
            <DynamicContainer key={index} Datas={policy} heading={policy.title}
                              contant={policy.content}/>
        ))}
      </ContainerBig>
    </>
  );
}

export default PrivacyPolicy;
