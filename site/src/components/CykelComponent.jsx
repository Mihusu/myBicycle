import React from 'react'

function CykelComponent(props) {
    return (
        <div className='CykelComponent container flex flex-col grid-flow-col justify-content py-2'>

            <img className='CykelBillede py-2 border'
                src={
                    props.billede || "../src/assets/bicycle-svgrepo.svg"
                }
                alt={
                    "../src/assets/bicycle.png" || "empty"
                }/>

            <p>{
                props.serialNumber || "no serial number available"
            }</p>

            <div tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">

                <div className="collapse-title text-xl font-medium">
                    Bike info
                </div>
                <div className="collapse-content">
                    <p>{
                        props.info || "no info available"
                    }</p>
                </div>
            </div>
            <div className='flex justify-between py-2'>
                <a className='btn' href="/login">Overfør</a>
                <button className='btn'
                    disabled={true}>Meld Stjålet</button>
            </div>


        </div>
    )
}

export default CykelComponent
