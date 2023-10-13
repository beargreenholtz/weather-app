import React, { useState } from 'react';
import axios from 'axios';

import { ICard } from '../../../interfaces/card';
import { getPastDate } from '../../../utils/getPastDate';
import CardContainer from '../CardsContainer/CardContainer';
import CityForm from '../CityForm/CityForm';

const Main = () => {
  const [cardsState, setCardsState] = useState<ICard[]>([]);

  const getCoordinates = async (city) => {
    const response = await axios
      .get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
      )
      .then((response) => response.data.results[0]);

    return response;
  };

  const getCityData = async (coordinates) => {
    const endDate = getPastDate(10);
    const startDate = getPastDate(40);

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

  const addCityDataToCards = async (city: string) => {
    const coordinates = await getCoordinates(city);

    const citydata = await getCityData(coordinates);

    if (!citydata) {
      return;
    }

    setCardsState((prevCards) => [
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
      <CityForm addCity={addCityDataToCards} />
      <CardContainer cards={cardsState} />
    </>
  );
};

const MemoizedMain = React.memo(Main);

export default MemoizedMain;
