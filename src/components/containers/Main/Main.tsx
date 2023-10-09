// import Card from '../Card/Card';
import { useState } from 'react';
import CardContainer from '../CardsContainer/CardContainer';
import CityForm from '../CityForm/CityForm';
import axios from 'axios';
import './Main.scss';

const Main = () => {
  const [cards, setCards] = useState([]);

  const addCity = async (city) => {
    const place = await axios
      .get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
      )
      .then((response) => response.data.results[0]);

    const celsius = await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=temperature_2m_max&timezone=GMT`
      )
      .then((response) => response.data.daily.temperature_2m_max[0]);

    !cards.includes(city) &&
      setCards((prevCards) => [...prevCards, [place, celsius, place.timezone]]);
  };
  console.log(cards);
  return (
    <>
      <CityForm addCity={addCity} />
      <CardContainer cards={cards} />
    </>
  );
};

export default Main;
