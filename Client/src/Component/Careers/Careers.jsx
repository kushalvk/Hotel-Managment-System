function Careers() {

    const jobListings = [
        {
          title: "Front Desk Receptionist",
          category: "FULL-TIME",
          imageUrl:
            "https://assets1.hospitalitytech.com/styles/hero/s3/2021-04/GettyImages-1208367151_0.jpg",
          description:
            "We are looking for a friendly and professional Front Desk Receptionist to join our team. Responsibilities include managing guest check-ins and check-outs, answering phone calls, and assisting with guest inquiries. Excellent communication skills and a welcoming demeanor are essential.",
        },
        {
          title: "Housekeeping Staff",
          category: "PART-TIME",
          imageUrl:
            "https://thespaflow.com/wp-content/uploads/how-hotel-staff-responsibilities-will-change-in-a-postcovid19-world_963_6069989_0_14117761_1000.jpg",
          description:
            "Join our housekeeping team to help maintain the cleanliness and organization of guest rooms and common areas. Duties include cleaning, laundry, and restocking amenities. Attention to detail and the ability to work independently are required.",
        },
        {
          title: "Executive Chef",
          category: "FULL-TIME",
          imageUrl:
            "https://img.freepik.com/premium-photo/closeup-executive-chef-hotel-kitchen-guiding-staff-culinary-preparation_879736-30894.jpg",
          description:
            "We are seeking an experienced Executive Chef to oversee our kitchen operations. The ideal candidate will have a passion for culinary excellence, strong leadership skills, and the ability to create innovative menus that delight our guests.",
        },
        {
          title: "Event Coordinator",
          category: "CONTRACT",
          imageUrl:
            "https://lh3.googleusercontent.com/proxy/bDRaO44m1yM62565Su0hgHZRjUnMMA61SH5h_0dWIOEMWAPGVrlmOQXLME-MD0WGqP4ibB2ZNSgNo4EwMgOb93jubukfXBBlig",
          description:
            "The Event Coordinator will plan and execute events at our hotel, including weddings, conferences, and other special occasions. Strong organizational skills and the ability to manage multiple projects simultaneously are essential for this role.",
        },
        {
          title: "Maintenance Technician",
          category: "FULL-TIME",
          imageUrl:
            "https://hotelierandhospitality.com/wp-content/uploads/sites/10/2018/03/shutterstock_397699045.jpg",
          description:
            "As a Maintenance Technician, you will be responsible for ensuring the hotel is in excellent working order. Duties include routine inspections, repairs, and preventative maintenance. Strong problem-solving skills and technical expertise are required.",
        },
        {
          title: "Sous Chef",
          category: "FULL-TIME",
          imageUrl:
            "https://d1lfx7anrns929.cloudfront.net/temp/JVW1qmtJHayakDTzwWXMYLF6oj1usZjRdWZT48Cz.jpg",
          description:
            "The Sous Chef will assist the Executive Chef in daily kitchen operations, including preparing and presenting meals, managing kitchen staff, and ensuring a high standard of food quality. Culinary experience and a passion for food are essential.",
        },
      ];

    return (
        <>
            <div className="All-background-img h-full w-screen bg-cover bg-center flex items-center justify-center">
        <div className="gallery-background text-black min-h-screen w-full bg-cover bg-center flex flex-col items-center py-20">
          <h1 className="text-4xl font-bold text-center mb-10 text-white">
            Careers at Our Hotel
          </h1>
          <div className="max-w-7xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            <div className="flex flex-wrap -m-4">
              {jobListings.map((job, index) => (
                <div key={index} className="p-4 md:w-1/3">
                  <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src={job.imageUrl}
                      alt={job.title}
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        {job.category}
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {job.title}
                      </h1>
                      <p className="leading-relaxed mb-3 text-gray-700">
                        {job.description}
                      </p>
                      <div className="flex items-center flex-wrap">
                        <a
                          href="contactas"
                          className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
                        >
                          Contact us
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Careers