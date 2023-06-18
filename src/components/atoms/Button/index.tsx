import { ButtonHTMLAttributes } from 'react';
import './button.css';

type TProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<TProps> = (props) => {
  return <button {...props} />;
};

export default Button;
