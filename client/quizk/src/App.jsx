import { useState, useEffect } from 'react'
import Quizarea from './componets/Quizarea'
import Topics from './componets/Topics'
import Subjects from './componets/Subjects'

function App() {

  const [subjectid, setsubjectid] = useState(null)
  const [topicid, settopicid] = useState([])

  return (
    <>
    <Subjects setsubjectid={setsubjectid}/>
     {subjectid &&(<Topics subjectid={subjectid} settopicid={settopicid} topicid={topicid}/>)}
     {topicid.length>0&&(<Quizarea topicid={topicid}/>)}
     
    </>
  )
}

export default App
