import { motion } from "framer-motion";
import { useState } from "react";

const subjects = [
  "OOP",
  "Digital Electronics",
  "COA",
  "PPS",
  "Organisational Behaviour",
  "Cybersecurity",
  "Calculus",
  "Mathematics II",
  "BEE",
  "Data Systems",
  "DSA",
];

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

export default function MainPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen  p-6 flex flex-col items-start">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-start gap-4 w-full max-w-4xl"
      >
        {subjects.map((subject, index) => (
          <motion.button
            key={index}
            variants={subjectVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(subject)}
            className={`inline-block rounded-lg px-3 py-2  text-lg font-bold text-blue-500 text-left transition-all duration-300 ease-in-out border-b-3 border-blue-500
              ${selected === subject ? "bg-blue-300" : "bg-indigo-200 hover:bg-indigo-600"}`}
          >
            {subject}
          </motion.button>
        ))}
      </motion.div>


    </div>
  );
}
