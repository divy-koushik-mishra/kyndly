import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  gradient?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  gradient = "from-purple-500 to-pink-500",
}: StatsCardProps) {
  return (
    <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 hover:border-slate-600/50 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-400 font-light">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-xs font-medium",
                  changeType === "positive" && "text-emerald-400",
                  changeType === "negative" && "text-red-400",
                  changeType === "neutral" && "text-slate-400"
                )}
              >
                {change}
              </span>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "p-3 rounded-lg bg-gradient-to-br shadow-lg",
              gradient
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

