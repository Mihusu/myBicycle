import React from 'react'
import {useState} from 'react'

export function BikeComponent(props) {

    const [bikeInfo, setBikeInfo] = useState(0);

    const transferBikeOwnership = (info) => {
        console.log(info);
    }

    return (
        <div className='container flex flex-col py-2'>

            <img className='py-2 border bg-orange-100'
                src={
                    props.billede || "../src/assets/bicycle-svgrepo.svg"
                }
                alt={"../src/assets/bicycle-svgrepo.svg"}/>

            <p className='place-self-center'>
                {
                "sn: " + props.serialNumber || "no serial number available"
            }</p>

            <div tabIndex={0}
                className="collapse collapse-arrow border border-base-300 bg-orange-100 rounded-box">
                <input type="checkbox" className="peer"/>
                <div className="collapse-title text-xl font-medium">
                    Bike info
                </div>
                <div className="collapse-content">
                    <p>{
                        props.info || "no info available"
                    }</p>

                    <div className='flex justify-between py-2'>
                        <button className='btn btn-accent'
                            onClick={
                                () => transferBikeOwnership("infoo")
                        }>Overfør</button>
                        <button className='btn btn-warning'
                            disabled={false}>Meld Stjålet</button>
                    </div>
                </div>
            </div>


        </div>
    )
}