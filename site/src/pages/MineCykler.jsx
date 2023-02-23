import {useState} from 'react'
import BikeComponent from '../components/BikeComponent';

const MineCykler = () => {

    const [count, setCount] = useState(0)
    let col_val = 500;

    return (
        <div className="App">

            <div className='container max-w-sm mx-auto p-2 space-y-2 '>
                {
                [...Array(4)].map((_, key) => {
                    return (
                        <div key={key}
                            className={`w-full bg-content shadow-xl border rounded p-2 focus:py-48`}>
                            <div>Hvor er mine cykler? {key + 1}</div>
                            
                            <BikeComponent />
                        </div>
                    )
                })
            } </div>
        </div>
    )
}

export default MineCykler
