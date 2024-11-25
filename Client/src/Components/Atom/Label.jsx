/* eslint-disable react/prop-types */

function Label({
    Name,
    className='block text-gray-700 text-sm font-bold mb-2',
               }) {
    return (
        <>
            <label
                className={className}
                htmlFor={Name}
            >
                {Name}
            </label>
        </>
    )
}

export default Label