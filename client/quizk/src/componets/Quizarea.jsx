import React, { useEffect, useState } from "react";
import axios from "axios";


export default function QuizArea({ topicid }) {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/subjects/topics/${topicid}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, [topicid]);

  const handleOptionSelect = (questionId, option) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const res = questions.map((q) => ({
      question: q.text,
      selected: userAnswers[q._id] || "No Answer",
      correct: userAnswers[q._id] === q.correctAnswer,
      answer: q.correctAnswer,
    }));
    setResult(res);
    setSubmitted(true);
  };

  const getScore = () => {
    return result.reduce((score, r) => (r.correct ? score + 1 : score), 0);
  };

  const currentQ = questions[currentIndex];

  return (
   
      <div className="flex justify-center items-start mt-8 px-4 sm:px-6">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl font-bold text-blue-600 underline text-center mb-3">Algo Arena</h1>

          {!submitted && (
            <p className="text-gray-500 text-center mb-6">
              Question {currentIndex + 1} of {questions.length}
            </p>
          )}

          {!submitted ? (
            <>
              {currentQ ? (
                <div className="bg-[#ddf2fd] p-6 rounded-3xl shadow-md">
                  <p className="text-lg font-semibold mb-6 text-black">
                    <span className="font-bold text-lg">Q {currentIndex + 1}.</span> {currentQ.text}
                  </p>

                  {currentQ.options.map((option, idx) => {
                    const isSelected = userAnswers[currentQ._id] === option;
                    let bgColor = isSelected ? "bg-blue-400" : "bg-[#c8eeff]";

                    return (
                      <div
                        key={idx}
                        onClick={() => handleOptionSelect(currentQ._id, option)}
                        className={`flex items-center px-4 py-3 mb-4 rounded-xl cursor-pointer transition-colors font-medium text-black ${bgColor}`}
                      >
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-500 font-bold mr-4 shadow-sm">
                          {String.fromCharCode(65 + idx)}
                        </div>
                        {option}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-red-500 text-center mt-4">Loading question...</p>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {currentIndex > 0 ? (
                  <button
                    onClick={handlePrev}
                    className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold"
                  >
                    ← Prev
                  </button>
                ) : <div />}

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={!userAnswers[currentQ._id]}
                    className={`py-2 px-4 rounded-xl font-semibold text-white transition ${
                      userAnswers[currentQ._id] ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl font-semibold"
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="mt-6">
              <div className="text-xl font-semibold text-green-700 text-center mb-4">
                🎉 Your Score: {getScore()} / {questions.length}
              </div>

              <ul className="flex flex-col gap-4">
                {result.map((res, idx) => (
                  <li key={idx} className="bg-[#ddf2fd] p-4 rounded-2xl shadow">
                    <p className="font-bold text-black mb-1">
                      Q{idx + 1}. {res.question}
                    </p>
                    <p className={`${res.correct ? "bg-green-300" : "bg-red-300"} p-2 rounded-md`}>
                      Your Answer: {res.selected}
                    </p>
                    {!res.correct && (
                      <p className="bg-yellow-200 p-2 mt-1 rounded-md">
                        Correct Answer: {res.answer}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              
            </div>
          )}
        </div>
      </div>

  );
}
