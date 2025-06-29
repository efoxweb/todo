import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/ui/Button';

describe('Button', () => {
    test('renders with default style', () => {
        render(<Button>Submit</Button>);
        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toHaveClass('bg-orange-500');
        expect(button).toHaveClass('text-white');
        expect(button).not.toHaveClass('border-orange-300');
        expect(button).not.toHaveClass('text-gray');
    });

    test('renders with outlined style', () => {
        render(<Button btnStyle="outlined">Submit</Button>);
        const button = screen.getByRole('button', { name: /submit/i });
        expect(button).toHaveClass('border-orange-300');
        expect(button).toHaveClass('text-gray');
        expect(button).not.toHaveClass('bg-orange-500');
        expect(button).not.toHaveClass('text-white');
    });

    test('applies disabled styles and disables button', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByRole('button', { name: /disabled/i });
        expect(button).toBeDisabled();
        expect(button).toHaveClass('cursor-not-allowed');
        expect(button).toHaveClass('opacity-50');
    });

    test('calls onClick when clicked and not disabled', () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Submit</Button>);
        const button = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('does not call onClick when disabled', () => {
        const onClick = jest.fn();
        render(
            <Button disabled onClick={onClick}>
                Disabled
            </Button>,
        );
        const button = screen.getByRole('button', { name: /disabled/i });
        fireEvent.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });
});
