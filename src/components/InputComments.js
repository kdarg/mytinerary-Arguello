import React, {useState, useRef} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const InputComments = (props) => {

    const {id} = useParams()


    //COMMENTS
    const input = useRef() //misma funcioon que el onchange cuando tiene funcion flecha q agarra el evento
    const [inputText, setInputText] = useState()

    async function postComments() {
        const commentData = {
        itinerary: props.itineraryId,
        comment: input.current.value,
        }
        console.log(commentData)
        // await props.addComment(commentData)
        // input.current.value= ''
        // props.getItinerariesByCityId(id)
        props.addComment(commentData)
        .then( x=> {
            console.log(x)
            if(x.status === 200) {

                input.current.value= ''
                props.getItinerariesByCityId(id)
                showToast('Comment posted', 'rgb(76, 238, 103)')
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
                {props.user ?
                    <div className="eeeeee">
                        <div className="chauu">
                            <textarea ref={input} className="holala" value={inputText} />
                            <button onClick={() => postComments(props.itineraryId)} className="btn btn-primary">Comment</button>
                    </div>
                    </div> 
                
                    :

                    <div className='log-in-comment'><Link to="/login" className='tag_login_comment mb-4 mt-4'><span className='color-login-comment'>Feel free to sign up and comment !</span></Link></div>
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
