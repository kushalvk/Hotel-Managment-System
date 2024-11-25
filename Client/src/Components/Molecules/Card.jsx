/* eslint-disable react/prop-types */

import Paragraph from "../Atom/Paragraph.jsx";

function Card({
    key,
    imgURL,
    title,
    categoty,
    description,
    nav,
    navText,
    ...props
                    }) {
    return (
        <>
            <div key={key} className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={imgURL}
                        alt={title}
                    />
                    <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                            {categoty}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {title}
                        </h1>
                        <Paragraph className="leading-relaxed mb-3 text-gray-700">
                            {description}
                        </Paragraph>
                        <div className="flex items-center flex-wrap">
                            <a
                                href={nav}
                                {...props}
                                className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
                            >
                                {navText}
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
        </>
    )
}

export default Card;