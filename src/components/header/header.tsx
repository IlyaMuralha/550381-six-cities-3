import Logo from '../logo/logo';
import UserNav from '../user-nav/user-nav';

type HeaderProps = {
  shouldRenderUser: boolean;
}

function Header({shouldRenderUser}: HeaderProps) :JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type='header'/>
          </div>
          {
            shouldRenderUser && (<UserNav/>)
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
