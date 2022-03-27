import React, {useEffect, useState, useRef} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const InputComments = (props) => {

    const {id} = useParams()


    //COMMENTS
    const input = useRef() //misma funcioon que el onchange cuando tiene funcion flecha q agarra el evento
    const [inputText, setInputText] = useState()

    async function loadComments() {
        const commentData = {
        itinerary: props.itineraryId,
        comment: input.current.value,
        }
        console.log(commentData)
        await props.addComment(commentData)
        input.current.value= ''
        props.getItinerariesByCityId(id)
    }


    return ( 
        <>
                {props.user ?
                    <div className="eeeeee">
                        <div className="chauu">
                            <textarea ref={input} className="holala" value={inputText} />
                            <button onClick={() => loadComments(props.itineraryId)} className="btn btn-primary">Comment</button>
                    </div>
                    </div> 
                
                    :

                    <div className='log-in-comment'><Link to="/login" className='tag_login_comment mb-4 mt-4'><span className='color-login-comment'>Please, log in and comment!</span></Link></div>
                }
        </>
    );
}

const mapStateToProps = (state) => {
    return {

        itinerary: state.itinerariesReducer.itinerary,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {

    addComment: itinerariesActions.addComment,
    editComment: itinerariesActions.editComment,
    deleteComment: itinerariesActions.deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(InputComments);
