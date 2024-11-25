/* eslint-disable react/prop-types */

function Heading({children, ...props}) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center text-black" {...props}>
                {children}
            </h2>
        </>
    )
}

export default Heading