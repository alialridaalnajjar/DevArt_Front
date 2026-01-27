import { Clock, Trophy, XCircle, CheckCircle2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserAttempts } from '../../utils/useQuiz';
import useAuthCookies from '../../utils/UseAuth';

export default function MyAttempts() {
  const { getDecodedToken } = useAuthCookies();
  const token = getDecodedToken();
  const { attempts, loading, error } = useUserAttempts(token?.userId || 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-6 py-4 text-red-400">
          {error}
        </div>
      </div>
    );
  }

  const completedAttempts = attempts.filter(a => a.status === 'completed' || a.completed_at);
  const passedAttempts = completedAttempts.filter(a => a.passed);
  
  // Calculate average score - if total_questions is missing from API, show N/A
  const validAttempts = completedAttempts.filter(a => a.total_questions && a.total_questions > 0);
  const averageScore = validAttempts.length > 0
    ? Math.round(validAttempts.reduce((sum, a) => sum + ((a.score || 0) / a.total_questions * 100), 0) / validAttempts.length)
    : null;

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl mb-2">
            My Quiz <span className="text-orange-500">Attempts</span>
          </h1>
          <p className="text-lg text-slate-400">
            Track your progress and review past quiz attempts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-400">Total Attempts</div>
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-white">{attempts.length}</div>
          </div>

          <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-400">Passed</div>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-white">{passedAttempts.length}</div>
          </div>

          <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-400">Failed</div>
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-white">
              {completedAttempts.length - passedAttempts.length}
            </div>
          </div>

          <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-slate-400">Average Score</div>
              <Trophy className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-white">
              {averageScore !== null ? `${averageScore}%` : 'N/A'}
            </div>
          </div>
        </div>

        {/* Attempts List */}
        <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Attempt History</h2>

          {attempts.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 mb-4">
                <Trophy className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-lg text-slate-400 mb-4">No quiz attempts yet</p>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30"
              >
                Take Your First Quiz
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {attempts
                .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
                .map((attempt) => {
                  const percentage = (attempt.total_questions || 0) > 0 
                    ? Math.round(((attempt.score || 0) / attempt.total_questions) * 100) 
                    : 0;
                  const isCompleted = attempt.status === 'completed' || !!attempt.completed_at;

                  return (
                    <div
                      key={attempt.attempt_id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-200 bg-gray-800/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {attempt.genre_name || `Genre #${attempt.genre_id}`}
                          </h3>
                          {isCompleted && (
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                attempt.passed
                                  ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                  : 'bg-red-500/10 text-red-400 border border-red-500/30'
                              }`}
                            >
                              {attempt.passed ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3" />
                                  Passed
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3" />
                                  Failed
                                </>
                              )}
                            </span>
                          )}
                          {!isCompleted && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/30">
                              <Clock className="h-3 w-3" />
                              In Progress
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(attempt.started_at)}
                          </div>
                          {isCompleted && (
                            <>
                              <div className="flex items-center gap-1">
                                <Trophy className="h-4 w-4" />
                                Score: {attempt.score}/{attempt.total_questions} ({percentage}%)
                              </div>
                              <div>Pass Score: {attempt.pass_score}%</div>
                            </>
                          )}
                          {!isCompleted && attempt.score > 0 && (
                            <div className="flex items-center gap-1">
                              <Trophy className="h-4 w-4" />
                              Progress: {attempt.score}/{attempt.total_questions} questions
                            </div>
                          )}
                        </div>
                      </div>

                      {isCompleted ? (
                        <Link
                          to={`/quiz/results/${attempt.attempt_id}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-orange-500/50 text-white hover:text-orange-400 transition-all duration-200"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Link>
                      ) : (
                        <Link
                          to={`/quiz/${attempt.genre_id}?attemptId=${attempt.attempt_id}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200"
                        >
                          <Clock className="h-4 w-4" />
                          Continue Quiz
                        </Link>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Bottom Action */}
        {attempts.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-500 transition-colors"
            >
              Take Another Quiz
              <Trophy className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
