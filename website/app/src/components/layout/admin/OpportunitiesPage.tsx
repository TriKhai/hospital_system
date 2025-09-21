import React, { useMemo, useState } from "react";

type Opportunity = {
  id: string;
  name: string;
  description: string;
  progress: number; // 0-100
  amount: number; // in dollars
  date: string; // ISO date
  nextMeeting: string; // ISO date
};

const SAMPLE_DATA: Opportunity[] = [
  {
    id: "1",
    name: "Business Expansion Loan",
    description: "Loan for clinic expansion and equipment",
    progress: 45,
    amount: 300,
    date: "2024-02-18",
    nextMeeting: "2024-02-25",
  },
  {
    id: "2",
    name: "Website Redesign",
    description: "Redesigning client website for better UX/UI",
    progress: 75,
    amount: 10000,
    date: "2024-01-05",
    nextMeeting: "2024-01-15",
  },
  {
    id: "3",
    name: "Mobile App Development",
    description: "Developing a healthcare mobile app",
    progress: 60,
    amount: 25000,
    date: "2024-02-18",
    nextMeeting: "2024-02-25",
  },
  {
    id: "4",
    name: "SEO Optimization",
    description: "Enhancing SEO for increased traffic",
    progress: 85,
    amount: 5000,
    date: "2024-02-12",
    nextMeeting: "2024-02-18",
  },
  // add more rows as needed
];

function formatCurrency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function ProgressPill({ value }: { value: number }) {
  // choose color by range
  const color = value >= 80 ? "bg-emerald-100 text-emerald-800" : value >= 50 ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-800";
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color}` }>
      <svg className="w-3 h-3 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
      {value}%
    </div>
  );
}

export default function OpportunitiesPage() {
  const [data] = useState<Opportunity[]>(SAMPLE_DATA);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState("All Opportunities");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((r) => {
      if (filter !== "All Opportunities") {
        // placeholder for other filters
      }
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        formatCurrency(r.amount).toLowerCase().includes(q)
      );
    });
  }, [data, query, filter]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allSelected = Object.values(selectedIds).filter(Boolean).length === filtered.length && filtered.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds({});
    } else {
      const next: Record<string, boolean> = {};
      filtered.forEach((r) => (next[r.id] = true));
      setSelectedIds(next);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Opportunities</h1>
          <p className="text-sm text-slate-500">Short subtitle will be placed right over here</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="border rounded-md px-4 py-2 text-sm hover:bg-slate-50">Export</button>
          <button className="border rounded-md px-4 py-2 text-sm hover:bg-slate-50">Share</button>
          <button className="bg-emerald-600 text-white rounded-md px-4 py-2 text-sm hover:bg-emerald-700">+ New opportunities</button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
        <div className="flex items-center gap-3">
          <button className="border rounded-md px-3 py-2 text-sm">📅 28-30 September 2024</button>
          <div className="relative">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded-md px-3 py-2 text-sm">
              <option>All Opportunities</option>
              <option>Open</option>
              <option>Won</option>
              <option>Lost</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm">Fields</div>
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm">Filters</div>
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm">Row height</div>
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm">Group by</div>
        </div>

        <div className="ml-auto w-full md:w-64">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Table header */}
      <div className="bg-white shadow-sm rounded-md overflow-hidden border">
        <div className="hidden md:grid grid-cols-12 gap-4 items-center px-4 py-3 text-sm text-slate-600 bg-slate-50">
          <div className="col-span-1 flex items-center">
            <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
          </div>
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-1">Progress</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Next Meeting</div>
        </div>

        {/* Rows */}
        <div>
          {filtered.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-4 items-center px-4 py-4 hover:bg-slate-50 border-b last:border-b-0">
              <div className="col-span-1">
                <input type="checkbox" checked={!!selectedIds[r.id]} onChange={() => toggleSelect(r.id)} />
              </div>

              <div className="col-span-4">
                <div className="font-medium">{r.name}</div>
              </div>

              <div className="col-span-3 text-slate-500 truncate">{r.description}</div>

              <div className="col-span-1">
                <ProgressPill value={r.progress} />
              </div>

              <div className="col-span-1 font-medium">{formatCurrency(r.amount)}</div>

              <div className="col-span-1 text-slate-500">{r.date}</div>

              <div className="col-span-1 text-slate-500">{r.nextMeeting}</div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-6 py-8 text-center text-slate-500">No results found.</div>
          )}
        </div>
      </div>

      {/* Footer / small notes */}
      <div className="flex items-center justify-between mt-4 text-sm text-slate-500">
        <div>{filtered.length} opportunities</div>
        <div>Built with React + TailwindCSS — sample data</div>
      </div>
    </div>
  );
}
