import { Fragment } from 'react';
import { Badge } from 'react-bootstrap';
const GenresView = ({ genres }) => {
   return (
      <Fragment>
         {genres ? (
            <>
               Genres:
               {genres.map((genre) => (
                  <Badge key={genre._id} className="m-2">
                     {genre.Name}
                  </Badge>
               ))}
            </>
         ) : (
            ''
         )}
      </Fragment>
   );
};
export default GenresView;
