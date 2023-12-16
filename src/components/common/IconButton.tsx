import { forwardRef } from 'react';
import styled from 'styled-components';

interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledIconButton ref={ref} {...props}>
        {children}
      </StyledIconButton>
    );
  }
);

const StyledIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
`;

export default IconButton;
