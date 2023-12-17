import BookmarkListItem from 'components/bookmark/BookmarkListItem';
import BookmarkEmptyState from 'components/bookmark/BookmarkEmptyState';
import { Emotion } from 'constants/enum';
import styled from 'styled-components';
import ServicePreparingFallback from 'components/common/ServicePrerparingFallback';

const DUMMY_BOOKMARK_LIST = Array(2)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    summary: '이 헌법 중 공무원의 임기 또는 중임제한',
    emotions: Object.values(Emotion),
  }));

export default function Bookmark() {
  const bookmarkList = DUMMY_BOOKMARK_LIST;

  return (
    <ServicePreparingFallback />
    // <Container>
    //   <Title>북마크</Title>
    //   {bookmarkList.length === 0 && <BookmarkEmptyState />}
    //   {bookmarkList.length > 0 && (
    //     <BookmarkList>
    //       {bookmarkList.map((bookmark) => (
    //         <BookmarkListItem
    //           key={bookmark.id}
    //           summary={bookmark.summary}
    //           emotions={bookmark.emotions}
    //         />
    //       ))}
    //     </BookmarkList>
    //   )}
    // </Container>
  );
}

const Title = styled.h1`
  margin-top: 12px;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f2f2f2;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
`;

const BookmarkList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;
