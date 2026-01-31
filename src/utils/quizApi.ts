import type { QuizGenre, QuizQuestion, QuizAttempt, QuizAttemptDetail } from './Types';

const API_URL = import.meta.env.VITE_API_URL;

export const quizApi = {
  // Get all quiz genres
  async getGenres(): Promise<QuizGenre[]> {
    const response = await fetch(`${API_URL}/api/quiz/genres`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }

    const data = await response.json();
    // Handle both array response and wrapped response like { data: [...] }
    return Array.isArray(data) ? data : (data.data || data.genres || []);
  },

  // Get a specific genre
  async getGenre(genreId: number): Promise<QuizGenre> {
    const response = await fetch(`${API_URL}/api/quiz/genres/${genreId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch genre');
    }

    return response.json();
  },

  // Get questions for a genre
  async getQuestions(genreId: number): Promise<QuizQuestion[]> {
    const response = await fetch(`${API_URL}/api/quiz/genres/${genreId}/questions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data.data || data.questions || []);
  },

  // Start a new quiz attempt
  async startAttempt(userId: number, genreId: number): Promise<QuizAttempt> {
    const response = await fetch(`${API_URL}/api/quiz/attempts/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, genre_id: genreId }),
    });

    if (!response.ok) {
      throw new Error('Failed to start attempt');
    }

    const data = await response.json();
    return data.data || data.attempt || data;
  },

  // Submit an answer
  async submitAnswer(attemptId: number, questionId: number, optionId: number): Promise<void> {
    const response = await fetch(`${API_URL}/api/quiz/attempts/${attemptId}/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question_id: questionId, option_id: optionId }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit answer');
    }
  },

  // Complete an attempt
  async completeAttempt(attemptId: number): Promise<QuizAttempt> {
    const response = await fetch(`${API_URL}/api/quiz/attempts/${attemptId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to complete attempt');
    }

    const data = await response.json();
    return data.data || data.attempt || data;
  },

  // Get user's attempts
  async getUserAttempts(userId: number): Promise<QuizAttempt[]> {
    const response = await fetch(`${API_URL}/api/quiz/attempts/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user attempts');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data.data || data.attempts || []);
  },

  // Get specific attempt details
  async getAttemptDetails(attemptId: number): Promise<QuizAttemptDetail> {
    const response = await fetch(`${API_URL}/api/quiz/attempts/${attemptId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attempt details');
    }

    const data = await response.json();
    
    const attempt = data.data || data.attempt || data;

    return attempt;
  },
};
