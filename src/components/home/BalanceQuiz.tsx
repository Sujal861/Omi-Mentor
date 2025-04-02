
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizProps {
  onClose: () => void;
}

const BalanceQuiz = ({ onClose }: QuizProps) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  
  const questions = [
    {
      id: 'q1',
      question: 'How often do you feel unsteady when standing or walking?',
      options: [
        { value: 'never', label: 'Never', points: 3 },
        { value: 'rarely', label: 'Rarely', points: 2 },
        { value: 'sometimes', label: 'Sometimes', points: 1 },
        { value: 'often', label: 'Often', points: 0 }
      ]
    },
    {
      id: 'q2',
      question: 'Do you have difficulty getting up from a chair without using your arms?',
      options: [
        { value: 'no', label: 'No difficulty at all', points: 3 },
        { value: 'slight', label: 'Slight difficulty', points: 2 },
        { value: 'moderate', label: 'Moderate difficulty', points: 1 },
        { value: 'severe', label: 'Severe difficulty', points: 0 }
      ]
    },
    {
      id: 'q3',
      question: 'Have you fallen in the past year?',
      options: [
        { value: 'no', label: 'No', points: 3 },
        { value: 'once', label: 'Once', points: 2 },
        { value: 'twice', label: 'Twice', points: 1 },
        { value: 'moreThanTwice', label: 'More than twice', points: 0 }
      ]
    },
    {
      id: 'q4',
      question: 'How would you rate your overall confidence in maintaining your balance?',
      options: [
        { value: 'veryConfident', label: 'Very confident', points: 3 },
        { value: 'confident', label: 'Confident', points: 2 },
        { value: 'somewhat', label: 'Somewhat confident', points: 1 },
        { value: 'notConfident', label: 'Not confident', points: 0 }
      ]
    },
    {
      id: 'q5',
      question: 'Do you engage in regular physical activity?',
      options: [
        { value: 'frequently', label: '3+ times per week', points: 3 },
        { value: 'regularly', label: '1-2 times per week', points: 2 },
        { value: 'occasionally', label: 'A few times per month', points: 1 },
        { value: 'rarely', label: 'Rarely or never', points: 0 }
      ]
    }
  ];
  
  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };
  
  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      // Calculate score
      let totalPoints = 0;
      let maxPoints = 0;
      
      questions.forEach(q => {
        const answer = answers[q.id];
        const option = q.options.find(opt => opt.value === answer);
        
        if (option) {
          totalPoints += option.points;
        }
        
        maxPoints += 3; // Max points per question
      });
      
      // Convert to percentage
      const calculatedScore = Math.round((totalPoints / maxPoints) * 100);
      setScore(calculatedScore);
    }
  };
  
  const currentQuestion = questions[step - 1];
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold">Balance Assessment Quiz</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8">
          <AnimatePresence mode="wait">
            {score === null ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-balance-blue h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(step / questions.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Question {step} of {questions.length}
                  </div>
                </div>
                
                <h4 className="text-lg font-medium mb-6">{currentQuestion.question}</h4>
                
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 rounded-lg border ${
                        answers[currentQuestion.id] === option.value 
                          ? 'border-balance-blue bg-balance-blue/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      } cursor-pointer transition-all`}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    >
                      <label className="flex items-center cursor-pointer w-full">
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option.value}
                          checked={answers[currentQuestion.id] === option.value}
                          onChange={() => handleAnswer(currentQuestion.id, option.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border ${
                          answers[currentQuestion.id] === option.value
                            ? 'border-balance-blue bg-balance-blue'
                            : 'border-gray-300'
                        } flex items-center justify-center mr-3`}>
                          {answers[currentQuestion.id] === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span>{option.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id]}
                    className="bg-balance-blue hover:bg-balance-indigo"
                  >
                    {step === questions.length ? 'See Results' : 'Next Question'}
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="inline-block p-4 bg-balance-blue/10 rounded-full mb-6">
                  <Award size={40} className="text-balance-blue" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Your Balance Score</h3>
                
                <div className="w-48 h-48 mx-auto relative my-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold">{score}%</div>
                  </div>
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="2"
                    />
                    <path
                      className="circle"
                      strokeDasharray={`${score}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={score > 75 ? "#4CAF50" : score > 50 ? "#2196F3" : score > 25 ? "#FF9800" : "#F44336"}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                
                <div className="max-w-md mx-auto mb-8">
                  <h4 className="font-semibold text-lg mb-2">
                    {score > 75 
                      ? "Excellent Balance!" 
                      : score > 50 
                      ? "Good Balance" 
                      : score > 25 
                      ? "Room for Improvement" 
                      : "Needs Attention"}
                  </h4>
                  <p className="text-gray-600">
                    {score > 75 
                      ? "You have great balance fundamentals. Continue to build on your strength for even better results." 
                      : score > 50 
                      ? "Your balance is good, but targeted exercises can help improve your stability further." 
                      : score > 25 
                      ? "With regular training, you can significantly improve your balance and stability." 
                      : "A structured balance program would be beneficial for improving your stability and confidence."}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={onClose}
                    variant="outline"
                    className="border-balance-blue text-balance-blue"
                  >
                    Close
                  </Button>
                  <Button 
                    className="bg-balance-blue hover:bg-balance-indigo"
                  >
                    Get Personalized Plan
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default BalanceQuiz;

// Add some CSS for the circular chart
const style = document.createElement('style');
style.textContent = `
  .circular-chart {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .circle {
    transition: stroke-dasharray 1s ease-in-out;
  }
`;
document.head.appendChild(style);
