import React, { useRef, useState } from 'react';

import places from '../../../utils/places';

import classes from './CityForm.module.scss';

interface IProps {
  readonly addCity: (string) => void;
}

const CityForm: React.FC<IProps> = (props) => {
  const paragraphRef = useRef(null);

  const [inputState, setInputState] = useState('');
  const [autoCompleteVisibleState, setAutoCompleteVisibleState] =
    useState(false);
  const [selectedState, setSelectedState] = useState<number>(0);
  const [autoCompletePlaceState, setAutoCompletePlaceState] =
    useState<string[]>(places);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (e.relatedTarget === null) {
      setAutoCompleteVisibleState(false);
    }
  };

  const handleSubmiteAddCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addCity(inputState);
    setInputState(() => '');
  };

  const updateAutocmopletePlaces = (value) => {
    return places
      .filter((place) => place.toLowerCase().startsWith(value.toLowerCase()))
      .sort();
  };

  const handleChangeText = (value: string) => {
    setInputState(() => value);
    setAutoCompletePlaceState(() => updateAutocmopletePlaces(value));
  };

  const handleKeyDownArrows = (key: string) => {
    if (selectedState > autoCompletePlaceState.length) {
      setSelectedState(() => 0);
    }

    if (
      key === 'ArrowDown' &&
      selectedState < autoCompletePlaceState.length - 1
    ) {
      setSelectedState((prev) => prev + 1);
      paragraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    if (key === 'ArrowUp' && selectedState > 0) {
      setSelectedState((prev) => prev - 1);
      paragraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
    if (key === 'Enter') {
      setInputState(() => autoCompletePlaceState[selectedState]);
    }
  };

  const handleClickPlace = (place: string) => {
    setInputState(() => place);
    setAutoCompleteVisibleState(false);
  };
  return (
    <>
      <form
        onSubmit={(e) => handleSubmiteAddCard(e)}
        className={classes['container']}
      >
        <input
          type="text"
          value={inputState}
          className={classes['container__input']}
          placeholder="Enter Your City"
          onChange={(e) => handleChangeText(e.target.value)}
          onKeyDown={(e) => handleKeyDownArrows(e.key)}
          onFocus={() => setAutoCompleteVisibleState(true)}
          onBlur={(e) => handleBlur(e)}
        />
        <button type={'submit'} className={classes['container__button']}>
          Add City
        </button>
        <div
          tabIndex={0}
          onBlur={(e) => handleBlur(e)}
          className={classes['container__autoCompleteContainer']}
        >
          {autoCompleteVisibleState &&
            autoCompletePlaceState.map((place, index) => (
              <li
                key={index}
                className={`${
                  classes[selectedState === index ? 'container__place' : '']
                } 
                 `}
                onClick={() => handleClickPlace(place)}
                ref={selectedState === index ? paragraphRef : null}
              >
                {place}
              </li>
            ))}
        </div>
      </form>
    </>
  );
};

const MemoizedCityForm = React.memo(CityForm);

export default MemoizedCityForm;
