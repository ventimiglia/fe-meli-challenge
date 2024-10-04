import { useEffect, useCallback, ReactNode, FC, MouseEvent } from 'react';
import { X } from 'lucide-react';

import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleEscapePress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapePress);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapePress);
    };
  }, [isOpen, handleEscapePress]);

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal' onClick={handleOverlayClick} role="dialog">
      <div className='modal__content'>
        {children}
        <button className='modal__close-button' onClick={onClose}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default Modal;
