import { Fragment } from "react";
import { Badge } from "react-bootstrap";
const GenresView =({genres})=>{
    return(
        <Fragment>
               {genres ?(
                <>
                 Genres:
                 {
                 genres.map((genre) => (
                    <Badge
                    key={genre._id} 
                    className="mx-1">{genre.Name} 
                    </Badge>)

                 )
                  
                  }
                </>
               ):(

                ''
               )
               


                }
             
            
         </Fragment>
    )
}
export default GenresView;