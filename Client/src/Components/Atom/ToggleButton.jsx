/* eslint-disable react/prop-types */

import InputWithLabel from "../Molecules/InputWithLabel.jsx";

function ToggleButton({
    role,
    setRole,
    // adminCode,
    setAdminCode,
                      }) {

    const handleToggle = () => {
        setRole(role === "user" ? "admin" : "user");
    };

    return (
        <>
            <div className="mb-4 flex items-center">
                <label
                    className="mr-2 block text-gray-700 text-sm font-bold"
                    htmlFor="radio-button"
                >
                    I am:
                </label>
                <label className="cursor-pointer relative h-[1.5em] w-[3em] rounded-full bg-[hsl(0,0%,7%)] shadow-[0px_2px_4px_0px_rgb(18,18,18,0.25),0px_4px_8px_0px_rgb(18,18,18,0.35)]">
                    <span className="absolute inset-[0.05em] rounded-full border-[1px] border-[hsl(0,0%,25%)]"></span>
                    <div className="absolute left-[0.25em] top-1/2 flex h-[1em] w-[1em] -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[inset_0px_2px_2px_0px_hsl(0,0%,85%)]">
                        <div className="h-[0.75em] w-[0.75em] rounded-full bg-[hsl(0,0%,7%)] shadow-[0px_2px_2px_0px_hsl(0,0%,85%)]"></div>
                    </div>
                    <div className="absolute right-[0.25em] top-1/2 h-[0.125em] w-[0.75em] -translate-y-1/2 rounded-full bg-[hsl(0,0%,50%)] shadow-[inset_0px_2px_1px_0px_hsl(0,0%,40%)]"></div>
                    <input
                        className="peer h-[0.5em] w-[0.5em] opacity-0"
                        id="radio-button"
                        name="role"
                        type="checkbox"
                        checked={role === "user"}
                        onChange={handleToggle}
                    />
                    <span className="absolute left-[0.125em] top-1/2 flex h-[1.25em] w-[1.25em] -translate-y-1/2 items-center justify-center rounded-full bg-[rgb(26,26,26)] shadow-[inset_2px_2px_2px_0px_rgba(64,64,64,0.25),inset_-2px_-2px_2px_0px_rgba(16,16,16,0.5)] duration-300 peer-checked:left-[calc(100%-1.375em)]">
                <span className="relative h-full w-full rounded-full">
                  <span className="absolute inset-[0.05em] rounded-full border-[1px] border-[hsl(0,0%,50%)]"></span>
                </span>
              </span>
                </label>
                <p className="text-black mx-1">{role.toUpperCase()}</p>
            </div>

            {role === "admin" && (
                <InputWithLabel Name={"AdminCode"} onChange={(e) => setAdminCode(e.target.value)}/>
            )}
        </>
    )
}

export default ToggleButton