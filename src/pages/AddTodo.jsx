import React, { useState } from 'react'
import Header from '../components/Header'
import TodoApi from '../helper/TodoApi';
import { Toast } from '../helper/Toast';
import { useNavigate } from 'react-router-dom';

function AddTodo() {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        TodoApi.post('/',{
            title,
            description
        }).then((res)=>{
            Toast.fire({
                icon: 'success',
                title: 'Todo Created Successfully'
            }).then(navigate('/dashboard/todo'))
        }).catch((res)=>{
            Toast.fire({
                icon: 'error',
                title: 'Todo Creating Failed'
            })
        })
    };
  return (
    <div className="container-fluid p-0">
      <Header />

      <div className="d-flex justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="col-12 p-3 pb-1 bg-dark rounded">
            <h4 className='text-white'>Create Todo</h4>
          </div>
          <div className="form col-12 p-3 border">
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-2">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-2">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control mt-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodo