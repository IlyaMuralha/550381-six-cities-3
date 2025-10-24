import { memo } from 'react';
import { PLACE_OPTIONS } from '../../const';
import { useAppDispatch } from '../../hooks/store';
import { offersAction } from '../../store/slices/offers';

type PlacesOptionsProps = {
  activeSort: typeof PLACE_OPTIONS[number];
  isOpen: boolean;
}

function PlacesOptions({activeSort, isOpen}: PlacesOptionsProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ul className={`places__options places__options--custom ${isOpen && 'places__options--opened'}`}>
      {PLACE_OPTIONS.map((option) => (
        <li
          className={`places__option ${activeSort === option && 'places__option--active'}`}
          tabIndex={0}
          key={option}
          onClick={() => dispatch(offersAction.setActiveSort(option))}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}

export default memo(PlacesOptions);
