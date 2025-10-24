import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { changeFavorites } from '../../store/api-actions';
import { useAuth } from '../../hooks/user-authorization';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { selectFavoriteIds } from '../../store/slices/favorites';

type BookmarksProps = {
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

function Bookmark({type, offerId}:BookmarksProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoriteIds = useAppSelector(selectFavoriteIds);

  const isAuthorized = useAuth();
  const isFavorite = favoriteIds.has(offerId);

  function handleClick() {
    if (!isAuthorized) {
      return navigate(AppRoute.Login);
    }

    dispatch(changeFavorites({
      offerId,
      status: Number(!isFavorite)
    }));
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
