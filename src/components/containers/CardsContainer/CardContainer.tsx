import React from 'react';

import Card from '../Card/Card';
import { TCard } from '../../../types/card';

import classes from './CardContainer.module.scss';

interface TProps {
  readonly cards: TCard[];
}

const CardContainer = (props: TProps) => {
  return (
    <button className={classes['container']}>
      {props.cards.map((value, index) => {
        return <Card city={value} key={index} />;
      })}
    </button>
  );
};

const MemoizedCardContainer = React.memo(CardContainer);

export default MemoizedCardContainer;
