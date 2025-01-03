import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPlan } from "../config/Redux/reducers/planSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("One Time"); // Default selection
  const [isOpen, setIsOpen] = useState(true); // State to control modal visibility

  const handleSelect = (plan: string) => {
    setSelected(plan);
    dispatch(setPlan(plan)); // Update Redux state on selection
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div>
          {/* Modal Overlay */}
          <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
            {/* Modal Container */}
            <div className="bg-white w-11/12 max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#00BFFF] to-[#008CBA] text-white text-center py-4">
                <h2 className="text-3xl font-bold">Choose Your Frequency</h2>
              </div>

              {/* Modal Body */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card Templates */}
                {[
                  {
                    plan: "Weekly",
                    label: "Weekly",
                    description: [
                      "✔️ The same cleaner every week",
                      "✔️ Cancel at any time",
                    ],
                    badge: "10% Off",
                    popular: true,
                  },
                  {
                    plan: "Every 2 Weeks",
                    label: "Every 2 Weeks",
                    description: [
                      "✔️ The same cleaner every 2 weeks",
                      "✔️ Cancel at any time",
                    ],
                    badge: "5% Off",
                  },
                  {
                    plan: "One Time",
                    label: "One Time",
                    description: ["✔️ When your schedule is uncertain"],
                  },
                ].map(({ plan, label, description, badge, popular }) => (
                  <div
                    key={plan}
                    onClick={() => handleSelect(plan)}
                    className={`relative p-6 w-full rounded-lg border transition duration-300 cursor-pointer shadow-md ${
                      selected === plan
                        ? "bg-[#e0eff5] border-2 border-[#00BFFF]"
                        : "bg-white text-gray-700 border-gray-300"
                    } hover:shadow-lg`}
                  >
                    {popular && (
                      <span className="absolute top-[-22px] left-0 bg-[#00BFFF] text-white text-xs font-bold px-2 py-1 rounded-sm shadow-md">
                        Most Popular
                      </span>
                    )}
                    <div className="relative">
                      <h3 className="text-xl font-bold mb-2">{label}</h3>
                      {badge && (
                        <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-sm shadow">
                          {badge}
                        </span>
                      )}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                      {description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-100 text-center py-4">
                <button
                  onClick={handleClose}
                  className="bg-[#00BFFF] text-white px-6 py-2 rounded-lg hover:bg-[#008CBA] transition"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
