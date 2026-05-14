import React from "react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Barcha klinikalar", value: "24", change: "+2", color: "blue" },
    { label: "Faol doktorlar", value: "156", change: "+12", color: "emerald" },
    { label: "Bugungi uchrashuvlar", value: "84", change: "+18", color: "amber" },
    { label: "Yangi foydalanuvchilar", value: "1,240", change: "+5.4%", color: "primary" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-slate-500 mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts / Activity Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-[400px] flex flex-col items-center justify-center text-center">
           <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
           </div>
           <h4 className="text-lg font-bold text-slate-800 mb-1">Tashriflar statistikasi</h4>
           <p className="text-sm text-slate-500">Grafik ma'lumotlari tez orada yuklanadi</p>
        </div>

        <div className="bg-[#1e293b] rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
           </div>
           <h4 className="text-xl font-bold mb-4 relative z-10">Tizim holati</h4>
           <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between text-sm">
                 <span className="text-slate-400">Server yuklamasi</span>
                 <span className="font-mono text-[var(--primary)] font-bold">12%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                 <div className="h-full bg-[var(--primary)] w-[12%] rounded-full shadow-[0_0_10px_rgba(0,104,95,0.5)]"></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                 <span className="text-slate-400">Ma'lumotlar bazasi</span>
                 <span className="font-mono text-emerald-400 font-bold">99.9% Up</span>
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                 <button className="w-full py-3 bg-[var(--primary)] text-white font-bold rounded-xl text-sm shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.02] transition-transform">
                    Logs ko'rish
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

