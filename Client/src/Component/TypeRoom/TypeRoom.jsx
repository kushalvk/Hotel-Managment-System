import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TypeRoom() {
  const galleryItems = [
    {
      title: "Single Bad (None A/c)",
      category: "CATEGORY",
      imageUrl:
        "https://www.hotelsgangaa.in/wp-content/uploads/2023/01/sin1.png",
      description:
        "A Single Bed (Non A/C) room is a cozy and budget-friendly accommodation option, ideal for solo travelers. The room features a comfortable single bed and essential amenities, ensuring a pleasant stay without the extra cost of air conditioning. It's perfect for guests looking for a simple, clean, and affordable place to rest.",
    },
    {
      title: "Single Bad (A/c)",
      category: "CATEGORY",
      imageUrl:
        "https://ii1.pepperfry.com/media/catalog/product/a/c/1100x1210/acropolis-solid-wood-single-bed-in-provincial-teak-finish--by-woodsworth-acropolis-solid-wood-single-vrzd3e.jpg",
      description:
        "A Single Bed (A/C) room offers a comfortable and climate-controlled space for solo travelers. This room is equipped with a single bed and air conditioning, providing a cool and relaxing environment. It’s an excellent choice for guests who value comfort and a refreshing atmosphere during their stay.",
    },
    {
      title: "Double Bad (None A/c)",
      category: "CATEGORY",
      imageUrl: "https://hotelroyalepark.com//uploads/rooms/10.jpg",
      description:
        "The Double Bed (Non A/C) room offers a comfortable stay with ample space for two guests. Equipped with two cozy beds, it provides a relaxing environment ideal for those seeking a simple yet pleasant lodging experience. The room is well-ventilated, ensuring a refreshing atmosphere, making it a perfect choice for budget-conscious travelers.",
    },
    {
      title: "Double Bad (A/c)",
      category: "CATEGORY",
      imageUrl:
        "https://www.newskresidency.com/wp-content/uploads/2020/03/Gallery-4.jpg",
      description:
        "The Double Bed (A/C) room offers a spacious and comfortable stay, featuring a double bed and air conditioning to ensure a cool and restful environment. Ideal for couples or small families, this room provides essential amenities, including clean linens, a private bathroom, and modern conveniences to enhance your stay. Perfect for relaxing after a day of exploring or business activities.",
    },
    {
      title: "Dining",
      category: "CATEGORY",
      imageUrl:
        "https://media.istockphoto.com/id/843610508/photo/interior-of-cozy-restaurant-loft-style.jpg?s=612x612&w=0&k=20&c=s_PVQJNzcilxKYpm3O-AxBMx4_om5G0TKuxUmiMl85Y=",
      description:
        "The Dining Room is a warm and inviting space designed for enjoying meals in comfort. Featuring elegant furnishings and a serene atmosphere, it's perfect for both intimate dinners and group gatherings. The room is well-lit and spacious, providing a pleasant dining experience with a focus on comfort and style.",
    },
    {
      title: "Hall-1 (300 capacity)",
      category: "CATEGORY",
      imageUrl:
        "https://content.jdmagicbox.com/v2/comp/ahmedabad/j2/079pxx79.xx79.240701130922.n6j2/catalogue/q2ys1bgwh0azt6r-l86hsiov7w.jpg",
      description:
        "Hall-1 is a versatile and spacious venue, perfect for hosting large events, conferences, or social gatherings. With a seating capacity of 300, the hall is equipped with modern audio-visual technology, comfortable seating, and flexible arrangements to suit a variety of occasions. Its elegant design and ample space make it an ideal choice for both formal and informal events.",
    },
    {
      title: "Hall-2 (700 capacity)",
      category: "CATEGORY",
      imageUrl:
        "https://5.imimg.com/data5/AB/KE/MY-8360361/crowne-plaza-jaipur-4797211760-4x3-500x500.jpg",
      description:
        "Hall-2 is an expansive and grand event space designed to accommodate large-scale gatherings, such as conferences, weddings, or corporate events. With a seating capacity of 700, the hall offers state-of-the-art audio-visual equipment, adaptable seating arrangements, and a sophisticated ambiance. Its spacious layout and premium facilities ensure a comfortable and memorable experience for all attendees.",
    },
  ];

  const [roomType, setRoomType] = useState();
  const navigate = useNavigate();

  const handleroom = () => {
    if (roomType) {
      localStorage.setItem("RoomType", roomType);
      navigate("/booking");
    }
  };

  return (
    <>
      <div className="All-background-img h-full w-screen bg-cover bg-center flex items-center justify-center">
        <div className="gallery-background text-black min-h-screen w-full bg-cover bg-center flex flex-col items-center py-20">
          <h1 className="text-4xl font-bold text-center mb-10 text-white">
            Type of Room
          </h1>
          <div className="max-w-7xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
            <div className="flex flex-wrap -m-4">
              {galleryItems.map((item, index) => (
                <div key={index} className="p-4 md:w-1/3">
                  <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                        {item.category}
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {item.title}
                      </h1>
                      <p className="leading-relaxed mb-3 text-gray-700">
                        {item.description}
                      </p>
                      <div className="flex items-center flex-wrap">
                        <a
                          onClick={() => {
                            setRoomType(item.title);
                            handleroom();
                          }}
                          // href="booking"
                          className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
                        >
                          Learn More
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
  );
}

export default TypeRoom;
