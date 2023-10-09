import { useEffect, useState } from 'react';
import axios from 'axios';
import calsses from './WeatherHistory.module.scss';

const WeatherHistory = (props) => {
  const [weatherHistoryState, setWeatherHistoryState] = useState([[], []]);
  const [pickedDateState, setPickedDateState] = useState({
    startDate: '',
    endDate: '',
  });
  const [isWeatherError, setIsWeatherError] = useState(false);

  const fetchMaxDate = (date) => {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() - date);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const date = fetchMaxDate(10);
  const initialEndDate = fetchMaxDate(17);

  const fetchWeatherHistory = async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${props.city[0].latitude}&longitude=${props.city[0].longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean&timezone=auto`
      );
      setWeatherHistoryState([
        [...response.data.daily.time],
        [...response.data.daily.temperature_2m_mean],
      ]);
      console.log(date);
    } catch (error) {
      console.error('Error fetching weather history:', error);
    }
  };

  const onInputChange = (e) => {
    setPickedDateState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const compareDates = (dateStr1, dateStr2) => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    return date1 < date2 ? 1 : date1 > date2 ? -1 : 0;
  };

  useEffect(() => {
    const dateComparison = compareDates(
      pickedDateState.startDate,
      pickedDateState.endDate
    );

    setIsWeatherError(() => (dateComparison === 1 ? true : false));

    pickedDateState.startDate === '' && pickedDateState.endDate === ''
      ? fetchWeatherHistory(initialEndDate, date)
      : fetchWeatherHistory(pickedDateState.startDate, pickedDateState.endDate);
  }, [pickedDateState]);

  return (
    <>
      <div>Weather History Data:</div>
      <div className={calsses['container']}>
        <div className={calsses['container__description']}>
          {weatherHistoryState ? (
            weatherHistoryState[0].map((time, index) => (
              <div key={index}>{time}</div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className={calsses['container__description']}>
          {weatherHistoryState
            ? weatherHistoryState[1].map((temp, index) => (
                <div key={index}>{temp}</div>
              ))
            : null}
        </div>
        <label>Start Date</label>
        <input
          name="startDate"
          type="date"
          max={fetchMaxDate(10)}
          onChange={(e) => onInputChange(e)}
        ></input>
        <label>End Date</label>
        <input
          name="endDate"
          type="date"
          max={date}
          onChange={(e) => onInputChange(e)}
        ></input>
        {!isWeatherError && (
          <p className={calsses['container__errorDate']}>
            please pick valid date range
          </p>
        )}
      </div>
    </>
  );
};

export default WeatherHistory;
