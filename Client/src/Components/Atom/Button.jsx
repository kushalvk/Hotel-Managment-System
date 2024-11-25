/* eslint-disable react/prop-types */

function Button({
    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline',
    type = 'button',
    children,
    align,
    ...props
                }) {
    return (
        <>
            <div className={`flex items-center flex-wrap justify-${align ? align : "center"}`}>
                <button
                    className={className}
                    type={type}
                    {...props}
                >
                    {children}
                </button>
            </div>
        </>
    )
}

export default Button;