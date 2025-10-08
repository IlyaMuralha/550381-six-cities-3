import { memo } from 'react';
import Logo from '../logo/logo';

function Footer() :JSX.Element {
  return (
    <footer className="footer container">
      <Logo type='footer'/>
    </footer>
  );
}

export default memo(Footer);
