import { Award, Flame, Star, Target, Trophy, Zap } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import type { Activity } from "../../utils/Types";
import MiniAct from "./reusable/MiniAct";

export default function ProfileAchievements() {
  //---------------------------------------------------------
  // BAD PRACTICE HERE BUT I NEED TO COMMENT THIS (SORRY)
  //---------------------------------------------------------

  // const { userId } = useParams();
  // const [activites, setActivities] = useState<Activity[]>([]);

  // const fetchActivites = async (userId: number) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/api/activity/${userId}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     // setActivities(data.activities);
  //     console.log("Fetched activities data:", data);
  //   } catch (error) {
  //     console.log("Error fetching activities data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchActivites(Number(userId));
  // }, []);

  const achievements = [
    {
      icon: Trophy,
      title: "Course Completer",
      description: "Completed 10+ courses",
      date: "Dec 2024",
      color: "bg-yellow-600",
    },
    {
      icon: Flame,
      title: "Streak Master",
      description: "28 day learning streak",
      date: "Dec 2024",
      color: "bg-orange-600",
    },
    {
      icon: Star,
      title: "Top Performer",
      description: "Scored 95%+ on 5 courses",
      date: "Nov 2024",
      color: "bg-purple-600",
    },
    {
      icon: Target,
      title: "Goal Achiever",
      description: "Met monthly learning goals",
      date: "Nov 2024",
      color: "bg-green-600",
    },
    {
      icon: Zap,
      title: "Quick Learner",
      description: "Completed course in record time",
      date: "Oct 2024",
      color: "bg-blue-600",
    },
  ];

  const badges = [
    { name: "React Expert", color: "bg-cyan-600" },
    { name: "TypeScript Pro", color: "bg-blue-600" },
    { name: "Full-Stack Dev", color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Activity Summary */}

      <MiniAct />

      {/* Achievements Section */}
      <div className="bg-[#243447] rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="h-5 w-5 text-orange-400" />
          Achievements
        </h2>

        <div className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="bg-[#1a2332] rounded-xl p-4 border border-white/5 hover:border-orange-600/30 transition-all hover:scale-105"
              >
                <div className="flex gap-3">
                  <div className={`${achievement.color} rounded-lg p-2 h-fit`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-2">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-orange-400">
                      {achievement.date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skill Badges Section */}
      <div className="bg-[#243447] rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Skill Badges</h2>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`${badge.color} text-white text-sm px-3 py-1.5 hover:scale-105 transition-transform`}
            >
              {badge.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
