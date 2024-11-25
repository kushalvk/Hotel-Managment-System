/* eslint-disable react/prop-types */

import Heading from "../Atom/Heading.jsx";
import Paragraph from "../Atom/Paragraph.jsx";

function DynamicContainer({
                              heading,
                              contant,
                              key,
                              children,
                              extra,
                              date
                          }) {
    return (
        <>
            <div key={key} className="mb-8">
                <Heading className="text-2xl font-semibold text-blue-500 mb-4">
                    {heading}
                </Heading>
                {date ? <>
                    <p className="text-sm text-gray-500 mb-4">
                        {new Date(date).toLocaleDateString()}
                    </p>
                </> : null}
                <Paragraph className="text-lg text-gray-800">{contant}{extra}</Paragraph>
                {children}
            </div>
        </>
    )
}

export default DynamicContainer;