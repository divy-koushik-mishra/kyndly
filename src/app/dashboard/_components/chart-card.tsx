import { Card } from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function ChartCard({ title, subtitle, children }: ChartCardProps) {
  return (
    <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-400 font-light mt-1">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </Card>
  );
}

