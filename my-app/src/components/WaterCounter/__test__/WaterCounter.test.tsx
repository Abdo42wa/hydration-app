import { render, screen, fireEvent } from '@testing-library/react';
import WaterCounter from '../WaterCounter';


describe('WaterCounter testing', () => {
    it('renders WaterCounter without crashing', () => {
        render(<WaterCounter />);
    });
    beforeAll = () => {
        localStorage.clear();
    }
    describe('Input testing', () => {

        it('should render input element', () => {
            render(<WaterCounter />)
            const inputElement = screen.getByPlaceholderText('Enter water in milliliters')
            expect(inputElement).toBeInTheDocument()
        })

        it('should be able to type in input', () => {
            render(<WaterCounter />)
            const waterAmount = 500;
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('Enter water in milliliters')
            fireEvent.change(inputElement, { target: { value: waterAmount } })
            expect(+(inputElement.value)).toBe(waterAmount)
        })
    })

    describe("localStorage testing", () => {
        it('should the current date be the same as localStorage date', () => {
            const currentDate = new Date().toLocaleDateString('lt-LT');
            render(<WaterCounter />);
            expect(localStorage.getItem('Date')).toBe(currentDate);
        });

        it('sets water amount based on localStorage', () => {
            const WATER_AMOUNT = 3_000;
            localStorage.setItem('drankWaterAmount', `${WATER_AMOUNT}`)
            localStorage.setItem('Date', new Date().toLocaleDateString('lt-LT'))
            render(<WaterCounter />);
            expect(screen.getByText(`${WATER_AMOUNT} ml`)).toBeInTheDocument();
        });

    });

    describe('error message testing', () => {

        it('should render the error message ', () => {
            render(<WaterCounter />)
            const waterAmount = 50_000_000;
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('Enter water in milliliters')
            const buttonElement = screen.getByRole("button", { name: 'Add' })
            fireEvent.change(inputElement, { target: { value: waterAmount } })
            fireEvent.click(buttonElement)
            const alert = screen.getByRole("alert");
            expect(alert).toBeInTheDocument();
        })

        it('should not render the error message ', () => {
            render(<WaterCounter />)
            const waterAmount = 200;
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('Enter water in milliliters')
            const buttonElement = screen.getByRole("button", { name: 'Add' })
            fireEvent.change(inputElement, { target: { value: waterAmount } })
            fireEvent.click(buttonElement)
            const alert = screen.queryByRole("alert");
            expect(alert).not.toBeInTheDocument();
        })
    })

    describe('button testing', () => {
        it('should render the button ', () => {
            render(<WaterCounter />)
            const buttonElement = screen.getByRole("button", { name: 'Add' })
            expect(buttonElement).toBeInTheDocument();
        })
        it('should the button change the drankWaterAmount value in localStorage  ', () => {
            render(<WaterCounter />)
            const localstorageWaterAmount = localStorage.getItem('drankWaterAmount');

            const waterAmount = 200;
            const result = waterAmount + Number(localstorageWaterAmount);
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('Enter water in milliliters')
            const buttonElement = screen.getByRole("button", { name: 'Add' })
            fireEvent.change(inputElement, { target: { value: waterAmount } })
            fireEvent.click(buttonElement)
            expect(result).toBe(Number(localStorage.getItem('drankWaterAmount')));
        })

        it('should the button not change the drankWaterAmount value in localStorage because of the water limit', () => {
            render(<WaterCounter />)
            const localstorageWaterAmount = localStorage.getItem('drankWaterAmount');
            const waterAmount = 200_000;
            const result = waterAmount + Number(localstorageWaterAmount);
            const inputElement: HTMLInputElement = screen.getByPlaceholderText('Enter water in milliliters')
            const buttonElement = screen.getByRole("button", { name: 'Add' })
            fireEvent.change(inputElement, { target: { value: waterAmount } })
            fireEvent.click(buttonElement)

            expect(result).not.toBe(Number(localStorage.getItem('drankWaterAmount')));
        })

    })
})