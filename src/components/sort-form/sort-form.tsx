import { memo, useRef, useState } from 'react';
import PlacesOptions from '../places-options/places-options';
import { useAppSelector } from '../../hooks/store';
import { useClickOutside } from '../../hooks/use-click-outside';
import { offersSelectors } from '../../store/slices/offers';

function SortForm(): JSX.Element {
  const [open, setOpen] = useState(false);
  const activeSort = useAppSelector(offersSelectors.activeSort);

  const ref = useRef<HTMLFormElement>(null);
  const handleClickOutside = () => {
    setOpen(false);
  };
  useClickOutside(ref, handleClickOutside);

  return (
    <form ref={ref} className="places__sorting" action="#" method="get" onClick={() => setOpen(!open)}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <PlacesOptions activeSort={activeSort} isOpen={open}/>
    </form>
  );
}

export default memo(SortForm);
