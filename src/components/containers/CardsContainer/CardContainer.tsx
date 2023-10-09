import Card from '../Card/Card';
import classes from './CardContainer.module.scss';

const CardContainer = (props) => {
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
