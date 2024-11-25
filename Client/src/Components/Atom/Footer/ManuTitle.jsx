/* eslint-disable react/prop-types */

function FooterTitle({
    children
                     }) {

    return (
        <>
            <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                {children}
            </h2>
        </>
    )
}

export default FooterTitle;