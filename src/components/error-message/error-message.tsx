import { ReactNode } from 'react';
import './error-message.css';

interface ErrorMessageProps {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <div className="error-message">
    {children}
  </div>
);

export default ErrorMessage;
