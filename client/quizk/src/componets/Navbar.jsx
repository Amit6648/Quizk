import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function FullWidthNavbar() {
  const location = useLocation();

  const tabs = [
    { name: "Home", path: "/home" },
    { name: "Multiplayer", path: "/multiplayer" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Profile", path: "/profile" }
  ];

  const activeIndex = tabs.findIndex(tab => tab.path === location.pathname);
  const tabCount = tabs.length;
  const tabWidth = 100 / tabCount;

  const getBackgroundSegments = () => {
    const isFirst = activeIndex === 0;
    const isLast = activeIndex === tabCount - 1;

    if (isFirst || isLast) {
      return [{
        width: tabWidth * (tabCount - 1),
        left: isFirst ? tabWidth : 0,
        radiusClass: isFirst ? "rounded-br-xl" : "rounded-bl-xl"
      }];
    }

    return [
      {
        width: tabWidth * activeIndex,
        left: 0,
        radiusClass: "rounded-br-xl"
      },
      {
        width: tabWidth * (tabCount - activeIndex - 1),
        left: tabWidth * (activeIndex + 1),
        radiusClass: "rounded-bl-xl"
      }
    ];
  };

  return (
    <div className="relative flex w-full bg-gray-100 gap-0.5 p-0.5">
      {getBackgroundSegments().map((segment, index) => (
        <motion.div
          key={index}
          className={`absolute top-0 bottom-0 bg-blue-500 z-0 ${segment.radiusClass}`}
          initial={false}
          animate={{
            width: `${segment.width}%`,
            left: `${segment.left}%`
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      ))}

      {tabs.map((tab, index) => (
        <Link
          to={tab.path}
          key={tab.name}
          className={`relative z-10 flex-1 px-1 py-2 text-sm text-center whitespace-nowrap ${
            activeIndex === index
              ? "text-blue-500 font-medium"
              : "text-white"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
}
