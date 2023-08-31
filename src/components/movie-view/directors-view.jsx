import { Fragment } from 'react';
import { render } from 'react-dom';
import { Card } from 'react-bootstrap';

const DirectorView = ({ name, biography }) => {
   return (
      <Fragment>
         <div>
            <h5>{name}</h5>
            <p>
               <span className="mt-2" style={{ display: 'block' }}>
                  Biography:
               </span>
               {biography}
            </p>
         </div>
      </Fragment>
   );
};
export default DirectorView;
