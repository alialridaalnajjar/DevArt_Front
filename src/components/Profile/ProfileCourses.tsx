import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { Video } from "../../utils/Types";
import { Link } from "react-router-dom";

export default function ProfileCourses() {
  const [recommendedCourses, setRecommendedCourses] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVid = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/video/genre/FrontEnd`,
          {
            method: "GET",
          },
        );

        const data = await response.json();
        const videoThumbnail = data.map((video: Video) => {
          const videoHex = video.video_url.split("embed/")[1];
          return {
            ...video,
            thumbnail: videoHex,
          };
        });
        setRecommendedCourses(videoThumbnail);
      } catch (error) {
        console.error("Error fetching next video data:", error);
      }
    };
    fetchVid();
  }, []);

  return (
    <div className="bg-gray-950  rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Learn More</h2>
        <Link
          to="/Courses/All"
          className="border-orange-600 text-orange-400 hover:bg-orange-600/50 hover:rounded-2xl p-1 hover:text-white bg-transparent"
        >
          Browse More
        </Link>
      </div>

      <div className="space-y-4">
        {recommendedCourses.map((course) => (
          <div
            key={course.video_id}
            className="bg-[#1a2332] rounded-xl p-4 border border-white/5 hover:border-orange-600/30 transition-all group"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Thumbnail */}
              <div className="shrink-0">
                <img
                  src={`https://img.youtube.com/vi/${course.thumbnail}/maxresdefault.jpg`}
                  className="w-full sm:w-48 h-30 object-cover rounded-lg"
                />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold text-base ">
                    {course.title}
                  </h3>
                  <div className={"bg-orange-600"}></div>
                </div>

                <p className="text-sm text-gray-400 mb-2">by {course.author}</p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>0% Complete</span>
                    <span>0h / 0h</span>
                  </div>
                  <div
                    style={{ width: `90%` }}
                    className="h-2 bg-orange-600 rounded"
                  />
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-2">
                  <button className="bg-orange-600  flex flex-row items-center justify-center rounded-3xl">
                    <Play className="h-4 w-4 mr-1 text-white " />
                    <Link
                      to={`/Courses/FrontEnd/${course.video_id}`}
                      className="flex items-center px-1 py-1 text-sm font-medium text-white  "
                    >
                      Continue Learning
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
