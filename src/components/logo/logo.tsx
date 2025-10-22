import {Link, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import { AppRoute } from '../../const';

type LogoProps = {
  type: 'header' | 'footer';
}

const Sizes = {
  header: {
    width: 81,
    height: 41
  },
  footer: {
    width: 64,
    height: 33
  }
};

function Logo({type}: LogoProps) :JSX.Element {
  const {pathname} = useLocation();
  const isMainPage = pathname as AppRoute === AppRoute.Main;
  const size = Sizes[type];

  return (
    <Link className={clsx(`${type}__logo-link`, isMainPage && 'header__logo-link--active')} to={AppRoute.Main}>
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={size.width}
        height={size.height}
      />
    </Link>
  );

}

export default Logo;
