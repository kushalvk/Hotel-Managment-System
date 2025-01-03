import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DynamicContainer from "../../Organisms/DynamicContainer.jsx";
import ContainerBig from "../../Templates/ContainerBig.jsx";

function Policies() {

    const navigate = useNavigate()

    // without login it can't work on this
    useEffect(() => {
        !localStorage.getItem("token") ? navigate("/") : null
    })

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
            <ContainerBig title={"Hotel Policies"}>
                {policies.map((policy, index) => (
                    <DynamicContainer key={index} Datas={policy} heading={policy.title}
                                      contant={policy.content}/>
                ))}
            </ContainerBig>
        </>
    );
}

export default Policies;
