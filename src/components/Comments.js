import React, {useEffect, useState} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useParams } from 'react-router-dom';

const Comments = (props) => {

    const [reload, setReload] = useState(false)

    const {id} = useParams()  //:id del link

    //COMMENTS
    const [inputText, setInputText] = useState('')
    const [modify, setModify] = useState(false)
    
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
            
                    {props.comment.userID?._id !== props.user?.id ?
                        
                        <div className="" key={props.comment._id}>
                        <div className="">{props.comment.userID?.lastname}</div>
                        <div className=""><p className="">{props.comment.comment}</p></div>
                        </div> 
                    
                        :

                    <div className="card cardComments">
                        <div className="card-header">
                        {props.comment.userID.firstname}
                        <span>  </span>
                        {props.comment.userID.lastname}
                        {/* {props.comment.userID.urlimage} */}
                        </div>
                        <div className="card-body ">
                    {modify? (
                        <textarea type="text" className="card-text textComments" onChange={ e => setInputText(e.target.value)} defaultValue={props.comment.comment} />
                    ): <p>{props.comment.comment}</p>
                    }

                        <button id={props.comment._id} onClick={() => modifyComments(props.comment._id)} className="btn btn-primary">Edit</button>


                        <button id={props.comment._id} onClick={deleteComments} className="btn btn-primary">Delete</button> 

                        {/* <span className="material-icons-outlined">delete</span> */}

                        </div>
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);