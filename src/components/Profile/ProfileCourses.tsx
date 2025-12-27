"use client"

import { Play } from "lucide-react"

export default function ProfileCourses() {
  const enrolledCourses = [
     {
      id: null,
      title: null,
      instructor: null,
      progress: null,
      totalHours: null,
      completedHours: null,
      status: null,
      thumbnail:null,
    }
  ]

  return (
    <div className="bg-gray-950  rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">My Courses</h2>
        <button
          className="border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white bg-transparent"
        >
          Browse More
        </button>
      </div>

      <div className="space-y-4">
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[#1a2332] rounded-xl p-4 border border-white/5 hover:border-orange-600/30 transition-all group"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Thumbnail */}
              <div className="shrink-0">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                 
                  className="w-full sm:w-32 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-white font-semibold text-base group-hover:text-orange-400 transition-colors">
                    {course.title}
                  </h3>
                  <div
                    className={course.status === "Completed" ? "bg-green-600" : "bg-orange-600"}
                  >
                    {course.status}
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-3">by {course.instructor}</p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>{course.progress}% Complete</span>
                    <span>
                      {course.completedHours}h / {course.totalHours}h
                    </span>
                  </div>
                  <div style={{ width: `${course.progress}%` }} className="h-2 bg-orange-600 rounded" />
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-2">
                  {course.status === "Completed" ? (
                    <button  className="text-orange-400 border-orange-600 bg-transparent">
                      <Award className="h-4 w-4 mr-2" />
                      View Certificate
                    </button>
                  ) : (
                    <button  className="bg-orange-600 hover:bg-orange-700">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Award({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </svg>
  )
}
