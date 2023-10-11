import { useState } from 'react';
import axios from 'axios';

import { ICardsArray } from '../../../interfaces/card';
import CardContainer from '../CardsContainer/CardContainer';
import CityForm from '../CityForm/CityForm';

import './Main.scss';

const Main = () => {
  const [cards, setCards] = useState<ICardsArray[]>([]);

  const fetchMaxDate = (days: number) => {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() - days);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getCoordinates = async (city) => {
    const response = await axios
      .get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
      )
      .then((response) => response.data.results[0]);

    return response;
  };

  const getCityData = async (coordinates) => {
    const endDate = fetchMaxDate(10);
    const startDate = fetchMaxDate(40);

    const response = await axios
      .get(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_mean&timezone=auto`
      )
      .then((response) => response)
      .catch((error) => {
        console.error(error);
      });

    return response;
  };

  const addCity = async (city: string) => {
    const coordinates = await getCoordinates(city);

    const citydata = await getCityData(coordinates);

    if (!citydata) {
      return;
    }

    setCards((prevCards) => [
      ...prevCards,
      {
        coordinates,
        cityData: {
          dates: citydata.data.daily.time,
          temperature: citydata.data.daily.temperature_2m_mean,
        },
      },
    ]);
  };

  return (
    <>
      <CityForm addCity={addCity} />
      <CardContainer cards={cards} />
    </>
  );
};

export default Main;
