"use client";

interface SimpleBarChartProps {
  data: { label: string; value: number; color: string }[];
}

export function SimpleBarChart({ data }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">{item.label}</span>
            <span className="text-white font-semibold">{item.value}</span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                background: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

