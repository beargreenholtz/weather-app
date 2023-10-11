import Card from '../Card/Card';
import { ICardsArray } from '../../../interfaces/card';

import classes from './CardContainer.module.scss';

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

export default CardContainer;
