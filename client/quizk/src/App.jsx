import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom'
import Home from './componets/Home'
import Welcomepage from './componets/Welcomepage'
import Registor from './componets/Registor'
import Login from './componets/Login'
import Navbar from './componets/Navbar'
import ProtectedRoute from './Hooks/Protectedroute'
import MainPage from './componets/MainPage'

import Quizarea from './componets/Quizarea'
import MultiplayerQuiz from './componets/MultiplayerQuiz'


function App() {


// from guri laptop
  return (




<>

<Router>
<Routes>

<Route path='/' element={<Welcomepage/>}/>
<Route path='/registor' element={<Registor/>}/>
<Route path='/login' element = {<Login/>}/>
<Route path='/home' element = {<ProtectedRoute>
  <Home/>

</ProtectedRoute>}/>

</Routes>
</Router> 

</>

  )
}

export default App


