import { TrendingUp, BookOpen, Award, Clock } from "lucide-react";

export default function ProfileStats() {
  const stats = [
    {
      label: "Courses Completed",
      value: "12",
      icon: BookOpen,
      change: "+3 this month",
      color: "text-green-400",
    },
    {
      label: "Learning Streak",
      value: "28 days",
      icon: TrendingUp,
      change: "Keep it up!",
      color: "text-orange-400",
    },
    {
      label: "Certificates Earned",
      value: "8",
      icon: Award,
      change: "2 pending",
      color: "text-blue-400",
    },
    {
      label: "Total Hours",
      value: "142h",
      icon: Clock,
      change: "+12h this week",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="bg-[#243447] rounded-2xl border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Learning Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#1a2332] rounded-xl p-4 border border-white/5 hover:border-orange-600/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
              <p className="text-xs text-orange-400">{stat.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
