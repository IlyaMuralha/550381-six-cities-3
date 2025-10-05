import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAuth } from '../../hooks/user-authorization';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logout } from '../../store/api-actions';
import { userSelectors } from '../../store/slices/user';

function UserNav() :JSX.Element {
  const isAuthorized = useAuth();
  const user = useAppSelector(userSelectors.user);
  const dispatch = useAppDispatch();

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
                <span className="header__favorite-count">3</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                className="header__nav-link"
                to={AppRoute.Login}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>
        ) : (
          <li className="header__nav-item">
            <Link className="header__nav-link" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__signout">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default UserNav;
