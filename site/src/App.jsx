import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)
  let col_val = 500;

  return (
    <div className="App">
      <div className='container max-w-sm mx-auto p-2 flex flex-col -space-y-24 hover:space-y-2'>
        {[...Array(4)].map((_, key) => {
          return (
            <div key={key} className={`w-full h-44 bg-blue-500 shadow-xl border rounded p-2`}>1</div>
          )
        })}
      </div>
    </div>
  )
}

export default App
