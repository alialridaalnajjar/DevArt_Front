"use client";

import { ChevronDown, ChevronUp, Clock, FileText, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MiniAct from "../components/Profile/reusable/MiniAct";
import Navbar from "../components/Reusable/Navbar";
import { type Documentation, type Video } from "../utils/Types";

export default function WatchPage() {
  const [status, setStatus] = useState<boolean>(false);

  const [docs, setDocs] = useState<Documentation[]>([]);
  const [videoData, setVideoData] = useState<Video>({} as Video);
  const [nextVideoData, setNextVideoData] = useState<Video[]>([] as Video[]);
  const { videoId } = useParams();
  const { courseName } = useParams();
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/docs/${videoId}`
        );
        const data = await response.json();
        setDocs(data);
      } catch (error) {
        console.error("Error fetching documentation data:", error);
        setDocs({} as Documentation[]);
      }
    };
    fetchDocs();

    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/video/${videoId}`
        );
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
        setVideoData({} as Video);
      }
    };
    fetchVideo();

    const nextVideos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/video/genre/${courseName}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setNextVideoData(data);
      } catch (error) {
        console.error("Error fetching next video data:", error);
        setNextVideoData([] as Video[]);
      }
    };
    nextVideos();
  }, [courseName, videoId]);

  const fetchStatus = async () => {
    if (status === false) {
      try {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/video/mark_completed/${videoId}`,
          { method: "PUT" }
        );
      } catch (error) {
        console.error("Error marking video as completed:", error);
      }
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/video/status/${videoId}`,
          { method: "GET" }
        );
        const data = await response.json();
        setStatus(data.is_completed);
      } catch (error) {
        console.error("Error fetching video status:", error);
        setStatus(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await fetchStatus();
    })();
  }, []);

  const [expandedDoc, setExpandedDoc] = useState<number | null>(null);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const toggleDoc = (docId: number) => {
    setExpandedDoc(expandedDoc === docId ? null : docId);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={videoData.video_url}
                title={videoData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Video Information */}
            <div className="bg-gray-950 rounded-lg p-6 border border-[#2a3441]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    {videoData.title}
                  </h1>
                  <p className="text-gray-400 leading-relaxed">
                    {videoData.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#2a3441]">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#0f1419] rounded-lg">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-300">
                    {formatDuration(videoData.duration_seconds)}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <Tag className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-400">
                    {videoData.genre}
                  </span>
                </div>

                <div className="px-3 py-2 bg-[#0f1419] rounded-lg">
                  <span className="text-sm text-gray-400">
                    Module{" "}
                    <span className="text-white font-semibold">
                      {videoData.module}
                    </span>
                  </span>
                </div>

                <div className="px-3 py-2 bg-[#0f1419] rounded-lg">
                  <span className="text-sm text-gray-400">
                    Video ID{" "}
                    <span className="text-white font-semibold">
                      {videoData.video_id}
                    </span>
                  </span>
                </div>

                <div className="hover:cursor-pointer flex items-center gap-2 px-3 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <span
                    className={`text-sm font-medium ${
                      status ? "text-red-400" : "text-orange-400"
                    }`}
                  >
                    Mark as {status ? "Incomplete" : "Completed"}
                  </span>
                </div>
              </div>
            </div>

            {/* Documentation Section */}
            <div className="bg-gray-950 rounded-lg p-6 border border-[#2a3441]">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-orange-500" />
                <h2 className="text-xl font-bold text-white">
                  Course Documentation
                </h2>
              </div>

              {docs.length > 0 ? (
                <div className="space-y-3">
                  {docs.map((doc) => (
                    <div
                      key={doc.doc_id}
                      className="bg-[#0f1419] rounded-lg border border-[#2a3441] overflow-hidden transition-all hover:border-orange-500/50"
                    >
                      <button
                        onClick={() => toggleDoc(doc.doc_id)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {doc.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500"></div>
                        </div>
                        {expandedDoc === doc.doc_id ? (
                          <ChevronUp className="h-5 w-5 text-orange-500 shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                        )}
                      </button>

                      {expandedDoc === doc.doc_id && (
                        <div className="px-4 pb-4 border-t border-[#2a3441]">
                          <p className="text-gray-300 leading-relaxed pt-4">
                            {doc.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">
                    No documentation available for this video
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Related Content */}
          <div className="lg:col-span-1">
            <MiniAct />
            <div className="pt-5 sticky top-4 space-y-6">
              {/* Up Next */}
              <div className="bg-gray-950 rounded-lg p-6 border border-[#2a3441]">
                <h3 className="text-lg font-bold text-white mb-4">Up Next</h3>
                <div className=" flex flex-col gap-4">
                  {nextVideoData
                    .filter((v) => v.video_id !== videoData.video_id)
                    .slice(0, 2)
                    .map((v) => (
                      <Link to={`/Courses/${courseName}/${v.video_id}`}>
                        <a
                          key={v.video_id}
                          href={`/watch?videoId=${v.video_id}`}
                          className="block group bg-[#0f1419] rounded-lg p-3 border border-[#2a3441] hover:border-orange-500 transition-all"
                        >
                          <h4 className="text-sm font-semibold text-white group-hover:text-orange-500 transition-colors line-clamp-2 mb-2">
                            {v.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{formatDuration(v.duration_seconds)}</span>
                            <span>#</span>
                            <span className="text-orange-400">{v.genre}</span>
                          </div>
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
