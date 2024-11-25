/* eslint-disable react/prop-types */

function ContainerBig({title, children}) {
    return (
        <>
            <div className="All-background-img">
                <h1 className="pt-2 text-4xl font-bold text-center mb-10 text-white m-9">
                    {title}
                </h1>
                <div className="pb-7 text-black h-full w-screen bg-cover bg-center flex items-center justify-center">
                    <div className="max-w-5xl w-full bg-white bg-opacity-75 p-10 rounded-3xl shadow-lg">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContainerBig