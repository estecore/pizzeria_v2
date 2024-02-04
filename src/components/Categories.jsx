import React from "react";

export function Categories({ activeIndex, setActiveIndex }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((val, index) => (
          <li
            key={val + index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {val}
          </li>
        ))}
      </ul>
    </div>
  );
}
