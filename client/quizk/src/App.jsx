import { useState, useEffect } from 'react'
import Quizarea from './componets/quizarea'
import Topics from './componets/Topics'
import Subjects from './componets/Subjects'

function App() {

  const [subjectid, setsubjectid] = useState(null)
  const [topicid, settopicid] = useState(null)

  return (
    <>
    <Subjects setsubjectid={setsubjectid}/>
     {subjectid &&(<Topics subjectid={subjectid} settopicid={settopicid}/>)}
     {topicid&&(<Quizarea topicid={topicid}/>)}
     
    </>
  )
}

export default App
