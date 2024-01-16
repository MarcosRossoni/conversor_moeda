import {useState} from 'react'
import './App.css'
import CurrencyConverter from "./components/CurrencyConverter.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CurrencyConverter/>
    </>
  )
}

export default App
