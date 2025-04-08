import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {motion} from 'framer-motion'

import { detail } from '../api/auth'

function Subjects({setsubjectid}) {

    const [data, setdata] = useState([])
    const [user, setuser] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3000/subjects").then(res=>{
            setdata(res.data);
        }).catch(Error=>{
            console.log("there is a error", Error);
        })

        detail().then(res=>setuser(res.data.name))

       
      
      }, [])

      const containerVariants = {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      };
      
      const subjectVariants = {
        hidden: { opacity: 0, scale: 0.75 },
        visible: { opacity: 1, scale: 1 },
      };

      
  return (
   
  
  <div>



<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="flex flex-wrap justify-center gap-4 w-full max-w-4xl mt-6 mx-auto"

>

<h1 className="text-3xl font-bold mb-6 text-gray-400 underline">
          Hello <span className="text-blue-500 underline">{user}</span>
        
        </h1>
        <h1 className="text-1xl font-bold text-gray-400">Please Select the <span className="text-blue-500">subject (s)</span> to proceed</h1>

  {data.map((subject, index) => (
    <motion.button
      key={index}
      variants={subjectVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={()=>(setsubjectid(subject._id))}
      className={'inline-block rounded-lg px-3 py-2  text-lg font-bold text-blue-500 text-left transition-all duration-300 ease-in-out border-b-3 border-blue-500'}
    >
      {subject.name}
    </motion.button>
  ))}
</motion.div>


</div>
  
  )
}

export default Subjects
