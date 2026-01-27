import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { useQuizAttempt } from '../../utils/useQuiz';
import useAuthCookies from '../../utils/UseAuth';
import { toast } from 'react-hot-toast';

export default function QuizTaking() {
  const { genreId } = useParams<{ genreId: string }>();
  const navigate = useNavigate();
  const { getDecodedToken } = useAuthCookies();
  const token = getDecodedToken();
  const [quizStarted, setQuizStarted] = useState(false);

  const {
    questions,
    answers,
    currentQuestionIndex,
    currentQuestion,
    loading,
    error,
    startQuiz,
    submitAnswer,
    completeQuiz,
    goToNext,
    goToPrevious,
    goToQuestion,
    allQuestionsAnswered,
  } = useQuizAttempt(token?.userId || 0, genreId ? parseInt(genreId) : null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleStartQuiz = async () => {
    await startQuiz();
    setQuizStarted(true);
  };

  const handleSelectOption = async (questionId: number, optionId: number) => {
    await submitAnswer(questionId, optionId);
  };

  const handleFinishQuiz = async () => {
    if (!allQuestionsAnswered) {
      toast.error('Please answer all questions before finishing');
      return;
    }

    const result = await completeQuiz();
    if (result) {
      navigate(`/quiz/results/${result.attempt_id}`);
    }
  };

  if (loading && !questions.length) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to start the quiz?
            </h2>
            <p className="text-slate-400 mb-6">
              Once you start, the timer will begin. Make sure you're ready!
            </p>
            <button
              onClick={handleStartQuiz}
              className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-orange-500/30"
            >
              Start Quiz
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="w-full mt-3 border border-gray-700 hover:border-orange-500/50 text-slate-400 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">No questions available</div>
      </div>
    );
  }

  const selectedAnswer = answers.get(currentQuestion.question_id);

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-orange-400">
              {answers.size} / {questions.length} Answered
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-xl bg-linear-to-br from-gray-900 to-gray-800 border border-gray-700 p-8 mb-6">
          <div className="mb-2">
            <span className="text-sm font-medium text-orange-400">Question:</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-6 leading-relaxed">
            {currentQuestion.question || 'Loading question...'}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.option_id;
              return (
                <button
                  key={option.option_id}
                  onClick={() => handleSelectOption(currentQuestion.question_id, option.option_id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-orange-500/50 hover:bg-gray-800'
                  }`}
                >
                  {isSelected ? (
                    <CheckCircle2 className="h-6 w-6 text-orange-500 shrink-0" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-600 shrink-0" />
                  )}
                  <span className={`text-lg ${isSelected ? 'text-white font-medium' : 'text-slate-300'}`}>
                    {option.option_text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 hover:border-orange-500/50 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  index === currentQuestionIndex
                    ? 'bg-orange-500 w-8'
                    : answers.has(questions[index].question_id)
                    ? 'bg-orange-500/50'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleFinishQuiz}
              disabled={!allQuestionsAnswered || loading}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-orange-500/30"
            >
              Finish Quiz
              <CheckCircle2 className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={goToNext}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 hover:border-orange-500/50 text-white transition-all duration-200"
            >
              Next
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Quick Navigation Grid (Mobile) */}
        <div className="mt-8 p-6 rounded-xl bg-gray-900 border border-gray-700">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Quick Navigation</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((q, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`aspect-square rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                  index === currentQuestionIndex
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : answers.has(q.question_id)
                    ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                    : 'border-gray-700 bg-gray-800 text-gray-500 hover:border-orange-500/30'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
