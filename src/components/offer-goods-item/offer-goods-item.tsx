type OfferGoodsItemProps = {
  good: string;
}

function OfferGoodsItem({good}: OfferGoodsItemProps): JSX.Element {
  return <li className="offer__inside-item">{good}</li>;
}

export default OfferGoodsItem;
