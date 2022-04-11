import React, { useEffect, useState } from 'react'
import { Typography, Input, Alert } from '@mui/material';
import Button from '@mui/material/Button'
const MAX_WATER_AMOUNT = 4000;
const WaterCounter = () => {
    const [waterAmount, setWaterAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [userInput, setUserInpute] = useState(0);

    const addWater = () => {
        const result = waterAmount + userInput;
        if (result <= MAX_WATER_AMOUNT) {
            localStorage.setItem('waterAmount', `${result}`);
            localStorage.setItem('Date', new Date().toLocaleDateString('lt-LT'));
            return;
        }
        //setMessage("Oops you have reached your limit ");
    }

    const onWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        //let result = Number(localStorage.getItem('waterAmount')) + Number(e.target.value)
        const result = waterAmount + userInput;
        setUserInpute(Number(e.target.value));
        if (result <= MAX_WATER_AMOUNT) {
            setMessage("");
            return;
        }
        setMessage("Oops you have reached your limit ");
    }

    const setCurentDay = () => {

        var currentDate = new Date().toLocaleDateString('lt-LT');
        if (currentDate !== localStorage.getItem('Date')) {
            localStorage.setItem('cupsNumber', `${0}`)
        }
    }

    useEffect(() => {
        setWaterAmount(Number(localStorage.getItem('waterAmount')));
        setCurentDay();
    }, []);


    return (
        <>
            <Typography>Drink water( 2L - 4L)</Typography>
            <Typography fontWeight={900} component={'h2'} >{waterAmount + userInput} ml</Typography>
            <Typography>Enter water in milliliters</Typography>
            <Input type='number' onChange={onWaterChange} />
            {message && <Alert severity="error">{message}</Alert>}
            <Button variant="outlined" color="success" size="small" onClick={() => addWater()}>Add cup</Button>
        </>
    )
}


export default WaterCounter;