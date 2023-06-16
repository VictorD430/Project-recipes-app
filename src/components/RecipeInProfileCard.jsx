import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ShareIcon from './ShareIcon';
import FavoriteIcon from './FavoriteIcon';

export default function RecipeInProfileCard({
  id,
  name,
  image,
  category,
  doneDate,
  index,
  tags,
  type,
  nationality,
  alcoholicOrNot,
}) {
  const alcoOrNat = type === 'meal' ? nationality : alcoholicOrNot;
  const initialURL = `http://${window.location.href.split('/')[2]}`;
  const history = useHistory();
  const validateRoute = (routeParam) => history.location.pathname.includes(routeParam);
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
        { validateRoute('done') && (
          <>
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
          </>
        )}
      </Link>
      <ShareIcon
        pathName={ `${initialURL}/${type}s/${id}` }
        testid={ `${index}-horizontal-share-btn` }
      />
      {validateRoute('favorite') && (
        <FavoriteIcon
          testid={ `${index}-horizontal-favorite-btn` }
          dados={ { id,
            name,
            image,
            category,
            doneDate,
            index,
            tags,
            type,
            nationality,
            alcoholicOrNot,
            isFavorite: true,
            recipeInfo: { id,
              name,
              image,
              category,
              doneDate,
              index,
              tags,
              type,
              nationality,
              alcoholicOrNot,
            } } }
          pathName={ `${initialURL}/${type}s/${id}` }
        />)}
    </li>
  );
}

RecipeInProfileCard.propTypes = {
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  doneDate: PropTypes.string,
  id: PropTypes.number,
  image: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  nationality: PropTypes.string,
  tags: PropTypes.shape({
    map: PropTypes.func,
  }),
  type: PropTypes.string,
}.isRequired;
