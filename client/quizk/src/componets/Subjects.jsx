import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Subjects({setsubjectid}) {

    const [data, setdata] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/subjects").then(res=>{
            setdata(res.data);
        }).catch(Error=>{
            console.log("there is a error", Error);
        })
      
      }, [])

      
  return (
    <div>
   <p>Select a topic</p>

   <ul className='flex gap-2.5 flex-col'>
    {data.map(sub=>(
        <li key={sub._id}><button onClick={()=>setsubjectid(sub._id)} className='bg-pink-400'>{sub.name}</button></li>
    ))}
   </ul>
    </div>
  )
}

export default Subjects
