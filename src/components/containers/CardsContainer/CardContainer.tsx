import Card from '../Card/Card';
import { ICardsArray } from '../../../interfaces/card';

import classes from './CardContainer.module.scss';
import React from 'react';

interface IProps {
  readonly cards: ICardsArray[];
}

const CardContainer: React.FC<IProps> = (props) => {
  return (
    <button className={classes['container']}>
      {props.cards.map((value, index) => {
        return (
          <div>
            <Card city={value} key={index} />;
          </div>
        );
      })}
    </button>
  );
};

const MemoizedCardContainer = React.memo(CardContainer);

export default MemoizedCardContainer;
