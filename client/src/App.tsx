import './App.css'
import {UserProvider} from './context/UserContext'
import  Home from './pages/Home/Home'

function App() {


  return (
    <>
      <UserProvider>
        <Home />
      </UserProvider>
    </>
  )
}

export default App
