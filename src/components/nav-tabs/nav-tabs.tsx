import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks/store';
// import { TCity } from '../offer-card/types';
import { setCity } from '../../store/action';

type NavTabsProps = {
  currentCity: string;
}

function NavTabs({currentCity}: NavTabsProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li className="locations__item" key={city.name}>
              <a
                className={`locations__item-link tabs__item ${currentCity === city.name && 'tabs__item--active'}`}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(setCity(city.name));
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default NavTabs;
