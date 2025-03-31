import { useState, useEffect } from 'react'
import Quizarea from './Quizarea'
import Topics from './Topics'
import Subjects from './Subjects'
function Home() {

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

export default Home