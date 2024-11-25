/* eslint-disable react/prop-types */

function Paragraph({
    className='text-black mb-2',
    children
                   }) {
    return (
        <>
            <p className={className}>
                {children}
            </p>
        </>
    )
}

export default Paragraph