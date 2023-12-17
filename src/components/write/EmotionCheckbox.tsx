import styled, { css } from 'styled-components';

interface EmotionCheckboxProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export default function EmotionCheckbox({
  value,
  label,
  checked,
  onChange,
}: EmotionCheckboxProps) {
  return (
    <Container checked={checked} onClick={() => onChange(value)}>
      <EmotionIcon />
      <Label>{label}</Label>
    </Container>
  );
}

const Container = styled.div<{ checked: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 60px;
  cursor: pointer;

  background: #f2f2f2;
  box-shadow: 0px 0px 4px 0px rgba(102, 102, 102, 0.1);
  border-radius: 8px;

  ${({ checked }) =>
    checked &&
    css`
      border: 1px solid rgba(51, 51, 51, 0.6);
      background: linear-gradient(
          0deg,
          rgba(204, 204, 204, 0.2) 0%,
          rgba(204, 204, 204, 0.2) 100%
        ),
        #f2f2f2;
      box-shadow: 0px 0px 4px 0px rgba(102, 102, 102, 0.3);
    `}
`;

const EmotionIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

const Label = styled.p`
  font-size: 11px;
  font-weight: 500;
  color: #333333;
`;
