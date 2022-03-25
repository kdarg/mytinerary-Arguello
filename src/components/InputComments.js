import React, {useEffect, useState, useRef} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useParams } from 'react-router-dom';

const InputComments = (props) => {

    const {id} = useParams()
    const [reload, setReload] = useState(false)
    
    console.log(props.itinerary);
    console.log(props)
    // console.log(props.user)

    //COMMENTS
    const input = useRef() //misma funcioon que el onchange cuando tiene funcion flecha q agarra el evento
    const [inputText, setInputText] = useState()
    const [modify, setModify] = useState()

    async function loadComments() {
        const commentData = {
        itinerary: props.itineraryId,
        comment: input.current.value,
        }
        console.log(commentData)
        await props.addComment(commentData)
        //.then(response => setPlace(response.data.response.newComment), setInputText(""))
        input.current.value= ''
        props.getItinerariesByCityId(id)
    }


    return ( 
        <>

                {props.user ?
                <div class="card cardComments">
                    <div class="card-header">
                    Comment here!
                    </div>
                    <div class="card-body ">
                    <textarea ref={input} className="card-text textComments" value={inputText} />
                    <button onClick={() => loadComments(props.itineraryId)} class="btn btn-primary">Comment</button>
                    </div>
                </div> :
                <h1>Log in and comment!</h1>
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
