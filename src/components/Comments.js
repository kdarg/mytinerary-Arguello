import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useParams } from 'react-router-dom';
import {AiFillEdit, AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import Swal from 'sweetalert2'

const Comments = (props) => {

    const [reload, setReload] = useState(false)

    const {id} = useParams()  //:id del link

    const [inputText, setInputText] = useState('')
    const [modify, setModify] = useState(false)

    async function modifyComments(karen) {
        const commentData = {
        commentID: karen,
        comment: inputText,
        }

        props.editComment(commentData)
        .then(x=> {
            if(x.status === 200){
                props.getItinerariesByCityId(id)
                setReload(!reload)
                showToast('Comment edited!', 'rgb(86, 216, 151)')
                
            }
        })
    }

    async function toggleTextArea(){
        setModify(!modify)
        if(modify){
            modifyComments(props.comment._id) 
        }else{
            setInputText(props.comment.comment)
        }
    }

    async function deleteComments(event) {
        props.deleteComment(event.target.id)
        .then(x=>{
            if(x.status === 200){
                props.getItinerariesByCityId(id)
                setReload(!reload)
                showToast('Comment deleted!', 'rgb(238, 76, 103)' )
            }
        })
    }

    function showToast(title, iconColor){
    
        const Toast = Swal.mixin({
            toast: true,
            position: "center-end",
            showConfirmButton: false,
            timer: 3000,
            background: "#FFF",
            iconColor: iconColor,
            confirmButtonColor: "rgb(221, 46, 113)",
            timerProgressBar: true,
            
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "success",
            title: title,
        });
        
    }

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

                        <div className="box-commentinput">
                            
                        {modify ? (
                        <textarea type="text" className="text-area-comm textarea-width" onChange={ e => setInputText(e.target.value)} defaultValue={props.comment.comment} /> )
                    
                            : <span></span>

                        }
                        <div className='spacearound-icons mb-4'>

                        <AiOutlineEdit id={props.comment._id} onClick={() => {toggleTextArea()}} className="editicon" />

                        <AiOutlineDelete id={props.comment._id} onClick={deleteComments} className=" deleteicon"/>

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