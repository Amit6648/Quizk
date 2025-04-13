import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000/')


export default function MultiplayerQuiz() {

  const [name, setname] = useState('')
  const [roomid, setroomid] = useState('')
  const [mode, setmode] = useState('menu')
  const [players, setplayers] = useState([])
  const [ishost, setishost] = useState(false)
  
   const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState([]);

const currentans = useRef({})
  

  
    const handleOptionSelect = (questionId, option) => {

      currentans.current = {
        questionId : questionId,
        option : option
      };

      

      setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
    };
  
    const currentQ = questions[currentIndex];
    const handleNext = () => {
       socket.emit('player-ans', currentans)
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
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
  
  



  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    })

    socket.on('players-joined', (players) => {
      console.log(players);
      setplayers(players)
  


    })

    socket.on('start-trigger', (s)=>{
      setQuestions(s);
      setmode('game')
      
    })

  }, [])


  const handlecreate = () => {
    socket.emit('create-room', { roomid: roomid, name: name });

    setname('')
    setroomid('')
    setmode('lobby')
    setishost(true)


  }

  const handlejoinroom = () => {
    socket.emit('join-room', { name: name, roomid: roomid });
    setname('')
    setroomid('')
    setmode('lobby')
  }

  const handlestartroom = ()=>{
    socket.emit('start-game');
  }



  return (
    <div>

      {mode === 'menu' && (<div className='create-room-or-join-room bg-green-700 flex flex-col gap-5'>
        <button className='bg-purple-500 text-blue-50 font-bold' onClick={() => setmode('create')} >create room</button>
        <button className='bg-purple-500 text-blue-50 font-bold' onClick={() => setmode('join')}>join</button>
      </div>)}


      {mode === 'create' && (<div className='room details bg-red-500'>
        <input type="text" value={name} placeholder='Enter your name' onChange={e => (setname(e.target.value))} />
        <input type="text" value={roomid} placeholder='Enter roomid ' onChange={e => (setroomid(e.target.value))} />
        <button className='bg-amber-700' onClick={handlecreate}> click me</button>
      </div>
      )}

      {mode === 'join' && (<div className='room details bg-red-500'>
        <input type="text" value={name} placeholder='Enter your name' onChange={e => (setname(e.target.value))} />
        <input type="text" value={roomid} placeholder='Enter roomid to join ' onChange={e => (setroomid(e.target.value))} />
        <button className='bg-blue-700' onClick={handlejoinroom}> click me</button>
      </div>
      )}

      {
        mode === 'lobby' && (
          <div className='bg-black text-white font-bold'>

            players in lobby
            {
              players.map(player => (
                <p>
                 
                  {player.name}
                </p>
              ))

              
            }

            { ishost && <button onClick={handlestartroom} className='bg-pink-500'>Start</button>}
          </div>
        )
      }


{
  mode === 'game' && (
    <div>
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

             
              <div className="flex justify-between mt-6">
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



    </div>
  )
}



    </div>
  )
}

