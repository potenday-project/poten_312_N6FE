import styled from 'styled-components';

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export default function SubmitButton({ ...props }: SubmitButtonProps) {
  return <Button {...props} />;
}

const Button = styled.button<SubmitButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  border-radius: 8px;
  border: none;
  outline: none;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ disabled }) => (disabled ? '#999999' : '#333333')};
`;
