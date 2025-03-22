import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Topics({settopicid, subjectid}) {
    const [data, setdata] = useState([])

    useEffect(() => {
      
        axios.get(`http://localhost:3000/subjects/${subjectid}`).then(res=>{
            setdata(res.data);
        }).catch(error=>{
            console.log("there is a error", error);
            
        })
    }, [subjectid])
    
  return (
    <div>
      <p>select topic </p>

      <ul>
        {
          data.map(topic=>(
            <li key={topic._id}><button onClick={()=>{settopicid(topic._id)}} className='bg-pink-400'>{topic.name}</button></li>
          ))
        }
      </ul>
    </div>
  )
}

export default Topics
