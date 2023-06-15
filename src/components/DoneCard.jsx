import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareIcon from './ShareIcon';

export default function DoneCard({
  id,
  name,
  image,
  category,
  doneDate,
  index,
  tags,
  type,
  nationality,
  alcohoolicOrNot,
}) {
  const alcoOrNat = type === 'meal' ? nationality : alcohoolicOrNot;
  const initialURL = `http://${window.location.href.split('/')[2]}`;

  return (
    <li
      key={ id }
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ `/${type}s/${id}` }>
        <img
          width="100px"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${alcoOrNat} - ${category}` }
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>
          { `Done in: ${doneDate}` }
        </p>
        <div>
          {tags.map((tag) => (
            <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { `${tag} ` }
            </p>
          ))}
        </div>
        <ShareIcon
          pathName={ `${initialURL}/${type}s/${id}` }
          testid={ `${index}-horizontal-share-btn` }
        />
      </Link>
    </li>
  );
}

DoneCard.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
}.isRequired;
