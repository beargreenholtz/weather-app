import React, { useState } from 'react';

import { ICard } from '@/interfaces/card';
import { monthAverageCelcius } from '../../../utils/monthCaculateDegree';

import classes from './WeatherHistory.module.scss';

interface IProps {
  readonly city: ICard;
}

const WeatherHistory: React.FC<IProps> = (props) => {
  const [selectedTimeState, setSelectedTimeState] = useState('');
  const halfMonthDegreeArray = props.city.cityData.dates.slice(0, 14);
  const halfMonthDatesArray = props.city.cityData.dates.slice(0, 14);
  const monthDegreesArray = props.city.cityData.temperature;

  const optionSelect = ['daily', 'twoweeks', 'monthly'] as const;

  return (
    <div>
      <div>Weather History Data for {props.city.coordinates.name}:</div>
      <select onChange={(e) => setSelectedTimeState(e.target.value)}>
        {optionSelect.map((value) => (
          <option key={value} label={value} value={value} />
        ))}
      </select>
      {selectedTimeState === optionSelect[0] && (
        <p>Today - {props.city.cityData.dates[0]}</p>
      )}

      {selectedTimeState === optionSelect[1] && (
        <div>
          <h2>Last 2 weeks</h2>
          <div className={classes['list']}>
            <div className={classes['list__desc']}>
              {halfMonthDatesArray &&
                halfMonthDatesArray.map((date, index) => (
                  <p key={index}>{date}</p>
                ))}
            </div>
            <div>
              {halfMonthDegreeArray &&
                halfMonthDegreeArray.map((degree, index) => (
                  <p key={index}>{degree}</p>
                ))}
            </div>
          </div>
        </div>
      )}
      {selectedTimeState === optionSelect[2] && (
        <p>The monthly average is - {monthAverageCelcius(monthDegreesArray)}</p>
      )}
    </div>
  );
};

const MemoizedWeatherHistory = React.memo(WeatherHistory);

export default MemoizedWeatherHistory;
