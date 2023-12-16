import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckMarkIcon } from 'assets/common';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface CheckboxProps
  extends Omit<React.ComponentPropsWithRef<'button'>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked, onChange, ...props }, ref) => {
    return (
      <StyledRadixCheckbox
        checked={checked}
        onCheckedChange={onChange}
        ref={ref}
        {...props}
      >
        <RadixCheckbox.Indicator>
          <StyledCheckMarkIcon />
        </RadixCheckbox.Indicator>
      </StyledRadixCheckbox>
    );
  }
);

const StyledRadixCheckbox = styled(RadixCheckbox.Root)`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
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

const StyledCheckMarkIcon = styled(CheckMarkIcon)`
  width: 10px;
  height: 10px;
  color: white;
`;

export default Checkbox;
