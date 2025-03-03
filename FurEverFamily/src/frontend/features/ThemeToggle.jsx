import { useTheme } from "./ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
      {theme === 'light' ? <SunIcon width={20} height={20} /> : <MoonIcon width={20} height={20} />}
    </button>
  );
};

export default ThemeToggle;