import React, { useState, useEffect } from 'react';
import { ICard } from '../../../interfaces/card';

import WeatherHistory from '../WeatherHistory/WeatherHistory';
import useModal from '../../../utils/useModal';
import Svg from '../../ui/Svg/Svg';
import Modal from '../../ui/Modal/Modal';

import classes from './Card.module.scss';

interface IProps {
  readonly city: ICard;
}

const Card: React.FC<IProps> = (props) => {
  const [timeState, setTimeState] = useState<string>();
  const [isToolTipShowState, setIsIsToolTipShowState] = useState(false);
  const [isShowingModalState, toggleModalState] = useModal();
  const isNight = timeState
    ? +timeState.slice(0, 2) > 23 || +timeState.slice(0, 2) < 8
    : true;

  const handleToolTip = (isActive: boolean) => {
    if (props.city.coordinates.name.length > 7) {
      setIsIsToolTipShowState(() => isActive);
    }
  };

  const temperatureToday = props.city[1];

  const icon =
    temperatureToday > 25
      ? 'sun'
      : temperatureToday > 15
      ? 'sunWithClouds'
      : temperatureToday > 5
      ? 'clouds'
      : 'snowMan';

  const description =
    temperatureToday > 25
      ? 'Hot'
      : temperatureToday > 15
      ? 'Not Very Hot'
      : temperatureToday > 5
      ? 'Clouds and Cold'
      : 'Very Very Cold';

  useEffect(() => {
    const interval = setInterval(() => {
      const dateObject = new Date();
      const options: Record<string, string> = {
        timeZone: props.city[2] as string,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hourCycle: 'h24',
      };
      const formattedDate = dateObject.toLocaleString('en-US', options);
      setTimeState(() => formattedDate);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <Modal isShow={isShowingModalState} onClickCloseButton={toggleModalState}>
        <WeatherHistory city={props.city} />
      </Modal>
      <div
        onClick={toggleModalState}
        style={
          !isNight
            ? {
                backgroundColor: `hsl(240, 100%,${
                  50 - +timeState.slice(0, 2) * 2
                }%)`,
              }
            : { backgroundColor: `black` }
        }
        className={classes['container']}
      >
        {isToolTipShowState && (
          <span className={classes['container__tooltip']}>
            {props.city.coordinates.name}
          </span>
        )}
        <p
          onMouseEnter={() => handleToolTip(true)}
          onMouseLeave={() => handleToolTip(false)}
          className={classes['container__title']}
        >
          {props.city.coordinates.name}
        </p>

        <span className={classes['container__celsius']}>
          {props.city.cityData.temperature[0] + '°C'}
        </span>
        <Svg name={icon} className={classes['container__svg']} />
        <p className={classes['container__description']}>{description}</p>
        <p className={classes['container__time']}>{timeState}</p>
      </div>
    </>
  );
};

const MemoizedCard = React.memo(Card);

export default MemoizedCard;
