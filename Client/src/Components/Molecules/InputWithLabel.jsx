/* eslint-disable react/prop-types */

import Label from "../Atom/Label.jsx";
import TextBox from "../Atom/TextBox.jsx";

function InputWithLabel({
    Name,
    type,
    ...props
                        }) {
    return (
        <div className="mb-4">
            <Label Name={Name} />
            <TextBox Name={Name} type={type} {...props}/>
        </div>
    )
}

export default InputWithLabel