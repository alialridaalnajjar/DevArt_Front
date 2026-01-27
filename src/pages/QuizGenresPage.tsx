import Navbar from '../components/Reusable/Navbar';
import Footer from '../components/Reusable/Footer';
import QuizGenres from '../components/Quiz/QuizGenres';

export default function QuizGenresPage() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <QuizGenres />
      <Footer />
    </div>
  );
}
