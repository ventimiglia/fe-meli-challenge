// Modal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal component', () => {
  const mockOnClose = jest.fn();

  const modalContent = <div>Modal Content</div>;

  const setup = (isOpen: boolean) =>
    render(
      <Modal isOpen={isOpen} onClose={mockOnClose}>
        {modalContent}
      </Modal>
    );

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should not render when isOpen is false', () => {
    setup(false);
    const modalElement = screen.queryByText('Modal Content');
    expect(modalElement).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    setup(true);
    const modalElement = screen.getByText('Modal Content');
    expect(modalElement).toBeInTheDocument();
  });

  it('should call onClose when clicking the close button', () => {
    setup(true);
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking outside the modal content (overlay click)', () => {
    setup(true);
    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when pressing the Escape key', () => {
    setup(true);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when pressing other keys', () => {
    setup(true);
    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
