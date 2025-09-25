import { PLACES_OPTIONS } from '../../const';

type PlacesOptionsProps = {
  activeSort: string;
  setActiveSort: (arg0: string) => void;
  isOpenOption: boolean;
}

function PlacesOptions({activeSort, setActiveSort, isOpenOption}: PlacesOptionsProps): JSX.Element {
  return (
    <ul className={`places__options places__options--custom ${isOpenOption && 'places__options--opened'}`}>
      {PLACES_OPTIONS.map((option) => (
        <li
          className={`places__option ${activeSort === option && 'places__option--active'}`}
          tabIndex={0}
          key={option}
          onClick={() => setActiveSort(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}

export default PlacesOptions;
