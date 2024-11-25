import Logo from "../../Atom/Logo.jsx";

function FooterLogo() {
    return (
        <>
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                <Logo />
                <a
                    href="https://github.com/kushalvk"
                    className="flex title-font font-medium items-center md:justify-start justify-center text-white"
                >
                    <span className="ml-3 text-xl">Vaghela Kushal</span>
                </a>
                <p className="mt-2 text-sm text-gray-500">
                    Experience unparalleled luxury and comfort at our hotel, where
                    exceptional service meets exquisite accommodations.
                </p>
            </div>
        </>
    )
}

export default FooterLogo