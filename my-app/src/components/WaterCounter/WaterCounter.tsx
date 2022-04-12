import React, { useEffect, useState } from 'react'
import { Typography, Input, Alert, Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
const MAX_WATER_AMOUNT = 4000;
const WaterCounter = () => {
    const [waterAmount, setWaterAmount] = useState(Number(localStorage.getItem('drankWaterAmount')));
    const [message, setMessage] = useState("");
    const [waterInput, setWaterInput] = useState(0);

    const addWater = () => {
        const result = waterAmount + waterInput;
        if (result <= MAX_WATER_AMOUNT) {
            localStorage.setItem('drankWaterAmount', `${result}`);
            localStorage.setItem('Date', new Date().toLocaleDateString('lt-LT'));
            setWaterAmount(result);
            return;
        }
        setMessage("Oops you have reached your limit ");

    }

    const onWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaterInput(Number(e.target.value));
    }

    const setCurrentDay = () => {
        const currentDate = new Date().toLocaleDateString('lt-LT');
        const storedDate = localStorage.getItem('Date');
        if (currentDate !== storedDate) {
            setWaterAmount(0);
            localStorage.setItem('Date', currentDate);
        }
    }
    const handleClose = () => {
        setMessage("");
    };



    useEffect(() => {
        setCurrentDay();
    }, []);

    useEffect(() => {
        localStorage.setItem('drankWaterAmount', `${waterAmount}`);
        setCurrentDay();
    }, [waterAmount])


    return (
        <>
            <Dialog
                open={!!message}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText>
                        <Alert severity="error">{message}</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>close</Button>
                </DialogActions>
            </Dialog>


            <Typography>Drink water (2L - {MAX_WATER_AMOUNT / 1000}L)</Typography>
            <Typography fontWeight={900}>{waterAmount} ml</Typography>
            <Typography>Enter water in milliliters</Typography>
            <Input data-testid='waterInput' type='number' inputProps={{ min: 0 }} onChange={onWaterChange} />
            <Button variant="outlined" color="success" size="small" onClick={() => addWater()}>Add</Button>
        </>
    )
}


export default WaterCounter;