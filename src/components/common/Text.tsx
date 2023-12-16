import { forwardRef } from 'react';
import styled from 'styled-components';

interface TextProps extends React.ComponentPropsWithRef<'p'> {
  color?: string;
  size?: number;
  weight?: number;
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ color, size, weight, children, ...props }, ref) => {
    return (
      <StyledText
        color={color}
        size={size}
        weight={weight}
        ref={ref}
        {...props}
      >
        {children}
      </StyledText>
    );
  }
);

const StyledText = styled.p<TextProps>`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size}px;
  font-weight: ${({ weight }) => weight};
`;

export default Text;
