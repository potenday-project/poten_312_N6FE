import styled from 'styled-components';

export default function ServicePreparingFallback() {
  return <Container>준비중입니다.</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
