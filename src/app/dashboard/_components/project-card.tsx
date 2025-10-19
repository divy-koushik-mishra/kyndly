import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  name: string;
  platform: string;
  reviews: number;
  rating: number;
  trend: string;
}

export function ProjectCard({
  name,
  platform,
  reviews,
  rating,
  trend,
}: ProjectCardProps) {
  return (
    <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 hover:border-slate-600/50 transition-all duration-200 group">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-slate-400">
              {platform === "web" ? "🌐" : "📱"} {platform}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl">⭐</span>
            <span className="text-xl font-bold text-white">{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/50">
          <div>
            <p className="text-2xl font-bold text-white">{reviews}</p>
            <p className="text-xs text-slate-400">Total Reviews</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-emerald-400">{trend}</p>
            <p className="text-xs text-slate-400">This month</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-slate-600 hover:bg-slate-800 hover:text-purple-400"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}

