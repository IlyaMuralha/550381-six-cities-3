import clsx from 'clsx';
import { useAppDispatch } from '../../hooks/store';
import { changeFavorites } from '../../store/api-actions';
import { memo, useState } from 'react';
import { useAuth } from '../../hooks/user-authorization';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

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
  const [activ, setActive] = useState(isFavorite ? isFavorite : false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthorized = useAuth();

  function handleClick() {
    if (!isAuthorized) {
      return navigate(AppRoute.Login);
    }

    dispatch(changeFavorites({
      offerId,
      status: Number(!activ)
    }))
      .unwrap()
      .then(() => {
        dispatch(() => setActive(!activ));
      });
  }
  return (
    <button
      className={clsx(`${type}__bookmark-button button`, activ && 'place-card__bookmark-button--active')}
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

export default memo(Bookmark);
