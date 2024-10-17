function MenuPage() {
    const menuItems = [
        {
            title: 'Breakfast',
            description: 'Start your day with our nutritious breakfast options, including fresh juices, cereals, and more.',
            price: '₹250',
        },
        {
            title: 'Lunch',
            description: 'Enjoy our delicious lunch specials, including soups, sandwiches, and hearty meals.',
            price: '₹500',
        },
        {
            title: 'Dinner',
            description: 'Indulge in a variety of fine dining options from pasta to grilled delicacies.',
            price: '₹750',
        },
        {
            title: 'Desserts',
            description: 'End your meal with our sweet and savory desserts, including cakes and pastries.',
            price: '₹200',
        },
        {
            title: 'Beverages',
            description: 'Choose from a wide selection of refreshing drinks including teas, coffees, and juices.',
            price: '₹100',
        },
    ];

    return (
        <div className="bg-gray-100 py-10 All-background-img text-black min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-start">
            <h1 className="text-4xl font-bold text-white mb-8">Our Menu</h1>
            <ul className="w-full max-w-4xl space-y-6">
                {menuItems.map((item, index) => (
                    <li key={index} className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                        </div>
                        <span className="text-lg font-semibold text-gray-700">{item.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuPage;
