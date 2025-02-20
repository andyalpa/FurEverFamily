import { useState } from "react";
import {SunIcon, MoonIcon, ComputerDesktopIcon} from "@heroicons/react/20/solid";

const themes = {
    light: {name: "Light", Icon: <SunIcon width={20} height={20}/>},
    dark: {name: "Dark", Icon: <MoonIcon width={20} height={20}/>},
    system: {name: "System", Icon: <ComputerDesktopIcon width={20} height={20}/>}
};

const ThemeToggle = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState("system");
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleThemeChange = (theme) => {
        console.log(theme);
        setTheme(theme);
    }

    return (
        <div className="ml-auto">
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={toggleDropdown}>
                    {themes[theme].Icon}
                </label>
                <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ${dropdownOpen ? "block" : "hidden"}`}>
                    {Object.entries(themes).map(([key, {name, Icon}]) => (
                        <li key={key} onClick={() => handleThemeChange(key)}>
                            <a className="justify-between">
                                {name}
                                {Icon}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ThemeToggle;