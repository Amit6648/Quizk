import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Questions from './Questions';

const socket = io('http://localhost:3000');

function MultiplayerQuiz() {
  const [step, setStep] = useState('start'); // start, join, waiting, quiz, result
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [scores, setScores] = useState({});
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    // Listen for room creation success
    socket.on('room-created', (id) => {
      setRoomId(id);
      setStep('waiting');
    });

    // Listen for successful room join
    socket.on('room-joined', ({ room, player }) => {
      setRoomId(room.id);
      setPlayers(room.players);
      setPlayerId(player.id);
    });

    // Listen for quiz start (when both players join)
    socket.on('quiz-started', (quizQuestions) => {
      setQuestions(quizQuestions);
      setStep('quiz');
    });

    // Listen for next question (controlled by server)
    socket.on('next-question', (nextIndex) => {
      setCurrentQuestionIndex(nextIndex);
    });

    // Listen for game end (scores & players)
    socket.on('game-ended', ({ scores, players }) => {
      setScores(scores);
      setPlayers(players);
      setStep('result');
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off('room-created');
      socket.off('room-joined');
      socket.off('quiz-started');
      socket.off('next-question');
      socket.off('game-ended');
    };
  }, []);

  const createRoom = () => {
    if (!name) return;
    setIsHost(true);
    socket.emit('create-room', name);
  };

  const joinRoom = () => {
    if (!name || !inputRoomId) return;
    socket.emit('join-room', name, inputRoomId);
  };

  const handleAnswer = (qid, option) => {
    setUserAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const submitAnswer = () => {
    socket.emit('submit-answer', {
      roomId,
      playerId,
      questionId: questions[currentQuestionIndex]._id,
      selectedOption: userAnswers[questions[currentQuestionIndex]._id] || '',
    });
  };

  return (
    <div className="p-4 text-white">
      {step === 'start' && (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded text-black"
          />
          <div className="flex gap-4">
            <button
              className="bg-green-600 px-4 py-2 rounded"
              onClick={createRoom}
            >
              Create Room
            </button>
            <button
              className="bg-blue-600 px-4 py-2 rounded"
              onClick={() => setStep('join')}
            >
              Join Room
            </button>
          </div>
        </div>
      )}

      {step === 'join' && (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded text-black"
          />
          <input
            type="text"
            placeholder="Enter Room ID"
            value={inputRoomId}
            onChange={(e) => setInputRoomId(e.target.value)}
            className="p-2 rounded text-black"
          />
          <button
            className="bg-blue-600 px-4 py-2 rounded"
            onClick={joinRoom}
          >
            Join
          </button>
        </div>
      )}

      {step === 'waiting' && (
        <div>
          <p className="text-2xl">Room ID: <strong>{roomId}</strong></p>
          <p>Waiting for another player to join...</p>
          <p>Players in room: {players.length}</p>
        </div>
      )}

      {step === 'quiz' && questions.length > 0 && (
        <div>
          <Questions
            question={questions[currentQuestionIndex]}
            useranswers={userAnswers}
            handleclick={handleAnswer}
          />
          <button
            className="bg-yellow-500 px-4 py-2 mt-4 rounded"
            onClick={submitAnswer}
          >
            Submit Answer
          </button>
        </div>
      )}

      {step === 'result' && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Game Over</h2>
          <div className="bg-gray-800 p-4 rounded-lg max-w-md mx-auto">
            {players.map((player) => (
              <p key={player.id} className="text-xl mb-2">
                {player.name}: <span className="font-bold">{scores[player.id] || 0}</span> points
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiplayerQuiz;