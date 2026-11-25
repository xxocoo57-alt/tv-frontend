import { STATUSES } from "../lib/showUtils";

export function StatusFilters({ shows, active, onChange }) {
  const tabs = [{ value: "all", label: "All" }, ...STATUSES];
  return (
    <nav
      aria-label="Filter by status"
      className="flex gap-2 overflow-x-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab) => {
        const count =
          tab.value === "all"
            ? shows.length
            : shows.filter((show) => show.status === tab.value).length;
        const selected = active === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(tab.value)}
            className={`flex-none cursor-pointer whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.84rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9b44c] ${selected ? "border-[#e9b44c] bg-[#e9b44c]/10 text-[#f0c067]" : "border-[#262b36] bg-transparent text-[#8b93a3] hover:text-[#eef0f4]"}`}
          >
            {tab.label}
            <span className="ml-1.5 font-mono text-[0.74rem] opacity-75">
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
