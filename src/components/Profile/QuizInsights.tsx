import { Trophy, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthCookies from '../../utils/UseAuth';
import type { QuizAttempt } from '../../utils/Types';

export default function QuizInsights() {
  const { getDecodedToken } = useAuthCookies();
  const token = getDecodedToken();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!token?.userId) return;
      
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quiz/attempts/user/${token.userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch quiz attempts');
        }

        const data = await response.json();
        const attemptsData = Array.isArray(data) ? data : (data.data || data.attempts || []);
        setAttempts(attemptsData);
      } catch (error) {
        console.error('Error fetching quiz attempts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, [token?.userId]);

  if (loading) {
    return null;
  }

  const completedAttempts = attempts.filter(a => a.status === 'completed' || a.completed_at);
  const passedAttempts = completedAttempts.filter(a => a.passed);
  const validAttempts = completedAttempts.filter(a => a.total_questions && a.total_questions > 0);
  const averageScore = validAttempts.length > 0
    ? Math.round(validAttempts.reduce((sum, a) => sum + ((a.score || 0) / a.total_questions * 100), 0) / validAttempts.length)
    : null;

  const recentAttempts = [...completedAttempts]
    .sort((a, b) => new Date(b.completed_at || b.started_at).getTime() - new Date(a.completed_at || a.started_at).getTime())
    .slice(0, 2);

  return (
    <div className="bg-gray-950 rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Quiz Insights</h2>
        <Link
          to="/quiz/my-attempts"
          className="border-orange-600 text-orange-400 hover:rounded-2xl p-1 hover:text-white bg-transparent"
        >
          View All
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1a2332] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-orange-500" />
            <span className="text-xs text-gray-400">Total</span>
          </div>
          <p className="text-2xl font-bold text-white">{attempts.length}</p>
        </div>

        <div className="bg-[#1a2332] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-400">Passed</span>
          </div>
          <p className="text-2xl font-bold text-white">{passedAttempts.length}</p>
        </div>

        <div className="bg-[#1a2332] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <span className="text-xs text-gray-400">Average</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {averageScore !== null ? `${averageScore}%` : 'N/A'}
          </p>
        </div>

        <div className="bg-[#1a2332] rounded-xl p-4 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-orange-500" />
            <span className="text-xs text-gray-400">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {completedAttempts.length > 0 
              ? `${Math.round((passedAttempts.length / completedAttempts.length) * 100)}%`
              : 'N/A'}
          </p>
        </div>
      </div>

      {/* Recent Attempts */}
      {recentAttempts.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Recent Attempts</h3>
          {recentAttempts.map((attempt) => {
            const percentage = (attempt.total_questions || 0) > 0 
              ? Math.round(((attempt.score || 0) / attempt.total_questions) * 100) 
              : 0;

            return (
              <Link
                key={attempt.attempt_id}
                to={`/quiz/results/${attempt.attempt_id}`}
                className="block bg-[#1a2332] rounded-xl p-4 border border-white/5 hover:border-orange-600/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm mb-1 truncate">
                      {attempt.genre_name || `Genre #${attempt.genre_id}`}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>Score: {attempt.score}/{attempt.total_questions}</span>
                      <span>•</span>
                      <span>{percentage}%</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    attempt.passed
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {attempt.passed ? 'Passed' : 'Failed'}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm mb-4">No quiz attempts yet</p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium transition-all"
          >
            Take Your First Quiz
          </Link>
        </div>
      )}
    </div>
  );
}
