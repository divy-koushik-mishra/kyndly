export default function DashboardLoading() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-800 animate-pulse rounded"></div>
          <div className="h-4 w-64 bg-slate-800 animate-pulse rounded"></div>
        </div>
        <div className="h-10 w-full sm:w-32 bg-slate-800 animate-pulse rounded"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 rounded-lg">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-slate-800 animate-pulse rounded"></div>
              <div className="h-8 w-16 bg-slate-800 animate-pulse rounded"></div>
              <div className="h-3 w-32 bg-slate-800 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 rounded-lg">
            <div className="space-y-4">
              <div className="h-6 w-48 bg-slate-800 animate-pulse rounded"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="h-8 bg-slate-800 animate-pulse rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

