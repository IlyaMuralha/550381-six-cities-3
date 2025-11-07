import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks/user-authorization';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logout } from '../../store/api-actions';
import { userSelectors } from '../../store/slices/user';
import { useFavoriteCount } from '../../hooks/use-favorite-count';
import { memo } from 'react';
import { favoritesAction } from '../../store/slices/favorites';

function UserNav() :JSX.Element {
  const isAuthorized = useAuth();
  const user = useAppSelector(userSelectors.user);
  const dispatch = useAppDispatch();
  const favoriteCount = useFavoriteCount();
  const navigate = useNavigate();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuthorized ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{user?.email}</span>
                <span className="header__favorite-count">{favoriteCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a
                className="header__nav-link"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(logout());
                  dispatch(favoritesAction.resetFavorites());
                  navigate(AppRoute.Login);
                }}
              >
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
        ) : (
          <li className="header__nav-item">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default memo(UserNav);
