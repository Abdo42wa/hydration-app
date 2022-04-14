import React, { useEffect, useState } from 'react'
import { Typography, Input, Alert, Button, Dialog, DialogContent, DialogContentText, DialogActions, CardActions } from '@mui/material';
const MAX_WATER_AMOUNT = 4000;
const WaterCounter = () => {
    const [drankWaterAmount, setDrankWaterAmount] = useState(Number(localStorage.getItem('drankWaterAmount')));
    const [message, setMessage] = useState("");
    const [waterInput, setWaterInput] = useState(0);

    const addWater = () => {
        const result = drankWaterAmount + waterInput;
        if (result <= MAX_WATER_AMOUNT) {
            setDrankWaterAmount(result);
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
            setDrankWaterAmount(0);
            localStorage.setItem('Date', currentDate);
        }
    }
    const handleClose = () => {
        setMessage("");
    };
    useEffect(() => {
        localStorage.setItem('drankWaterAmount', `${drankWaterAmount}`);
        setCurrentDay();
    }, [drankWaterAmount])

    useEffect(() => {
        setCurrentDay();
    }, []);




    return (
        <>
            <Dialog
                open={!!message}
                onClose={handleClose}
            >
                <DialogContent>
                    <DialogContentText>
                        <Alert data-testid="alert" severity="error">{message}</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>close</Button>
                </DialogActions>
            </Dialog>


            <Typography color='white' fontSize='27px'>Drink water (2L - {MAX_WATER_AMOUNT / 1000}L)</Typography>
            <Typography fontWeight={900}>drink water amount: {drankWaterAmount} ml</Typography>

            <Input placeholder='Enter water in milliliters' type='number' inputProps={{ min: 0 }} onChange={onWaterChange} />
            <CardActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" size="small" onClick={() => addWater()}>Add</Button>
            </CardActions>
        </>
    )
}


export default WaterCounter;