import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface CheckboxProps
  extends Omit<React.ComponentPropsWithRef<'button'>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

// TODO: 체크 아이콘 추가
const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, onChange, ...props }, ref) => {
    return (
      <StyledRadixCheckbox
        checked={checked}
        onCheckedChange={onChange}
        ref={ref}
        {...props}
      >
        <RadixCheckbox.Indicator></RadixCheckbox.Indicator>
      </StyledRadixCheckbox>
    );
  }
);

const StyledRadixCheckbox = styled(RadixCheckbox.Root)`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  border: 2px solid #666666;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;

  ${({ checked }) =>
    checked &&
    css`
      background-color: #666666;
    `}
`;

export default Checkbox;
