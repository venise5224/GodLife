"use client";

interface Props {
  filter: "All" | "Todo" | "Plan" | "Log";
  onChange: (f: "All" | "Todo" | "Plan" | "Log") => void;
}

const FilterToggle = ({ filter, onChange }: Props) => {
  return (
    <div className="flex gap-2 mb-4">
      {(["All", "Todo", "Plan", "Log"] as const).map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1 rounded-full border text-sm transition
            ${
              filter === f
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterToggle;
