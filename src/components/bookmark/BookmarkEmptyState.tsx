import { BookmarkPlaceholder } from 'assets/bookmark';
import styled from 'styled-components';

export default function BookmarkEmptyState() {
  return (
    <Container>
      <BookmarkPlaceholder />
      <Label>이번 달에 북마크한 일기가 없어요!</Label>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  height: 100%;
`;

const Label = styled.div`
  font-size: 14px;
  color: #686868;
`;
