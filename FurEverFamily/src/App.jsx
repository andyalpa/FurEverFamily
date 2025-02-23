import { useState } from 'react'
import Home from './frontend/pages/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="w-full h-full absolute bg-gradiant-to-r from-blue-400 to-green-400">
    <Home />
   </div>
      
    
  )
}

export default App
