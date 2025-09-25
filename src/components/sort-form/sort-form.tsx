import { useState } from 'react';
import PlacesOptions from '../places-options/places-options';

type SortFormProps = {
  activeSort: string;
  setActiveSort: (arg0: string) => void;
}

function SortForm({activeSort, setActiveSort}: SortFormProps): JSX.Element {
  const [isOpenOption, setIsOpenOption] = useState(false);

  const toogleOption = () => {
    if (isOpenOption) {
      return setIsOpenOption(false);
    }
    setIsOpenOption(true);
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={toogleOption}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <PlacesOptions activeSort={activeSort} setActiveSort={setActiveSort} isOpenOption={isOpenOption}/>
    </form>
  );
}

export default SortForm;
