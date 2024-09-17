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
      <div className="All-background-img">
        <h1 className="pt-4 text-4xl font-bold text-center mb-10 text-white m-9">
          About Us
        </h1>
        <div className="pb-7 text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {aboutContent.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-800">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
