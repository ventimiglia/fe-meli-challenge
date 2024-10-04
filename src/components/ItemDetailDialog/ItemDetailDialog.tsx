import './ItemDetailDialog.css';
import { TItem } from '../../App';

const ItemDetailDialog: React.FC<TItem> = ({
  title,
  description,
  image,
  detail,
}) => {
  return (
    <article className='item-detail'>
      <figure className='item-detail__image-container'>
        <img src={image} alt={title} className='item-detail__image' />
        <figcaption>{title}</figcaption>
      </figure>
      <section className='item-detail__information'>
        <h2>{title}</h2>
        <p>
          <b>{description}</b>
        </p>
        <span>{detail.info}</span>
      </section>
      <aside className='item-detail__information'>
        <h2>
          {detail.price.toLocaleString('es-ar', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
          })}
        </h2>
        <address>{detail.address}</address>
      </aside>
    </article>
  );
};

export default ItemDetailDialog;
