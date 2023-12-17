import { forwardRef } from 'react';
import styled from 'styled-components';

interface FlexProps extends React.ComponentPropsWithRef<'div'> {
  justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly';
  items?: 'center' | 'start' | 'end';
  flex?: 'row' | 'col';
  wrap?: 'wrap' | 'nowrap';
  gap?: number;
  mt?: number;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    { justify, items, flex = 'row', wrap = 'nowrap', gap, mt, ...props },
    ref
  ) => {
    return (
      <FlexContainer
        ref={ref}
        justify={justify}
        items={items}
        flex={flex}
        wrap={wrap}
        gap={gap}
        mt={mt}
        {...props}
      />
    );
  }
);

const styles = {
  justify: {
    center: 'center',
    start: 'flex-start',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  },
  items: {
    center: 'center',
    start: 'flex-start',
    end: 'flex-end',
  },
  flex: {
    row: 'row',
    col: 'column',
  },
  wrap: {
    wrap: 'wrap',
    nowrap: 'nowrap',
  },
};

const FlexContainer = styled.div<FlexProps>`
  display: flex;
  justify-content: ${({ justify }) => justify && styles.justify[justify]};
  align-items: ${({ items }) => items && styles.items[items]};
  flex-direction: ${({ flex }) => flex && styles.flex[flex]};
  flex-wrap: ${({ wrap }) => wrap && 'wrap'};
  gap: ${({ gap }) => gap && `${gap}px`};
  margin-top: ${({ mt }) => mt && `${mt}px`};
`;

export default Flex;
