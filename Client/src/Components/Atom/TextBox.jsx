/* eslint-disable react/prop-types */

function TextBox({
    className = 'text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline',
    Name,
    type = 'text',
    ...props
                 }) {
    return (
        <>
            <input
                className={className}
                id={Name}
                name={Name}
                type={type}
                placeholder={'Enter ' + Name}
                required
                {...props}
            />
        </>
    )
}

export default TextBox;