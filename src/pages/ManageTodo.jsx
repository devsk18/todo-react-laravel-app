import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TodoView from '../components/TodoView';
import TodoApi from '../helper/TodoApi';
import { useNavigate } from 'react-router-dom';



function ManageTodo() {
    
    const [data , setData] = useState();
    const navigate = useNavigate()

    const fetchTodos = () => {
        TodoApi.get().then((res)=>{
            const todoData = res.data.data
            setData(todoData);
        })
    }
    
    useEffect(()=>{
        fetchTodos();
    },[]);

    const handleClick = () => {
        navigate('/dashboard/todo/add');
    }

  return (
    <div className="container-fluid p-0">
      <Header />

      <div className="d-flex justify-content-center">
        <div className="col-md-6 col-12 mt-5">
          <div className="col-12 p-3 bg-dark d-flex justify-content-between align-items-center text-white">
            <h4 className='mb-0'>ToDo List</h4>
            <button  onClick={handleClick} className='btn btn-primary p-2'>
              <b>+</b> Create
            </button>
          </div>
            <div className="wraper" style={{height:'450px',overflowY:'scroll'}}>
            {
                data?.map(todo => <TodoView todo={todo}/> )
            }
            {
                !data?.length ? (<div className='p-3 mt-3 border-bottom'><h6>No Data Found</h6></div>) : null
            }
            </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTodo