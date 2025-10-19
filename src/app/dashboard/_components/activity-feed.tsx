import { Card } from "@/components/ui/card";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  rating?: number;
  avatar?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-4 last:pb-0 border-b border-slate-800/50 last:border-0"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {activity.user.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white">
                <span className="font-semibold">{activity.user}</span>
                <span className="text-slate-400"> {activity.action} </span>
                <span className="font-medium">{activity.target}</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-slate-500">{activity.time}</p>
                {activity.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < activity.rating!
                            ? "text-amber-400"
                            : "text-slate-700"
                        }
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

