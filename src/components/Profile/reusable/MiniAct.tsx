import { useEffect, useState } from "react";
import type { Activity } from "../../../utils/Types";
import useAuthCookies from "../../../utils/UseAuth";
export default function MiniAct() {
  const { getDecodedToken } = useAuthCookies();
  const decodedToken = getDecodedToken();
  const userId = decodedToken ? decodedToken.userId : null;
  const [activites, setActivities] = useState<Activity[]>([]);

  const fetchActivites = async (userId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/activity/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setActivities(data.activities);
    } catch (error) {
      console.log("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivites(Number(userId));
  }, []);

  return (
    <div className="bg-gray-950 rounded-2xl border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
      <div className="space-y-3 text-sm">
        {activites.length > 0 ? (
          activites.map((act, index) => {
            return (
              <div className="flex items-start gap-3" key={index}>
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                <div key={index}>
                  <p className="text-gray-300">Completed {act.title}</p>
                  <p className="text-gray-500 text-xs">
                    {Math.floor(
                      (Date.now() - new Date(act.dod).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days ago
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No recent activity</p>
        )}
      </div>
    </div>
  );
}
