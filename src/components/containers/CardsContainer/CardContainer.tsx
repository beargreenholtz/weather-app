import React from 'react';

import Card from '../Card/Card';
import { ICard } from '../../../interfaces/card';

import classes from './CardContainer.module.scss';

interface IProps {
  readonly cards: ICard[];
}

const CardContainer: React.FC<IProps> = (props) => {
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
