import React, { useEffect, useState } from 'react'
import { Typography, Input, Alert, Button, Dialog, DialogContent, DialogContentText, DialogActions, CardActions, InputLabel, Select, MenuItem, SelectChangeEvent, FormControl } from '@mui/material';
import drinkList from './Data/drinks';
import drinkInterface from './Interfaces/Drink'


const MAX_WATER_AMOUNT = 4000;
const WaterCounter = () => {
    const [drankWaterAmount, setDrankWaterAmount] = useState(Number(localStorage.getItem('drankWaterAmount')));
    const [message, setMessage] = useState("");
    const [waterInput, setWaterInput] = useState(0);
    const [drink, setDrank] = useState('');

    const addWater = () => {
        const result = drankWaterAmount + waterInput;
        if (result <= MAX_WATER_AMOUNT) {
            if (drink === '') {
                setMessage("pleas select one drank from the list");
            }
            setDrankWaterAmount(result * Number(drink) / 100);
            return;
        }
        setMessage("Oops you have reached your limit ");

    }


    const onWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWaterInput(Number(e.target.value));
    }
    const handleChange = (event: SelectChangeEvent) => {
        setDrank(event.target.value);
    };

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
                        <Alert severity="error">{message}</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>close</Button>
                </DialogActions>
            </Dialog>

            <Typography color='white' fontSize='27px'>Drink water (2L - {MAX_WATER_AMOUNT / 1000}L)</Typography>
            <Typography marginBottom={2} fontWeight={900}>Drink water amount: {drankWaterAmount} ml</Typography>

            <FormControl>
                <InputLabel>Select drink</InputLabel>
                <Select
                    sx={{ width: '160px', height: '40px' }}
                    value={drink}
                    onChange={handleChange}
                    data-testid="drinks"
                >
                    {drinkList.map((drinks) => (
                        <MenuItem key={drinks.index} value={drinks.value}>{drinks.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />

            <Input placeholder='Enter water in milliliters' sx={{ width: '190px' }} type='number' inputProps={{ min: 0 }} onChange={onWaterChange} />


            <CardActions sx={{ justifyContent: "center", marginTop: '20px' }}>
                <Button variant="contained" size="small" onClick={addWater}>Add</Button>
            </CardActions>
        </>
    )
}


export default WaterCounter;