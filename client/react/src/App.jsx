import { useState } from 'react'
import './App.css'
import ModDash from './pages/modDash'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <ModDash />
    </div>
  )
}

export default App
