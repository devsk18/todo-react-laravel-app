import React from 'react'
import { Link } from 'react-router-dom'
import { Toast } from '../helper/Toast'
import Swal from 'sweetalert2'
import TodoApi from '../helper/TodoApi'

function TodoView({todo}) {
  
  const openConfirmBox = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo();
      }
    })
  }
  const deleteTodo = () => {
    TodoApi.delete('/'+ todo.id).then((res)=>{
      Toast.fire({
        icon: 'success',
        title: 'Todo deleted successfully'
      })
      setTimeout(()=>{
        window.location.reload(true)
      },1500);
      
    }).catch((res)=> {
      Toast.fire({
        icon: 'error',
        title: 'Todo deletion failed'
      })
    })
  }

  return (
    <div className="todo p-3 rounded d-flex todo-hover text-dark border-bottom">
      <div className="col-md-10">
        <div className="todo-data">
          <h5 className="mb-0 pb-0">{todo.title}</h5>
          <small className="text-secondary">{todo.description}</small>
          <small className="d-block text-secondary">Status : &nbsp;
            {
                todo.status ? 
                    (<span className="badge text-bg-success">Completed</span>) : (<span className="badge text-bg-warning">Pending</span>)
            }
          </small>
          <small className="text-secondary">Created on : {todo.created_at}</small>
          {
            todo.status ? (<small className="d-block text-secondary">Completed on : {todo.updated_at}</small>) : null
          }
        </div>
      </div>
      <div className="col-md-2 mt-2 d-flex justify-content-md-end">
        <span className="todo-icons d-flex">
          <Link to={"/dashboard/todo/edit/" + todo.id }>
            <i className="bx bx-edit"></i>
          </Link>
        </span>
        <span className="todo-icons d-flex">
          <Link onClick={openConfirmBox}>
            <i className="bx bx-trash"></i>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default TodoView