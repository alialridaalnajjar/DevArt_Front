import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trophy, XCircle, CheckCircle2, ArrowLeft, RotateCcw } from 'lucide-react';
import { quizApi } from '../../utils/quizApi';
import type { QuizAttemptDetail } from '../../utils/Types';

export default function QuizResults() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const [attemptDetail, setAttemptDetail] = useState<QuizAttemptDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttemptDetail = async () => {
      if (!attemptId) return;

      try {
        setLoading(true);
        const data = await quizApi.getAttemptDetails(parseInt(attemptId));
        setAttemptDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchAttemptDetail();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !attemptDetail) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-6 py-4 text-red-400">
          {error || 'Failed to load results'}
        </div>
      </div>
    );
  }

  const percentage = attemptDetail.total_questions > 0 
    ? Math.round((attemptDetail.score / attemptDetail.total_questions) * 100) 
    : 0;
  const passed = attemptDetail.passed;
  
  // Safety check: ensure answers is an array
  const answersList = Array.isArray(attemptDetail.answers) ? attemptDetail.answers : [];
  
  // Fallback values for missing data
  const totalQuestions = attemptDetail.total_questions || 0;
  const score = attemptDetail.score || 0;
  // Convert pass_score from number of questions to percentage
  const passScoreRaw = attemptDetail.pass_score || 0;
  const passScore = totalQuestions > 0 
    ? Math.round((passScoreRaw / totalQuestions) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Result Header */}
        <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-8 mb-8 text-center">
          <div className="mb-6">
            {passed ? (
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30 animate-bounce-slow">
                <Trophy className="h-10 w-10 text-white" />
              </div>
            ) : (
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
                <XCircle className="h-10 w-10 text-white" />
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            {passed ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}
          </h1>
          <p className="text-slate-400 mb-6">
            {passed
              ? "You've passed the quiz! Great job on your achievement."
              : "Don't give up! Review the questions and try again."}
          </p>

          {/* Score Display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-6">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-orange-500 mb-1">{percentage}%</div>
              <div className="text-sm text-slate-400">Your Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-1">
                {score}/{totalQuestions}
              </div>
              <div className="text-sm text-slate-400">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-slate-400 mb-1">{passScore}%</div>
              <div className="text-sm text-slate-400">Pass Score</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/quiz/${attemptDetail.genre_id}`}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-orange-500/30"
            >
              <RotateCcw className="h-5 w-5" />
              Retake Quiz
            </Link>
            <Link
              to="/quiz"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 hover:border-orange-500/50 text-white transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Genres
            </Link>
          </div>
        </div>

        {/* Answer Review */}
        <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Answer Review</h2>

          {answersList.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No answer details available
            </div>
          ) : (
            <div className="space-y-6">
              {answersList.map((answer, index) => (
              <div
                key={answer.question_id}
                className={`p-5 rounded-lg border-2 ${
                  answer.is_correct
                    ? 'border-green-500/30 bg-green-500/5'
                    : 'border-red-500/30 bg-red-500/5'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {answer.is_correct ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-400 mb-1">
                      Question {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {answer.question}
                    </h3>

                    {/* Your answer */}
                    <div className="mb-2">
                      <div className="text-sm text-slate-400 mb-1">Your answer:</div>
                      <div
                        className={`p-3 rounded-lg ${
                          answer.is_correct
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {answer.option_text}
                      </div>
                    </div>

                    {/* Note: Backend doesn't provide correct answer details when wrong */}
                    {!answer.is_correct && (
                      <div className="text-sm text-slate-400 italic mt-2">
                        Review the correct answer in the quiz materials
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 text-center">
          <Link
            to="/quiz/my-attempts"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-500 transition-colors"
          >
            View All My Attempts
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
