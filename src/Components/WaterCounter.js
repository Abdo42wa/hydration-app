import { useEffect, useState } from "react";
import React from 'react'

const WaterCounter = () => {
    const [cup, setCup] = useState(0);
    const [message, setMessage] = useState("")

    const addWater = () => {

        if (cup !== 8) {

            var cupsNumber = Number(localStorage.getItem('cupsNumber'));

            setCup(cup + 1);
            localStorage.setItem('cupsNumber', ++cupsNumber);
        } else {

            setMessage("Oops you have reached your limit ");
        }

    }
    useEffect(() => {
        setCup(Number(localStorage.getItem('cupsNumber')))

    }, []);

    return (
        <>
            <p>drink water( 2L - 4L)</p>
            <h2>{cup}</h2>
            <p style={{ color: 'red' }}>{message}</p>
            <button onClick={() => addWater()}>Add cup</button>

            <p>Info: 1 cup = 0.5 L</p>
        </>
    )
}

export default WaterCounter

