import React from "react";

interface DropdownProps {
  visible: boolean;
  items: Array<{ place_name: string }>;
  error: string;
  onSelect: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  visible,
  items,
  error,
  onSelect,
}) => {
  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg z-20">
      {items.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => onSelect(item.place_name)}
            >
              {item.place_name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-3 text-red-500 text-center font-medium">{error}</div>
      )}
    </div>
  );
};

export default Dropdown;
