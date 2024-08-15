function Gallery() {
  const galleryItems = [
    {
      type: "image",
      src: "https://i.pinimg.com/originals/27/11/20/271120e4087d3dba4e18fcbffe3b7a5d.jpg",
      alt: "Hotel Lobby",
      caption: "Our luxurious hotel lobby",
    },
    {
      type: "image",
      src: "https://www.parkregisbusinessbay.com/wp-content/uploads/2021/11/Panoramic-View-2520x1400.jpg",
      alt: "Room View",
      caption: "Panoramic view from our deluxe rooms",
    },
    {
      type: "video",
      src: "https://videos.pexels.com/video-files/4095679/4095679-uhd_2560_1440_30fps.mp4",
      alt: "Hotel Tour",
      caption: "Take a tour of our hotel",
    },
    {
      type: "image",
      src: "https://www.hotelieracademy.org/wp-content/uploads/2017/03/Dining-Room1-1500x844-1500x844.jpg",
      alt: "Hotel Restaurant",
      caption: "Fine dining at our hotel restaurant",
    },
    {
      type: "image",
      src: "https://assets0.dostuffmedia.com/uploads/aws_asset/aws_asset/20292779/1ca8667e-ef59-4f74-a16d-2794ea913859.jpg",
      alt: "Swimming Pool",
      caption: "Relax at our poolside",
    },
    {
      type: "video",
      src: "https://videos.pexels.com/video-files/4625080/4625080-hd_1920_1080_30fps.mp4",
      alt: "Art Gallery",
      caption: "Explore the art gallery in our hotel",
    },
  ];

  return (
    <>
      <div className="All-background-img">
        <h1 className="text-4xl font-bold text-center mb-10 text-white mx-9">
          Hotel Gallery
        </h1>
        <div className=" text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="relative bg-gray-50 rounded-lg shadow-md overflow-hidden"
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.src}
                    controls
                    className="w-full h-full object-cover"
                    muted
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-center">
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Gallery;
