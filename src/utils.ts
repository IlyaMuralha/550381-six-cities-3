import { AppRoute } from './const';

export const getLayoutState = (pathname: AppRoute) => {
  let mainClassName = '',
    shouldRenderUser = true,
    shouldRenderFooter = false;

  if (pathname === AppRoute.Main) {
    mainClassName = 'page--gray page--main';
  } else if (pathname === AppRoute.Login) {
    mainClassName = 'page--gray page--login';
    shouldRenderUser = false;
  } else if (pathname === AppRoute.Favorites) {
    shouldRenderFooter = true;
  }

  return {mainClassName, shouldRenderUser, shouldRenderFooter};
};
