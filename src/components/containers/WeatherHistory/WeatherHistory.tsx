import React, { useState } from 'react';

import { ICard } from '@/interfaces/card';
import { monthAverageCelcius } from '../../../utils/monthCaculateDegree';

import classes from './WeatherHistory.module.scss';

interface IProps {
  readonly city: ICard;
}

const WeatherHistory: React.FC<IProps> = (props) => {
  const [selectedTimeState, setSelectedTimeState] = useState('monthly');
  const halfMonthDegreeArray = props.city.cityData.dates.slice(0, 14);
  const halfMonthDatesArray = props.city.cityData.dates.slice(0, 14);
  const monthDegreesArray = props.city.cityData.temperature;

  return (
    <div>
      <div>Weather History Data for {props.city.coordinates.name}:</div>
      <select onChange={(e) => setSelectedTimeState(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="daily">Daily</option>
        <option value="twoweeks">Two Weeks</option>
      </select>
      {selectedTimeState === 'daily' && (
        <p>Today - {props.city.cityData.dates[0]}</p>
      )}
      {selectedTimeState === 'monthly' && (
        <p>The monthly average is - {monthAverageCelcius(monthDegreesArray)}</p>
      )}
      {selectedTimeState === 'twoweeks' && (
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
    </div>
  );
};

const MemoizedWeatherHistory = React.memo(WeatherHistory);

export default MemoizedWeatherHistory;
