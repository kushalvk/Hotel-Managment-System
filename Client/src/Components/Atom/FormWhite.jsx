/* eslint-disable react/prop-types */

function FormWhite({onsubmit, title, children}) {
    return (
        <form onSubmit={onsubmit}>
            <section className="text-gray-600 body-font relative">
                <div className="container px-4 md:px-10 py-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                            {title}
                        </h1>
                    </div>
                    <div className="lg:w-2/3 md:w-3/4 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </form>
    );
}

export default FormWhite;