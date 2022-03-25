import React, {useEffect, useState, useRef} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useParams } from 'react-router-dom';

const Comments = (props) => {

    const [reload, setReload] = useState(false)
    
    console.log(props.itinerary);
    console.log(props)
    // console.log(props.user)

    const {id} = useParams()  //:id del link
    //COMMENTS

    const [inputText, setInputText] = useState('')
    const [modify, setModify] = useState(false)
    
    const inputComment = useRef() 
    
    
    async function modifyComments(karen) {
        const commentData = {
        commentID: karen,
        comment: inputText,
        }
        setModify(!modify)
        await props.editComment(commentData)
        props.getItinerariesByCityId(id)
        setReload(!reload)
    }


    async function deleteComments(event) {
        await props.deleteComment(event.target.id)
        props.getItinerariesByCityId(id)
        setReload(!reload)
    }

    //console.log(props.comment) cada comentario

    return ( 
        <>

    {/* {props.itinerary.length && props.itinerary?.comments.map(comment => */}
                <>
                    {props.comment.userID?._id !== props.user?.id ?
                    <div className="card cardComments " key={props.comment._id}>
                        <div className="card-header">
                        {props.comment.userID?.lastname}
                        </div>
                        <div className="card-body">
                        <p className="card-text">{props.comment.comment}</p>
                        </div>
                    </div> :

                    <div className="card cardComments">
                        <div className="card-header">
                        {props.comment.userID.firstname}
                        </div>
                        <div className="card-body ">
                    {modify? (
                          <textarea type="text" className="card-text textComments" onChange={ e => setInputText(e.target.value)} defaultValue={props.comment.comment} />
                    ): <p>{props.comment.comment}</p>
                    }

                        <button id={props.comment._id} onClick={() => modifyComments(props.comment._id)} class="btn btn-primary">Edit</button>
                        <button id={props.comment._id} onClick={deleteComments} className="btn btn-primary">Delete</button>
                        </div>
                    </div>

                    }
                </>
                {/* )} */}
                
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
