/* eslint-disable react/prop-types */

function ContainerSmall({children}) {
    return (
        <>
            <div className="All-background-img h-screen flex items-center justify-center w-screen bg-cover bg-center">
                <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
                    {children}
                </div>
            </div>
        </>
    )
}

export default ContainerSmall;