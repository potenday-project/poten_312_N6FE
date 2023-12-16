import { forwardRef } from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  startIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, startIcon, ...props }, ref) => (
    <StyledButton ref={ref} {...props}>
      {startIcon && <IconContainer>{startIcon}</IconContainer>}
      {children}
    </StyledButton>
  )
);

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    font-weight: 400;
    background-color: #cccccc;
    cursor: default;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

export default Button;
