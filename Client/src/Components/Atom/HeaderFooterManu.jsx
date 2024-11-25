/* eslint-disable react/prop-types */

function HeaderFooterManu({
    href,
    children,
    textColor = "text-white",
    texthoverColor = "hover:text-gray-400",
    ...props
              }) {
    return(
        <>
            <a href={href} className={`mr-5 ${textColor} ${texthoverColor}`} {...props}>
                {children}
            </a>
        </>
    )
}

export default HeaderFooterManu