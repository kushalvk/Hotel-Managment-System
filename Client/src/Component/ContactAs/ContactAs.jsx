function ContactUs() {
  const contactDetails = [
    {
      title: "Our Address",
      content: "VK Hotel, 123 Address, Surat, Gujrat, India.",
    },
    {
      title: "Phone",
      content: "+91 8460698315",
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
      <div className="All-background-img">
        <h1 className="text-4xl font-bold text-center mb-10 text-white m-9">
          Contact Us
        </h1>
        <div className="All-background-img text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            {contactDetails.map((detail, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-500 mb-4">
                  {detail.title}
                </h2>
                <p className="text-lg text-gray-800">{detail.content}</p>
              </div>
            ))}

            {/* map */}
            <section className="map text-gray-600 body-font relative h-svh">
              <div className="absolute inset-0 bg-gray-300">
                <iframe
                  width="100%"
                  height="100%"
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1286886733925!2d72.9173733149303!3d21.181488085915413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0452fffffffff%3A0xffed0ea399687a7a!2sAmbaba%20Commerce%20College!5e0!3m2!1sen!2sin!4v1692091185947!5m2!1sen!2sin"
                ></iframe>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
