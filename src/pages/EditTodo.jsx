import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TodoApi from '../helper/TodoApi';
import { Toast } from '../helper/Toast';
import { useNavigate, useParams } from 'react-router-dom';

function EditTodo() {

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState(null);

    const {id} = useParams()
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        TodoApi.put('/'+id ,{
            title,
            description,
            status
        }).then((res)=>{
            Toast.fire({
                icon: 'success',
                title: 'Todo updated Successfully'
            }).then(navigate('/dashboard/todo'))
        }).catch((res)=>{
            Toast.fire({
                icon: 'error',
                title: 'Todo updating Failed'
            })
            console.log(res.data.data);

        })
    };

    const fetchData = () => {
        TodoApi.get('/'+id).then((res)=>{
            setTitle(res.data.data.title)
            setDescription(res.data.data.description)
            setStatus(res.data.data.status)
        }).catch(()=>{
            Toast.fire({
                icon : 'error',
                title: 'couldn\'t fetch the data'
            })
        })
    }

    const selectStatus = () => {
        if(status!=null)
            return status == 0 ? 'Pending' : 'Completed'
    }

    useEffect( ()=>{
        fetchData(id);
    },[id]);
  return (
    <div className="container-fluid p-0">
      <Header />

      <div className="d-flex justify-content-center">
        <div className="col-md-6 col-10 mt-5">
          <div className="col-12 p-3 pb-1 bg-dark rounded">
            <h4 className='text-white'>Edit Todo</h4>
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
                  value={description}
                  className="form-control mt-2"
                  onChange={(e) => setDescription(e.target.value)}
                  required></textarea>
              </div>
              <div className="form-group mt-2">
                <label>Status</label>
                <div className="status d-flex justify-content-between">
                    <h6>{selectStatus()}</h6>
                    <span className='btn btn-primary' onClick={()=>{setStatus(status == 0 ? 1 : 0)}}>Change Status</span>
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary mt-3">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodo