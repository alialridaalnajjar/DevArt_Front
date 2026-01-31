import {
  Code2,
  Database,
  Smartphone,
  Cloud,
  Shield,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Code2,
    title: "Front End",
    courses: 2,
    color: "from-pink-500 to-pink-600",
    path: "FrontEnd",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    courses: 0,
    color: "from-blue-500 to-blue-600",
    path: "Backend",
  },

  {
    icon: Cloud,
    title: "Database Management",
    courses: 0,
    color: "from-purple-500 to-purple-600",
    path: "SoftwareEngineering",
  },
  {
    icon: Shield,
    title: "TailwindCSS",
    courses: 0,
    color: "from-red-500 to-red-600",
    path: "TailwindCSS",
  },

  {
    icon: Palette,
    title: "Java",
    courses: 0,
    color: "from-orange-500 to-orange-600",
    path: "React",
  },
  {
    icon: Smartphone,
    title: "All",
    courses: 2,
    color: "from-green-500 to-green-600",
    path: "All",
  },
];

export default function Courses() {
  return (
    <section
      className="bg-gray-950   px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      id="courses"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Explore Course <span className="text-orange-500">Categories</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-slate-300">
            Find the perfect tutorials to advance your career and master new
            skills
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                to={`/courses/${category.path}`}
                key={category.title}
                className="group cursor-pointer rounded-2xl border border-slate-700  bg-gray-950  p-8 transition-all hover:scale-105 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br ${category.color} shadow-lg transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {category.title}
                </h3>
                <p className="mt-2 text-slate-400">
                  {category.courses} videos available
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-orange-500 transition-transform group-hover:translate-x-1">
                  Explore courses
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
