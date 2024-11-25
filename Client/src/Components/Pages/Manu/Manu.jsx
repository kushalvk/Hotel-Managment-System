import { useState } from 'react';
import Paragraph from "../../Atom/Paragraph.jsx";
import Button from "../../Atom/Button.jsx";
import Heading from "../../Atom/Heading.jsx";

function MenuPage()  {
  const [currentIndex, setCurrentIndex] = useState(0);

  const menuItems = [
    { title: 'Breakfast', description: 'Delicious morning options to start your day', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJaJ1fm3TlKSbG8e84BHmjO018HgsoJ1BbQ&s' },
    { title: 'Lunch', description: 'Hearty and wholesome meals for the afternoon', img: 'https://content.jdmagicbox.com/comp/def_content_category/inexpensive-indian-restaurants-below-rs-500-/360-f-361869194-7jgmiosj2iuni0ayovhvyhkvan6pkoah-inexpensive-indian-restaurants-below-rs-500--1-quqo2.jpg' },
    { title: 'Dinner', description: 'Elegant dining experience with a variety of dishes', img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/b0/fe/6b/aloft-rohit-dassani.jpg?w=600&h=-1&s=1' },
    { title: 'Desserts', description: 'Sweet treats to indulge in after your meal', img: 'https://c8.alamy.com/comp/AWT3TA/gourmet-desserts-served-at-exclusive-five-star-restaurant-in-new-york-AWT3TA.jpg' },
    { title: 'Beverages', description: 'Refresh with our wide range of drinks', img: 'https://images.immediate.co.uk/production/volatile/sites/30/2021/11/Grenadine-diabolo-05c968f.jpg' },
  ];

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % menuItems.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + menuItems.length) % menuItems.length);
  };

  return (
    <div className="bg-gray-100 py-10 All-background-img text-black min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-start">
      <h1 className="text-4xl font-bold text-white mb-8">Our Menu</h1>
      <div className="relative w-full max-w-4xl">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {menuItems.map((item, index) => (
              <div key={index} className="min-w-full flex flex-col items-center justify-center">
                <img src={item.img} alt={item.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
                <Heading className="text-2xl font-semibold text-white mt-4">{item.title}</Heading>
                <Paragraph className="text-white mt-2">{item.description}</Paragraph>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none"
        >
          &#8592;
        </Button>
        <Button
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none"
        >
          &#8594;
        </Button>
      </div>
    </div>
  );
}

export default MenuPage;
