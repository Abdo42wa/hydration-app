import React, { useEffect, useState } from 'react'
import { Typography, Input, Alert, Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
const MAX_WATER_AMOUNT = 4000;
const WaterCounter = () => {
    const [waterAmount, setWaterAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [waterInput, setWaterInput] = useState(0);
    const [open, setOpen] = useState(false);

    const addWater = () => {
        const result = waterAmount + waterInput;
        if (result <= MAX_WATER_AMOUNT) {
            localStorage.setItem('waterAmount', `${result}`);
            localStorage.setItem('Date', new Date().toLocaleDateString('lt-LT'));
            setWaterAmount(result);
            return;
        }
        setMessage("Oops you have reached your limit ");
        setOpen(true);
    }

    const onWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaterInput(Number(e.target.value));
    }

    const setCurrentDay = () => {

        const currentDate = new Date().toLocaleDateString('lt-LT');
        if (currentDate !== localStorage.getItem('Date')) {
            localStorage.setItem('waterAmount', `${0}`)
        }
    }
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setWaterAmount(Number(localStorage.getItem('waterAmount')));
        setCurrentDay();
    }, []);



    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="error">{message}</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>close</Button>
                </DialogActions>
            </Dialog>


            <Typography>Drink water( 2L - {MAX_WATER_AMOUNT / 1000})</Typography>
            <Typography fontWeight={900} component='h2' >{waterAmount} ml</Typography>
            <Typography>Enter water in milliliters</Typography>
            <Input type='number' inputProps={{ min: 0 }} onChange={onWaterChange} />
            <Button variant="outlined" color="success" size="small" onClick={() => addWater()}>Add</Button>
        </>
    )
}


export default WaterCounter;