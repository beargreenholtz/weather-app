import { useEffect, useRef, useState } from 'react';
import classes from './CityForm.module.scss';
import places from '../../../utils/places';
import useKeyPress from '../../../utils/useKeyPress';

const CityForm = (props) => {
  const paragraphRef = useRef(null);

  const [inputState, setInputState] = useState('');
  const [autoCompleteVisibleState, setAutoCompleteVisibleState] =
    useState(false);
  const [selected, setSelected] = useState(undefined);
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [autoCompletePlaceState, setAutoCompletePlaceState] = useState(
    places.sort()
  );

  const downPress = useKeyPress('ArrowDown');
  const upPress = useKeyPress('ArrowUp');
  const enterPress = useKeyPress('Enter');

  const addCardHandler = (e) => {
    e.preventDefault();
    props.addCity(inputState);
    setInputState(() => '');
  };

  const textHandler = (value) => {
    setInputState(() => value);
    const filteredAndSortedPlaces = places
      .filter((place) => place.toLowerCase().startsWith(value.toLowerCase()))
      .sort();
    setAutoCompletePlaceState(() => filteredAndSortedPlaces);
  };

  useEffect(() => {
    if (
      autoCompletePlaceState.length &&
      downPress &&
      autoCompleteVisibleState
    ) {
      setCursor((prevState) =>
        prevState < autoCompletePlaceState.length - 1
          ? prevState + 1
          : prevState
      );
      setInputState(() => autoCompletePlaceState[cursor + 1]);
      setSelected(autoCompletePlaceState[cursor]);
      paragraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [downPress]);
  useEffect(() => {
    if (autoCompletePlaceState.length && upPress && autoCompleteVisibleState) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
      setInputState(() => autoCompletePlaceState[cursor - 1]);
      setSelected(autoCompletePlaceState[cursor]);
      paragraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [upPress]);
  useEffect(() => {
    if (
      autoCompletePlaceState.length &&
      enterPress &&
      autoCompleteVisibleState
    ) {
      setSelected(autoCompletePlaceState[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (autoCompletePlaceState.length && hovered) {
      setCursor(autoCompletePlaceState.indexOf(hovered));
    }
  }, [hovered]);

  console.log(selected);
  return (
    <>
      <form
        onSubmit={(e) => addCardHandler(e)}
        className={classes['container']}
      >
        <input
          type="text"
          value={inputState}
          className={classes['container__input']}
          placeholder="Enter Your City"
          onChange={(e) => textHandler(e.target.value)}
          onFocus={() => setAutoCompleteVisibleState(true)}
          onBlur={() => {
            setTimeout(() => {
              setAutoCompleteVisibleState(false);
            }, 100);
            if (!inputState) setAutoCompletePlaceState(places);
          }}
        />
        <button type={'submit'} className={classes['container__button']}>
          Add City
        </button>
        <div className={classes['container__autoCompleteContainer']}>
          {autoCompleteVisibleState &&
            autoCompletePlaceState.map((place, index) => (
              <li
                key={index}
                className={`${
                  classes[cursor === index ? 'container__place' : '']
                } 
                 `}
                onClick={() => setInputState(() => place)}
                onMouseEnter={() => setHovered(place)}
                onMouseLeave={() => setHovered(undefined)}
                ref={cursor === index ? paragraphRef : null}
              >
                {place}
              </li>
            ))}
        </div>
      </form>
    </>
  );
};

export default CityForm;
