import React from "react";
import { useAuth } from "../../features/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../features/ThemeContext";

export default function UserTab() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleProfileClick = () => {
    navigate("/dashboard");
  };

  return (
    <section className="bg-gray-2 dark:bg-dark">
      <div className="container">
        <div className="flex justify-center">
          <div className="relative inline-block">
            <div className="flex items-center text-left cursor-pointer" onClick={handleProfileClick}>
              <div className="relative mr-4 h-[42px] w-[42px] rounded-full">
                <img
                  src={user?.photoURL || "https://cdn.tailgrids.com/2.2/assets/core-components/images/avatar/image-05.jpg"}
                  alt="avatar"
                  className="h-full w-full rounded-full object-cover object-center"
                />
                <span className="absolute -right-0.5 -top-0.5 block h-[14px] w-[14px] rounded-full border-[2.3px] border-white bg-[#219653] dark:border-dark"></span>
              </div>
              <span className={`text-base font-medium ${theme === "light" ? "text-black" : "text-white"}`}>
                {user?.displayName || "Guest"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
