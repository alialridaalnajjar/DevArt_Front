import { Clock, Filter, Play, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Reusable/Navbar";
import type { Video } from "../utils/Types";

const genres = [
  "All",
  "DevArt",
  "FreeCodeCamp",
  "SoftwareEngineering",
  "TailwindCSS",
  "FrontEnd",
];

export default function BrowseCoursePage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const { courseName } = useParams();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/video/genre/${courseName}`
        );
        const data = await response.json();
        console.log("Fetched videos:", data);
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    if (courseName) {
      fetchVideos();
    }
  }, [courseName]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const filteredVideos = videos.filter((video) => {
    const matchesGenre =
      selectedGenre === "All" || video?.author === selectedGenre;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f1419]">
        <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">
              Browse {courseName} Videos
            </h1>
            <p className="text-gray-400">
              Explore our collection of expert-led video tutorials
            </p>
          </div>

          {/* Search and Filter section*/}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1a2332] border border-[#2a3441] rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Filtering logic */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="h-5 w-5 text-gray-400 shrink-0" />
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                    selectedGenre === genre
                      ? "bg-linear-to-r from-orange-500 to-amber-500 text-white"
                      : "bg-[#1a2332] text-gray-400 hover:text-white hover:bg-[#212d3d]"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-400">
              Showing{" "}
              <span className="text-white font-semibold">
                {filteredVideos.length}
              </span>{" "}
              video
              {filteredVideos.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Video section */}
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-t-4 border-t-orange-500 border-gray-600 rounded-full animate-spin mb-4" />
              <p className="text-gray-400">Loading videos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <Link
                  to={`/Courses/${courseName}/${video.video_id}`}
                  key={video.video_id}
                  onClick={() => setSelectedVideo(video.video_id)}
                  className={`group bg-[#1a2332] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedVideo === video.video_id
                      ? "border-orange-500 shadow-lg shadow-orange-500/20"
                      : "border-[#2a3441] hover:border-orange-500/50"
                  }`}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-linear-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center overflow-hidden">
                    {/* ✅ FIXED: bg-gradient-to-br */}
                    <div className="absolute inset-0 bg-[#0f1419]/60 group-hover:bg-[#0f1419]/40 transition-colors" />
                    <Play className="h-16 w-16 text-orange-500 relative z-10 group-hover:scale-110 transition-transform" />

                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="h-3 w-3 text-orange-500" />
                      <span className="text-xs text-white font-medium">
                        {formatDuration(video.duration_seconds)}
                      </span>
                    </div>

                    <div className="absolute top-2 left-2 bg-orange-500/90 px-2 py-1 rounded text-xs font-bold text-white">
                      Module {video.module_id}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded text-xs font-medium text-orange-400">
                        {video.genre}
                      </span>{" "}
                      <span className="inline-block px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded text-xs font-medium text-orange-400">
                        {video.language}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {video.title}
                    </h3>

                    <p className="text-sm text-gray-400 line-clamp-3 mb-3">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-[#2a3441]">
                      <span className="text-xs text-gray-500">
                        Video Author: {video.author || "Not Specified"}
                      </span>
                      <button className="text-xs font-medium text-orange-500 hover:text-orange-400 transition-colors">
                        Watch Now →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredVideos.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a2332] rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No videos found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
