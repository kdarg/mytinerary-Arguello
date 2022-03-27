import React, {useState} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useParams } from 'react-router-dom';
import {AiFillEdit, AiOutlineDelete} from 'react-icons/ai'

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
                        
                        <div className="comment-box" key={props.comment._id}>
                            <div className='user-info-comment'>
                                <img src={props.comment.userID.urlimage} className='avatar-user-comment' alt="user_img" /> 
                                <div className="user-comment">{props.comment.userID?.firstname}</div>
                                <div className="user-comment">{props.comment.userID?.lastname}:</div>
                                <div className="comment-italic">{props.comment.comment}</div>
                            </div>
                        </div> 
                    
                        :

                    <div className="">
                        <div className="">
                        <div className="comment-box" key={props.comment._id}>
                            <div className='user-info-comment'>
                                <img src={props.comment.userID.urlimage} className='avatar-user-comment' alt="user_img" /> 
                                <div className="user-comment">{props.comment.userID?.firstname}</div>
                                <div className="user-comment">{props.comment.userID?.lastname}:</div>
                                <div className="comment-italic">{props.comment.comment}</div>
                            </div>
                        </div> 
                        </div>


                        <div className="eeeeee">
                            
                    {modify ? (
                        <textarea type="text" className="owowowowowo" onChange={ e => setInputText(e.target.value)} defaultValue={props.comment.comment} />
                    )
                    
                        : <span></span>
                        // <p>{props.comment.comment}</p>
                    }
                    <div className='kaaaren mb-4'>
                        {/* <button id={props.comment._id} onClick={() => modifyComments(props.comment._id)} className="btn btn-primary">Edit</button> */}

                        <AiFillEdit id={props.comment._id} onClick={() => modifyComments(props.comment._id)} className="editicon" />

                        {/* <AiTwotoneDelete className='deleteicon'/>

                        <button id={props.comment._id} onClick={deleteComments} className="btn btn-primary">Delete</button>  */}

                        <AiOutlineDelete id={props.comment._id} onClick={deleteComments} className=" deleteicon"/>


                        {/* <span className="material-icons-outlined">delete</span> */}
                        </div>
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