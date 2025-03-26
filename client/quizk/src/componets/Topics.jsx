import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Topics({settopicid,topicid,  subjectid, setshowquestions}) {
    const [data, setdata] = useState([])

    useEffect(() => {
      
        axios.get(`http://localhost:3000/subjects/${subjectid}`).then(res=>{
            setdata(res.data);
        }).catch(error=>{
            console.log("there is a error", error);
            
        })
    }, [subjectid])

    const selecttopics =(tid)=>{
          settopicid(prev=>{
            if (prev.includes(tid)) {
              return prev.filter(id=>id !== tid)
            }
            else{
              return [...prev, tid];
            }
          })

          console.log(topicid);
    }

    const handlequestionclick = ()=>{
   setshowquestions(true);
    }
    
  return (
    <div>
      <p>select topic </p>

      <ul>
        {
          data.map(topic=>(
            <li key={topic._id}><label>
              <input type="checkbox" checked={topicid.includes(topic._id)} onChange={()=>{selecttopics(topic._id)}}/> {topic.name}</label></li>
          ))
        }
      </ul>

      <button onClick={handlequestionclick} className=' bg-green-400'>Confirm</button>
    </div>
  )
}
export default Topics
