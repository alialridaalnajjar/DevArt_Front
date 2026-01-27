import { BookOpen, Brain, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuizGenres } from '../../utils/useQuiz';

export default function QuizGenres() {
  const { genres, loading, error } = useQuizGenres();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-6 py-4 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  // Safety check: ensure genres is an array
  const genresList = Array.isArray(genres) ? genres : [];

  return (
    <section className="bg-gray-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-4 py-2 mb-6">
            <Brain className="h-5 w-5 text-orange-500" />
            <span className="text-orange-400 font-medium">Test Your Knowledge</span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Choose a <span className="text-orange-500">Quiz Genre</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-slate-300">
            Select a topic and test your programming knowledge. Pass the quiz to earn achievements!
          </p>
        </div>

        {/* Genres Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {genresList.map((genre) => (
            <Link
              key={genre.genre_id}
              to={`/quiz/${genre.genre_id}`}
              className="group relative overflow-hidden rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                {/* Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Trophy className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                  {genre.name}
                </h3>
                
                {genre.description && (
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {genre.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <BookOpen className="h-4 w-4" />
                    <span>{genre.total_questions} Questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-orange-400 font-medium">
                    <span>Pass: {genre.pass_score}%</span>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {genresList.length === 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 mb-4">
              <Brain className="h-8 w-8 text-gray-600" />
            </div>
            <p className="text-lg text-slate-400">No quiz genres available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
