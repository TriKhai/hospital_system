import { useState } from "react";

export type Tab = {
  label: string;
  count: number;
  component: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultActive: string;
  onChange?: (label: string) => void;
};

export default function Tabs({ tabs, defaultActive, onChange }: TabsProps) {
  const [active, setActive] = useState(defaultActive);

  const handleTabClick = (label: string) => {
    setActive(label);
    if (onChange) onChange(label);
  };

  return (
    <div>
      <div className="flex space-x-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`pb-2 text-sm font-medium transition-colors ${
              active === tab.label
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}{" "}
            <span
              className={`ml-1 ${
                active === tab.label ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.label === active)?.component}
      </div>
    </div>
  );
}
