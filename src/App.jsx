import './styles/App.css';
import './styles/Toast.css'


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/login';
import Home from './pages/Home';
import PrivateRoute from './helper/PrivateRoute';
import PublicRoute from './helper/PublicRoute';
import Dashboard from './pages/Dashboard';
import ManageTodo from './pages/ManageTodo';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';

function App() {

  return (
    <Router>
        {/* <div className="container-fluid"> */}
          <Routes>
            
              <Route exact path='/' element={<Home />} />

              <Route path='/' element={<PublicRoute />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>

              <Route path='/' element={<PrivateRoute />}>
                <Route path="/" element={<Navigate replace to="dashboard" />}/>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='dashboard/todo' element={<ManageTodo />} />
                <Route path='dashboard/todo/add' element={<AddTodo />} />
                <Route path='dashboard/todo/edit/:id' element={<EditTodo />} />
              </Route>
              
          </Routes>
        {/* </div> */}
    </Router>
  );

}

export default App
