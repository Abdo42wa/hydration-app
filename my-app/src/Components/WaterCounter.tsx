import React, { useEffect, useState } from 'react'
const MAX_WATER_AMOUNT = 4000;
const MIN_WATER_AMOUNT = 2000;
const WaterCounter = () => {
    const [waterAmount, setWaterAmount] = useState(0);
    const [message, setMessage] = useState("");

    const addWater = () => {

        if (waterAmount <= MAX_WATER_AMOUNT) {
            localStorage.setItem('waterAmount', `${waterAmount}`);
            localStorage.setItem('Date', new Date().toLocaleDateString('lt-LT'));
            return;
        }
        setMessage("Oops you have reached your limit ");
    }

    const onWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let result = Number(localStorage.getItem('waterAmount')) + +(e.target.value)
        setWaterAmount(result);
    }

    const getCurentDay = () => {

        var currentDate = new Date().toLocaleDateString('lt-LT');
        if (currentDate !== localStorage.getItem('Date')) {
            localStorage.setItem('cupsNumber', String(0))
            console.log(currentDate);
            console.log(localStorage.getItem('Date'))
            return null;
        }

    }

    useEffect(() => {
        setWaterAmount(Number(localStorage.getItem('waterAmount')))
        getCurentDay();
    }, []);


    return (
        <>
            <p>Drink water( 2L - 4L)</p>
            <h2>{waterAmount} ml</h2>
            <label>Enter water in milliliters</label>
            <input type='number' onChange={(e) => onWaterChange(e)} />
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <button onClick={() => addWater()}>Add cup</button>
        </>
    )
}


export default WaterCounter;