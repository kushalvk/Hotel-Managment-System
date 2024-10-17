import { useState } from 'react';

function MenuPage() {

    const [currentIndex, setCurrentIndex] = useState(0);

    const menuItems = [
        {
            title: 'Breakfast',
            description: 'Start your day with our nutritious breakfast options, including fresh juices, cereals, and more.',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJaJ1fm3TlKSbG8e84BHmjO018HgsoJ1BbQ&s',
            price: '₹250',
        },
        {
            title: 'Lunch',
            description: 'Enjoy our delicious lunch specials, including soups, sandwiches, and hearty meals.',
            img: 'https://content.jdmagicbox.com/comp/def_content_category/inexpensive-indian-restaurants-below-rs-500-/360-f-361869194-7jgmiosj2iuni0ayovhvyhkvan6pkoah-inexpensive-indian-restaurants-below-rs-500--1-quqo2.jpg',
            price: '₹500',
        },
        {
            title: 'Dinner',
            description: 'Indulge in a variety of fine dining options from pasta to grilled delicacies.',
            img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/b0/fe/6b/aloft-rohit-dassani.jpg?w=600&h=-1&s=1',
            price: '₹750',
        },
        {
            title: 'Desserts',
            description: 'End your meal with our sweet and savory desserts, including cakes and pastries.',
            img: 'https://c8.alamy.com/comp/AWT3TA/gourmet-desserts-served-at-exclusive-five-star-restaurant-in-new-york-AWT3TA.jpg',
            price: '₹200',
        },
        {
            title: 'Beverages',
            description: 'Choose from a wide selection of refreshing drinks including teas, coffees, and juices.',
            img: 'https://images.immediate.co.uk/production/volatile/sites/30/2021/11/Grenadine-diabolo-05c968f.jpg',
            price: '₹100',
        },
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
                                <h2 className="text-2xl font-semibold text-white mt-4">{item.title}</h2>
                                <p className="text-white mt-2">{item.description}</p>
                                <p className="text-white mt-2">₹ {item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none"
                >
                    &#8592;
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 focus:outline-none"
                >
                    &#8594;
                </button>
            </div>
        </div>
    );
}

export default MenuPage;
