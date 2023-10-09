import { useState, useEffect } from 'react';

import Svg from '../../ui/Svg/Svg';
import classes from './Card.module.scss';
import Modal from '../../ui/Modal/Modal';
import useModal from '../../../utils/useModal';
import WeatherHistory from '../WeatherHistory/WeatherHistory';

const Card = (props) => {
  const [time, setTime] = useState<string>();
  const [isToolTipShow, setIsIsToolTipShow] = useState(false);
  const [isShowingModal, toggleModal] = useModal();
  const isNight = time ? +time.slice(0, 2) > 23 || +time.slice(0, 2) < 8 : true;

  const toolTipHandler = (isActive: boolean) => {
    if (props.city[0].name.length > 7) {
      setIsIsToolTipShow(() => isActive);
    }
  };

  const temperature = props.city[1];
  const icon =
    temperature > 25
      ? 'sun'
      : temperature > 15
      ? 'sunWithClouds'
      : temperature > 5
      ? 'clouds'
      : 'snowMan';

  const description =
    temperature > 25
      ? 'Hot'
      : temperature > 15
      ? 'Not Very Hot'
      : temperature > 5
      ? 'Clouds and Cold'
      : 'Very Very Cold';

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();
      const options: Record<string, string> = {
        timeZone: props.city[2] as string,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hourCycle: 'h24',
      };
      const formattedDate = dateObject.toLocaleString('en-US', options);
      setTime(() => formattedDate);
    }, 1000);
  });

  return (
    <>
      <Modal show={isShowingModal} onCloseButtonClick={toggleModal}>
        <WeatherHistory city={props.city} />
      </Modal>
      <div
        onClick={toggleModal}
        style={
          !isNight
            ? {
                backgroundColor: `hsl(240, 100%,${
                  50 - +time.slice(0, 2) * 2
                }%)`,
              }
            : { backgroundColor: `black` }
        }
        className={classes['container']}
      >
        {isToolTipShow && (
          <span className={classes['container__tooltip']}>
            {props.city[0].name}
          </span>
        )}
        <p
          onMouseEnter={() => toolTipHandler(true)}
          onMouseLeave={() => toolTipHandler(false)}
          className={classes['container__title']}
        >
          {props.city[0].name}
        </p>

        <span className={classes['container__celsius']}>
          {props.city[1] + '°C'}
        </span>
        <Svg name={icon} className={classes['container__svg']} />
        <p className={classes['container__description']}>{description}</p>
        <p className={classes['container__time']}>{time}</p>
      </div>
    </>
  );
};

export default Card;
