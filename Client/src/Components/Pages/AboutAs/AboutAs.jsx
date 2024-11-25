import ContainerBig from "../../Templates/ContainerBig.jsx";
import DynamicContainer from "../../Organisms/DynamicContainer.jsx";

function AboutUs() {
    const aboutContent = [
        {
            title: "Our Story",
            content:
                "VK Hotel was founded with the vision of providing unparalleled hospitality services. Our journey began with a small team of passionate individuals, and today, we are proud to be a leading name in the hotel industry.",
        },
        {
            title: "Our Mission",
            content:
                "Our mission is to create memorable experiences for our guests by offering exceptional service, luxurious accommodations, and a welcoming atmosphere.",
        },
        {
            title: "Our Values",
            content:
                "We believe in integrity, excellence, and customer satisfaction. These core values guide us in everything we do, ensuring that our guests always receive the best.",
        },
        {
            title: "Our Team",
            content:
                "Our team is comprised of dedicated professionals who are passionate about hospitality. From our front desk staff to our housekeeping team, every member plays a vital role in making your stay special.",
        },
        {
            title: "Our Commitment",
            content:
                "We are committed to continuously improving our services and facilities to meet the evolving needs of our guests. Your comfort and satisfaction are our top priorities.",
        },
    ];

    return (
        <>
            <ContainerBig title={"About Us"}>
                {aboutContent.map((section, index) => (
                    <DynamicContainer key={index} Datas={section} heading={section.title}
                                      contant={section.content}/>
                ))}
            </ContainerBig>
        </>
    );
}

export default AboutUs;
  