import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Questions from './Questions'

function Quizarea({topicid}) {
    const [data, setdata] = useState([])
    const [useranswers, setuseranswers] = useState({})
    const [index, setindex] = useState(0)
    const [ans, setans] = useState(false)
    const [result, setresult] = useState([])
  
  
    const handleclick = (quid, option) => {
      setuseranswers(prev => ({
        ...prev,
  
        [quid]: option,
  
  
  
      }));
    };
  
  
    const anscheck = () => {
  
      let res = data.map(ques => {
        const select = useranswers[ques._id];
        return {
          question: ques.question,
          selectedans: select || "no answer",
          correct: select === ques.correctAnswer,
          answer: ques.correctAnswer,
  
        };
      });
  
      setans(true);
      setresult(res);
    };
  
  
    useEffect(() => {
  
      axios.get(`http://localhost:3000/subjects/topics/${topicid}`).then((res) => {
        setdata(res.data);
        console.log(res.data);
  
      }).catch((err) => {
        console.log("There is a error", err);
  
      })
    }, [topicid])
  
    const nextques = () => {
      if (index < data.length - 1) {
        setindex(index + 1);
      }
  
    }
  
    const prevques = () => {
      if (index > 0) {
        setindex(index - 1);
      }
    }
  return (
    <>

    {!ans ? (<Questions question={data[index]} useranswers={useranswers} handleclick={handleclick} />
    ) : (
      <div>
        <ul className='flex flex-col gap-4'>
        {result.map(res => (
          
            <li>
              <p className='bg-gray-500'>{res.question}</p>
              <p className={`${res.correct ? "bg-green-500" : "bg-red-400"}`}>{res.selectedans}</p>
              <p className='bg-amber-500'>{res.answer}</p>
            </li>
          
        ))
       
        }
        </ul>
      </div>

    )}



{ !ans &&(


    <div>
      
      {index > 0 && (
        <button className='h-9 w-17 bg-blue-400 font-bold' onClick={prevques}>Prev</button>
      )}


      {index < data.length - 1 ? (
        <button className='h-9 w-17 bg-amber-400 font-bold' onClick={nextques}>Next</button>
      ) : (
        <button className='h-9 w-17 bg-green-400 font-bold' onClick={anscheck}>submit</button>
      )}


    </div>

)}



  </>
  )
}

export default Quizarea
