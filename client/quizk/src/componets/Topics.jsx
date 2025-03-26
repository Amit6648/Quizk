import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Topics({settopicid,topicid,  subjectid}) {
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
    </div>
  )
}

export default Topics
