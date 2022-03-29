import Swal from 'sweetalert2'

const Toast = (icon, title) =>{
    const generalToast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      
      generalToast.fire({
        icon: icon,
        title: title
      })
}

export default Toast; 