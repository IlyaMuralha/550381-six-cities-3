import clsx from 'clsx';
import { useAppDispatch } from '../../hooks/store';
import { changeFavorites, fetchOffer, fetchOfferAction } from '../../store/api-actions';

type BookmarksProps = {
  isFavorite: boolean;
  type: 'offer' | 'place-card';
  offerId: string;
}

const Sizes = {
  'offer': {
    width: 31,
    height: 33
  },
  'place-card': {
    width: 18,
    height: 19
  }
};

function Bookmark({type, isFavorite, offerId}:BookmarksProps): JSX.Element {

  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(changeFavorites({
      offerId,
      status: Number(!isFavorite)
    }))
      .unwrap()
      .then(() => {
        dispatch(fetchOfferAction());
        dispatch(fetchOffer(offerId));
      });
  }
  return (
    <button
      className={clsx(`${type}__bookmark-button button`, isFavorite && 'place-card__bookmark-button--active')}
      type="button"
      onClick={handleClick}
    >
      <svg className="place-card__bookmark-icon" width={Sizes[type].width} height={Sizes[type].height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;
