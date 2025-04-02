import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom'
import Home from './componets/Home'
import Login from './componets/Registor'
import Welcomepage from './componets/Welcomepage'
import Registor from './componets/Registor'

function App() {


// from guri laptop
  return (


<Router>
<Routes>

<Route path='/' element={<Welcomepage/>}/>
<Route path='/registor' element={<Registor/>}/>

</Routes>
</Router> 

  )
}

export default App
