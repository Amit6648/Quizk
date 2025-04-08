import { useState } from 'react';
import Quizarea from './Quizarea';
import Topics from './Topics';
import Subjects from './Subjects';
import Navbar from './Navbar'

function Home() {
  const [step, setStep] = useState(1); // 1: Subjects, 2: Topics, 3: Quiz
  const [subjectid, setsubjectid] = useState(null);
  const [topicid, settopicid] = useState([]);

  const handleNext = () => {
    if (step === 1 && subjectid) setStep(2);
    else if (step === 2 && topicid.length > 0) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div>
   
      {step === 1 && <Subjects setsubjectid={setsubjectid} />}
      {step === 2 && (
        <Topics
          subjectid={subjectid}
          settopicid={settopicid}
          topicid={topicid}
        />
      )}
      {step === 3 && <Quizarea topicid={topicid} />}

      {/* Navigation buttons (hidden in step 3) */}
      {step !== 3 && (
  <div className="mt-6 flex justify-around gap-50">
    {step > 1 ? (
      <button
        onClick={handleBack}
        className="px-4 py-2 rounded bg-gray-200 text-black"
      >
        Back
      </button>
    ) : (
      <div></div> // empty div to keep spacing when Back is hidden
    )}

    <button
      onClick={handleNext}
      disabled={
        (step === 1 && !subjectid) ||
        (step === 2 && topicid.length === 0)
      }
      className="px-5 py-3 rounded bg-blue-500 text-white disabled:opacity-50"
    >
      {step === 2 ? 'Start Quiz' : 'Next ->'}
    </button>
  </div>
)}

    </div>
  );
}

export default Home;




