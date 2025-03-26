import { useState, useEffect } from 'react'
import Quizarea from './componets/Quizarea'
import Topics from './componets/Topics'
import Subjects from './componets/Subjects'

function App() {

  const [subjectid, setsubjectid] = useState(null)
  const [topicid, settopicid] = useState([])
  const [showquestions, setshowquestions] = useState(false)

  return (
    <>
    <Subjects setsubjectid={setsubjectid}/>
     {subjectid &&(<Topics subjectid={subjectid} settopicid={settopicid} topicid={topicid} setshowquestions={setshowquestions}/>)}
     {showquestions &&(<Quizarea topicid={topicid}/>)}
     
    </>
  )
}

export default App
