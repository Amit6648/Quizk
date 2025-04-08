import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

function Topics({ settopicid, topicid, subjectid, setshowquestions }) {
  const [data, setdata] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/subjects/${subjectid}`)
      .then((res) => {
        setdata(res.data)
      })
      .catch((error) => {
        console.log('there is a error', error)
      })
  }, [subjectid])

  const selecttopics = (tid) => {
    settopicid((prev) => {
      if (prev.includes(tid)) {
        return prev.filter((id) => id !== tid)
      } else {
        return [...prev, tid]
      }
    })
  }

  useEffect(() => {
    console.log('Updated topicid:', topicid)
  }, [topicid])

  const handlequestionclick = () => {
    setshowquestions(true)
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const subjectVariants = {
    hidden: { opacity: 0, scale: 0.75 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <div >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    className="flex flex-wrap justify-center gap-4 w-full max-w-4xl mt-6 mx-auto"
      >
        {data.map((topic, index) => (
          <motion.button
            key={index}
            variants={subjectVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => selecttopics(topic._id)}
            className={`inline-block rounded-lg px-3 py-2 text-lg font-bold text-left transition-all duration-300 ease-in-out ${
              topicid.includes(topic._id)
                ? 'bg-blue-500 text-white'
                : 'text-blue-500 border-b-2 border-blue-500'
            }`}
          >
            {topic.name}
          </motion.button>
        ))}
      </motion.div>

    </div>
  )
}

export default Topics
