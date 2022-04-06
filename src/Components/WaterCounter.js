import { useEffect, useState } from "react";
import React from 'react'

const WaterCounter = () => {
    const [cupsAmount, setCupsAmount] = useState(0);
    const [message, setMessage] = useState("");

    var today = new Date();

    const addWater = () => {

        if (cupsAmount !== 8) {

            var cupsNumber = Number(localStorage.getItem('cupsNumber'));

            setCupsAmount(cupsAmount + 1);
            localStorage.setItem('cupsNumber', ++cupsNumber);
            localStorage.setItem('Date', today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
        } else {

            setMessage("Oops you have reached your limit ");
        }

    }
    const getTheCurentDay = () => {

        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        if (currentDate != localStorage.getItem('Date')) {
            localStorage.setItem('cupsNumber', 0)
        } else {
            return
        }

    }
    useEffect(() => {
        setCupsAmount(Number(localStorage.getItem('cupsNumber')))
        getTheCurentDay();
    }, []);

    return (
        <>
            <p>drink water( 2L - 4L)</p>
            <h2>{cupsAmount}</h2>
            <p style={{ color: 'red' }}>{message}</p>
            <button onClick={() => addWater()}>Add cup</button>

            <p>Info: 1 cup = 0.5 L</p>
        </>
    )
}

export default WaterCounter

