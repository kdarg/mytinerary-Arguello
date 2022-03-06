// import Underconstruction from "./Underconstruction";
// import { useState } from "react";

// const Itinerary = () => {


//     const [collapse, setCollapse] = useState(true)

//     const toggleInfo = () => {
//         setCollapse(!collapse)
//     }

//     return ( 

// <div className="itinerary">
//             <h3>Itinerario</h3>
//             <div className="itineraryContent">
//                 <div className="itineraryInfo">
//                     <div className="author">
//                         <div className="authorPicture" style=''></div>
//                         <h4>salida</h4>
//                     </div>
//                     <p>estanochevamos a salid r a</p>
//                     <div className="iconContainer">
//                         <p>PRecio</p>
//                         <p>Duracion</p>
//                         <div className="likes">
//                         {/* <img src={heart} onClick={likeItinerary }/> */}
//                         {/* <p>{itinerariesLikes.length}</p> */}
//                         </div>
//                     </div>
//                     <div className="hashtags">hashtags</div>
//                 </div>
            
//                 <div className="cityPicture" style=''></div>
//             </div>
//             <div className="activitiesContainer">
//                 <div className = {collapse ? "hide" : "show"}>
//                     <h4>Activities</h4>
                    
//                     <Underconstruction/>
//                 </div>
                
                
//                 <button className="viewMore" onClick={toggleInfo}>{collapse ? " View More" : "View Less"}</button>
           
//             </div>
           

//         </div>

//      );
// }
 
// export default Itinerary ;