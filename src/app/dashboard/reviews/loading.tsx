export default function ReviewsLoading() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-32 bg-slate-800 animate-pulse rounded"></div>
          <div className="h-4 w-64 bg-slate-800 animate-pulse rounded"></div>
        </div>
        <div className="h-10 w-full sm:w-32 bg-slate-800 animate-pulse rounded"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-800 animate-pulse rounded-lg"></div>
              <div className="h-4 w-20 bg-slate-800 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 rounded-lg">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-800 animate-pulse rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 w-32 bg-slate-800 animate-pulse rounded"></div>
                <div className="h-4 w-24 bg-slate-800 animate-pulse rounded"></div>
                <div className="h-20 w-full bg-slate-800 animate-pulse rounded"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-16 bg-slate-800 animate-pulse rounded"></div>
                  <div className="h-8 w-16 bg-slate-800 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

