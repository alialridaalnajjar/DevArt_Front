import { ArrowRight, BookOpen, Users, Award } from "lucide-react"
import { Link } from "react-router-dom"

const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 4,
  size: Math.random() * 2 + 1,
}))

export default function WelcomeSection() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-gray-950 via-gray-950 to-gray-950">
      {/* Raining Stars Background */}
      <div className="absolute inset-0 overflow-hidden ">
        {STARS.map((star) => (
          <div
            key={star.id}
            className=" absolute rounded-full bg-white animate-fall"
            style={{
              left: `${star.left}%`,
              top: `-10px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.8,
              boxShadow: `0 0 ${8 + star.size}px rgba(249, 115, 22, 0.8)`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs - Orange theme */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-600/12 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/12 rounded-full blur-3xl opacity-60 animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      
      {/* Secondary subtle orbs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-500/6 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-orange-600/6 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDuration: "5s", animationDelay: "0.5s" }} />

      {/* Content */}
      <div className=" relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/40 backdrop-blur-sm animate-bounce-fast">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-orange-400 font-medium text-sm">Welcome to DevArt</span>
          </div>

          {/* Main Heading with Gradient */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            <span className="block mb-2">Start Your</span>
            <span className="block bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-balance">
            Join hundreds of developers mastering their craft through tutorials, real-world projects, and a
            vibrant learning community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 group rounded-lg"
            >
              <a href="#courses" className="flex items-center">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </button>
            <button
              className="border-2 border-orange-500/50 hover:border-orange-400 text-white px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-orange-950/20 hover:bg-orange-500/10 transition-all duration-300 rounded-lg"
            >
              <Link to="/Courses/All">Browse Videos</Link>
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: "Direct Tutorials",
                description: "Direct and straight to the most important parts of development.",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Users,
                title: "50K+ Students",
                description: "Active learning community",
                color: "from-orange-600 to-orange-700",
              },
              {
                icon: Award,
                title: "Real-world Topics",
                description: "Master practical skills that you can apply immediately to your projects and career.",
                color: "from-orange-500 to-orange-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-orange-950/15 backdrop-blur-sm border border-orange-600/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-900/20 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-linear-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="pt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-orange-600/60 rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-orange-500 rounded-full animate-scroll" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) translateX(100px);
            opacity: 0;
          }
        }

        @keyframes scroll {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }


        .animate-scroll {
          animation: scroll 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
