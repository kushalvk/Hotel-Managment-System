import ContainerBig from "../../Templates/ContainerBig.jsx";
import DynamicContainer from "../../Organisms/DynamicContainer.jsx";
import Map from "../../Atom/Map.jsx";

function ContactUs() {
    const contactDetails = [
        {
            title: "Our Address",
            content: "VK Hotel, 123 Address, Surat, Gujrat, India.",
        },
        {
            title: "Phone",
            content: "+91 1234567890",
        },
        {
            title: "Email",
            content: "VKHOTEL@gmail.com",
        },
        {
            title: "Customer Support",
            content:
                "For any inquiries or assistance, please reach out to our customer support team. We are available 24/7 to help with your needs.",
        },
        {
            title: "Follow Us",
            content:
                "Stay connected with us through social media. Follow us on Facebook and Instagram to get the latest updates and offers.",
        },
    ];

    return (
        <>
            <ContainerBig title={"Contact Us"}>
                {contactDetails.map((detail, index) => (
                    <DynamicContainer key={index} Datas={detail} heading={detail.title}
                                      contant={detail.content}/>
                ))}
                <Map />
            </ContainerBig>
        </>
    );
}

export default ContactUs;
