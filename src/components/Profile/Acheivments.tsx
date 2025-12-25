import { Award } from "lucide-react";
import MiniAct from "./Reusable/MiniAct";

export default function ProfileAchievements() {
  const achievements: {
    title: string;
    description: string;
    date: string;
    color: string;
  }[] = [];

  const badges = [{ name: "Noobie Coder", color: "bg-cyan-600" }];

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
        {achievements.length === 0 ? (
          <p className=" text-white/60 italic">
            No achievements earned yet. Start learning to unlock achievements!
          </p>
        ) : (
          <div className="space-y-3">
            {achievements.map((achievement, index) => {
              return (
                <div
                  key={index}
                  className="bg-[#1a2332] rounded-xl p-4 border border-white/5 hover:border-orange-600/30 transition-all hover:scale-105"
                >
                  <div className="flex gap-3">
                    <div
                      className={`${achievement.color} rounded-lg p-2 h-fit`}
                    ></div>
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
        )}
      </div>

      {/* Skill Badges Section */}
      <div className="bg-[#243447] rounded-2xl border border-white/10 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Skill Badges</h2>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <div
              key={index}
              className={`${badge.color} text-white text-sm px-3 py-1.5 hover:scale-105 transition-transform rounded-2xl shadow-2xl shadow-black cursor-pointer`}
            >
              {badge.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
