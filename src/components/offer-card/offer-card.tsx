import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Badge from '../badge/badge';
import { TOffer } from './types';
import Bookmark from '../bookmark/bookmark';
import { calcRating, ucFirst } from '../../utils';

type TClassesForType = {
  container: string;
  prefix: string;
}

type TSizeForType = {
  width: string;
  height: string;
}

type OfferCardProps = {
  offer: TOffer;
  handleHover?: (offer?: TOffer) => void;
  classesForType: TClassesForType;
  sizeForType: TSizeForType;
}

function OfferCard({offer, handleHover, classesForType, sizeForType}: OfferCardProps): JSX.Element {
  const {id, title, type, price, isFavorite, isPremium, previewImage, rating } = offer;

  const ratingStyle = calcRating(rating);

  const handleMouseEnter = () => {
    handleHover?.(offer);
  };

  const handleMouseLeave = () => {
    handleHover?.();
  };

  return (
    <article
      className={clsx(`${classesForType.prefix}__card place-card`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && <Badge text='Premium' className='place-card__mark' />}
      <div className={clsx(`${classesForType.prefix}__image-wrapper place-card__image-wrapper`)}>
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={sizeForType.width}
            height={sizeForType.height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark isFavorite={isFavorite}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingStyle}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{ucFirst(type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
