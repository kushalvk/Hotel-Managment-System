/* eslint-disable react/prop-types */

function ImageContainer({
    title,
    Datas,
                        }) {
    return (
        <>
            <div className="All-background-img pb-7">
                <h1 className="text-4xl font-bold text-center mb-10 text-white mx-9">
                    {title}
                </h1>
                <div className=" text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
                    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Datas.map((item, index) => (
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
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-center">
                                    <p>{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageContainer;