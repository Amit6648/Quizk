// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './componets/Home';
import Welcomepage from './componets/Welcomepage';
import Registor from './componets/Registor';
import Login from './componets/Login';
import Navbar from './componets/Navbar';
import ProtectedRoute from './Hooks/Protectedroute';
import MultiplayerQuiz from './componets/MultiplayerQuiz';
import Profile from './componets/Profile';
import Leaderboard from './componets/Leaderboard';

function Layout() {
  const location = useLocation();
  const showNavbar = ["/home", "/multiplayer", "/profile", "/leaderboard"].includes(location.pathname.toLowerCase());

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path='/' element={<Welcomepage />} />
        <Route path='/registor' element={<Registor />} />
        <Route path='/login' element={<Login />} />

        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/multiplayer' element={<ProtectedRoute><MultiplayerQuiz /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/leaderboard' element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
