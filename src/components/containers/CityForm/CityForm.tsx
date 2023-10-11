import { useRef, useState } from 'react';
import classes from './CityForm.module.scss';
import places from '../../../utils/places';

interface IProps {
  readonly addCity: (string) => void;
}

const CityForm: React.FC<IProps> = (props) => {
  const paragraphRef = useRef(null);
  const sortedArray = places.sort();

  const [inputState, setInputState] = useState('');
  const [autoCompleteVisibleState, setAutoCompleteVisibleState] =
    useState(false);
  const [selected, setSelected] = useState<number>(0);
  const [autoCompletePlaceState, setAutoCompletePlaceState] =
    useState<string[]>(sortedArray);

  const onBlurHandler = (e: React.FocusEvent<HTMLElement>) => {
    if (e.relatedTarget === null) {
      setAutoCompleteVisibleState(false);
      setSelected(() => 0);
    } else {
      return;
    }
  };

  const addCardHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.addCity(inputState);
    setInputState(() => '');
  };

  const textHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(() => e.target.value);
    const filteredAndSortedPlaces = places
      .filter((place) =>
        place.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
      .sort();
    setAutoCompletePlaceState(() => filteredAndSortedPlaces);
  };

  const onArrowKeyClick = (key: string) => {

    if (key === 'ArrowDown' && selected < autoCompletePlaceState.length - 1) {
      setSelected((prev) => prev + 1);
      paragraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setInputState(() => autoCompletePlaceState[selected + 1]);
    }
    if (key === 'ArrowUp' && selected > 0) {
      setSelected((prev) => prev - 1);
      paragraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      setInputState(() => autoCompletePlaceState[selected - 1]);
    }
  };

  const onPlaceClick = (place: string) => {
    setInputState(() => place);
    setAutoCompleteVisibleState(false);
  };
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
          onChange={(e) => textHandler(e)}
          onKeyDown={(e) => onArrowKeyClick(e.key)}
          onFocus={() => setAutoCompleteVisibleState(true)}
          onBlur={(e) => onBlurHandler(e)}
        />
        <button type={'submit'} className={classes['container__button']}>
          Add City
        </button>
        <div
          tabIndex={0}
          onBlur={(e) => onBlurHandler(e)}
          className={classes['container__autoCompleteContainer']}
        >
          {autoCompleteVisibleState &&
            autoCompletePlaceState.map((place, index) => (
              <li
                key={index}
                className={`${
                  classes[selected === index ? 'container__place' : '']
                } 
                 `}
                onClick={() => onPlaceClick(place)}
                ref={selected === index ? paragraphRef : null}
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
