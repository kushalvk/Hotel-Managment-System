/* eslint-disable react/prop-types */

import ManuTitle from "../../Atom/Footer/ManuTitle.jsx";
import HeaderFooterManu from "../../Atom/HeaderFooterManu.jsx";

function FooterManu({
                        title,
                        links,
                    }) {

    return (
        <>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <ManuTitle>{title}</ManuTitle>
                <nav className="list-none mb-10">
                    {links.map((link, index) => (
                        <div key={index}>
                            <HeaderFooterManu href={link.href}
                                              className={"text-gray-600 hover:text-white"}>{link.label}</HeaderFooterManu>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    )
}

export default FooterManu