import React from "react";

import { Filter, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Video } from "../../utils/Types";

export default function ManageVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/video/genre/All`,
        );
        const data = await response.json();
        setVideos(data);

        const videoThumbnail = data.map((videos: Video) => {
          const videoHex = videos.video_url.split("embed/")[1];
          return {
            id: videos.video_id,
            thumbnail: videoHex,
          };
        });

        const updatedVideos = data.map((video: Video) => {
          const thumbnailObj = videoThumbnail.find(
            (thumb: { id: number; thumbnail: string }) =>
              thumb.id === video.video_id,
          );
          return {
            ...video,
            ...thumbnailObj,
          };
        });

        setVideos(updatedVideos);
      } catch (error) {
        console.error("Error fetching video data:", error);
        setVideos([]);
      }
    };
    fetchVideo();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");

  const [formData, setFormData] = useState<Partial<Video>>({
    module: "",
    title: "",
    video_url: "",
    manifest_url: "",
    duration_seconds: 0,
    genre: "",
    description: "",
    author: "",
    language: "English",
  });

  const genres = [
    "All",
    "FrontEnd",
    "TypeScript",
    "Design",
    "Database",
    "DevOps",
  ];

  const openModal = (video?: Video) => {
    if (video) {
      setEditingVideo(video);
      setFormData(video);
    } else {
      setEditingVideo(null);
      setFormData({
        module: "",
        title: "",
        video_url: "",
        manifest_url: "",
        duration_seconds: 0,
        genre: "",
        description: "",
        author: "",
        language: "English",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVideo(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingVideo) {
      setVideos(
        videos.map((v) =>
          v.video_id === editingVideo.video_id
            ? { ...(formData as Video), video_id: editingVideo.video_id }
            : v,
        ),
      );
    } else {
      // Add new video
      const newVideo: Video = {
        ...(formData as Video),
        video_id: Math.max(...videos.map((v) => v.video_id), 0) + 1,
      };
      setVideos([...videos, newVideo]);
    }

    closeModal();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.module.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filterGenre === "All" || video.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const handleDeleteVid = async (videoID: number) => {
    const response = fetch(
      `${import.meta.env.VITE_API_URL}/api/video/delete/${videoID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_id: videoID }),
      },
    );
    const data = await (await response).json();
    if (data) {
      setVideos(videos.filter((v) => v.video_id !== videoID));
    }
  };

  const editVideo = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/video/update/${
        editingVideo?.video_id
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      },
    );

    if (!response.ok) {
      console.error("Failed to update video:", await response.text());
      return;
    }

    await response.json();
    
    // Update the local state
    setVideos(
      videos.map((v) =>
        v.video_id === editingVideo?.video_id
          ? { ...(formData as Video), video_id: editingVideo.video_id }
          : v,
      ),
    );

    closeModal();
  };

  return (
    <>
      <div className="px-4 py-8 lg:px-12 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a2332] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Videos</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {videos.length}
                </p>
              </div>
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <Filter className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Duration</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {Math.floor(
                    videos.reduce((acc, v) => acc + v.duration_seconds, 0) / 60,
                  )}
                  m
                </p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Filter className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Modules</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {new Set(videos.map((v) => v.module)).size}
                </p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Filter className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Genres</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {new Set(videos.map((v) => v.genre).filter(Boolean)).size}
                </p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Filter className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a2332] border border-slate-700/50 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="bg-[#1a2332] border border-slate-700/50 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => openModal()}
              className="bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap transition-all shadow-lg shadow-orange-500/20"
            >
              <Plus className="w-5 h-5" />
              Add Video
            </button>
          </div>
        </div>

        {/* Videos Table */}
        <div className="bg-[#1a2332] rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0f1419] border-b border-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Module
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Genre
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredVideos.map((videos) => (
                  <tr
                    key={videos.video_id}
                    className="hover:bg-[#0f1419]/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-400">
                      #{videos.video_id}
                    </td>
                    <td>
                      <img
                        className=" h-30 w-60 object-cover"
                        src={`https://img.youtube.com/vi/${videos.thumbnail}/maxresdefault.jpg`}
                        alt={videos.title}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">
                        {videos.title}
                      </div>
                      <div className="text-sm text-slate-400 line-clamp-1">
                        {videos.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {videos.module}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-medium">
                        {videos.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {formatDuration(videos.duration_seconds)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {videos.author}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(videos)}
                          className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVid(videos.video_id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a2332] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50">
            <div className="sticky top-0 bg-[#1a2332] border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {editingVideo ? "Edit Video" : "Add New Video"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter video title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Module <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.module}
                    onChange={(e) =>
                      setFormData({ ...formData, module: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="e.g., React Fundamentals"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Video URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.video_url}
                  onChange={(e) =>
                    setFormData({ ...formData, video_url: e.target.value })
                  }
                  className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Manifest URL
                </label>
                <input
                  type="url"
                  value={formData.manifest_url || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, manifest_url: e.target.value })
                  }
                  className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="https://example.com/manifest.m3u8"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration (seconds) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.duration_seconds}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration_seconds: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="1800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Genre
                  </label>
                  <select
                    value={formData.genre || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, genre: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select genre</option>
                    {genres.slice(1).map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Language
                  </label>
                  <input
                    type="text"
                    value={formData.language || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="English"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  placeholder="Enter video description..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    editVideo();
                    setIsModalOpen(false);
                  }}
                  type="submit"
                  className="flex-1 bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-orange-500/20"
                >
                  {editingVideo ? "Update Video" : "Create Video"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
