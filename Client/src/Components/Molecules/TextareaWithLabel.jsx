/* eslint-disable react/prop-types */

function TextareaWithLabel({name, ...props}) {
    return (
        <>
            <label
                htmlFor={name}
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                {name}
            </label>
            <textarea
                id={name}
                name={name}
                placeholder="Write Your Experience Here"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                required
                {...props}
            ></textarea>
        </>
    )
}

export default TextareaWithLabel