import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useParams } from 'react-router-dom';
import {AiFillEdit, AiOutlineDelete} from 'react-icons/ai'
import Swal from 'sweetalert2'

const Comments = (props) => {

    const [reload, setReload] = useState(false)

    const {id} = useParams()  //:id del link

    //COMMENTS
    const [inputText, setInputText] = useState('')
    const [modify, setModify] = useState(false)
    
    // useEffect(() => {
    //     if(modify){
            
    //     }
    // }, [reload])

    async function modifyComments(karen) {
        const commentData = {
        commentID: karen,
        comment: inputText,
        }
        // let editCommentResponse = await props.editComment(commentData)
        props.editComment(commentData)
        .then(x=> {
            if(x.status === 200){
                props.getItinerariesByCityId(id)
                setReload(!reload)
                showToast('Edited comment', 'rgb(76, 238, 103)')
                
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
                showToast('Deleted comment', 'rgb(238, 76, 103)' )
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

                        }
                        <div className='kaaaren mb-4'>

                        <AiFillEdit id={props.comment._id} onClick={() => {
                            
                            toggleTextArea()

                        
                        } }className="editicon" />

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