import { render, screen, fireEvent } from '@testing-library/react';
import WaterCounter from '../WaterCounter';


it('renders WaterCounter without crashing', () => {
    render(<WaterCounter />);
});
describe('Input testing', () => {
    it('render the input', () => {
        const { getByTestId } = render(<WaterCounter />)
        const input = getByTestId('waterInput');
        expect(input).toBeTruthy()
    })

    it('should render input element', () => {
        render(<WaterCounter />)
        const inputElement = screen.getByPlaceholderText(/Enter water in milliliters/i)
        expect(inputElement).toBeInTheDocument()
    })

    it('should be able to type in input', () => {
        render(<WaterCounter />)
        const waterAmount = 500;
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Enter water in milliliters/i)
        fireEvent.change(inputElement, { target: { value: waterAmount } })
        expect(+(inputElement.value)).toBe(waterAmount)
    })
})

describe("localStorage testing", () => {
    it('should the current date be the same as localStorage date', () => {
        const CURRENTDAY = new Date().toLocaleDateString('lt-LT');
        render(<WaterCounter />);
        expect(localStorage.getItem('Date')).toBe(CURRENTDAY);
    });

    it('sets water amount based on localStorage', () => {
        const WATER_AMOUNT = 3000;
        localStorage.setItem('drankWaterAmount', `${WATER_AMOUNT}`)
        localStorage.setItem('Date', new Date().toLocaleDateString('lt-LT'))
        render(<WaterCounter />);
        expect(screen.getByText(`${WATER_AMOUNT} ml`)).toBeInTheDocument();
    });

});

describe('error message testing', () => {

    it('should the error message render', () => {
        render(<WaterCounter />)
        const waterAmount = 50000000;
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Enter water in milliliters/i)
        const buttonElement = screen.getByRole("button", { name: /Add/! })
        fireEvent.change(inputElement, { target: { value: waterAmount } })
        fireEvent.click(buttonElement)
        const alart = screen.getByRole("alert");
        expect(alart).toBeInTheDocument();
    })

    it('should not the error message render', () => {
        render(<WaterCounter />)
        const waterAmount = 200;
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Enter water in milliliters/i)
        const buttonElement = screen.getByRole("button", { name: /Add/! })
        fireEvent.change(inputElement, { target: { value: waterAmount } })
        fireEvent.click(buttonElement)
        const alart = screen.queryByRole("alert");
        expect(alart).not.toBeInTheDocument();
    })
})

describe('button testing', () => {
    it('should the button render', () => {
        render(<WaterCounter />)
        const buttonElement = screen.getByRole("button", { name: /Add/! })
        expect(buttonElement).toBeInTheDocument();
    })
    it('should the button change the drankWaterAmount value in localStorage  ', () => {
        render(<WaterCounter />)
        const localstorageWaterAmount = localStorage.getItem('drankWaterAmount');

        const waterAmount = 200;
        const result = waterAmount + Number(localstorageWaterAmount);
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Enter water in milliliters/i)
        const buttonElement = screen.getByRole("button", { name: /Add/! })
        fireEvent.change(inputElement, { target: { value: waterAmount } })
        fireEvent.click(buttonElement)
        expect(result).toBe(Number(localStorage.getItem('drankWaterAmount')));
    })

    it('should the button not change the drankWaterAmount value in localStorage  ', () => {
        render(<WaterCounter />)
        const localstorageWaterAmount = localStorage.getItem('drankWaterAmount');
        const waterAmount = 200000;
        const result = waterAmount + Number(localstorageWaterAmount);
        const inputElement: HTMLInputElement = screen.getByPlaceholderText(/Enter water in milliliters/i)
        const buttonElement = screen.getByRole("button", { name: /Add/! })
        fireEvent.change(inputElement, { target: { value: waterAmount } })
        fireEvent.click(buttonElement)

        expect(result).not.toBe(Number(localStorage.getItem('drankWaterAmount')));
    })

})