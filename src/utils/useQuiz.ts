import { useState, useEffect } from 'react';
import { quizApi } from './quizApi';
import type { QuizGenre, QuizQuestion, QuizAttempt } from './Types';

export function useQuizGenres() {
  const [genres, setGenres] = useState<QuizGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const data = await quizApi.getGenres();
        setGenres(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load genres');
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
}

export function useQuizAttempt(userId: number, genreId: number | null) {
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async () => {
    if (!genreId) return;

    try {
      setLoading(true);
      const attemptData = await quizApi.startAttempt(userId, genreId);
      setAttempt(attemptData);

      const questionsData = await quizApi.getQuestions(genreId);
      
      
      
      // Shuffle options for each question to randomize order
      const shuffledQuestions = questionsData.map(question => {
        // Check if options exist and is an array
        if (!question.options || !Array.isArray(question.options)) {
         
          return {
            ...question,
            options: []
          };
        }
        
        return {
          ...question,
          options: [...question.options].sort(() => Math.random() - 0.5)
        };
      });
      
      setQuestions(shuffledQuestions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start quiz');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (questionId: number, optionId: number) => {
    if (!attempt) return;

    try {
      await quizApi.submitAnswer(attempt.attempt_id, questionId, optionId);
      setAnswers(new Map(answers.set(questionId, optionId)));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    }
  };

  const completeQuiz = async (): Promise<QuizAttempt | null> => {
    if (!attempt) return null;

    try {
      setLoading(true);
      const completedAttempt = await quizApi.completeAttempt(attempt.attempt_id);
      setAttempt(completedAttempt);
      setError(null);
      return completedAttempt;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete quiz');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const allQuestionsAnswered = questions.length > 0 && answers.size === questions.length;

  return {
    attempt,
    questions,
    answers,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex] || null,
    loading,
    error,
    startQuiz,
    submitAnswer,
    completeQuiz,
    goToNext,
    goToPrevious,
    goToQuestion,
    allQuestionsAnswered,
  };
}

export function useUserAttempts(userId: number) {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttempts = async () => {
    try {
      setLoading(true);
      const data = await quizApi.getUserAttempts(userId);
      setAttempts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load attempts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttempts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { attempts, loading, error, refetch: fetchAttempts };
}
