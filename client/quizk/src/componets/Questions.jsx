import React from 'react'

function Questions({question, useranswers, handleclick}) {
  return (
    <div className='bg-purple-800 text-white pl-5 '>
        <ul className='flex flex-col gap-5'>

          <li className='flex flex-col gap-2.5'>
            <p className='text-yellow-400 font-bold text-4xl'>{question?.question || "question is loading"}</p>
            <ul>
              {
                question?.options?.map((option, index) => (
                  <li className='flex gap-3.5' key={index}>
                    <input type='radio' name={question?._id}
                      value={option}
                      checked={useranswers[question?._id] === option}
                      onChange={() => handleclick(question?._id, option)}

                    />
                    <label> {option}</label>


                  </li>
                ))
              }
            </ul>

          </li>


        </ul>



      </div>
  )
}

export default Questions
