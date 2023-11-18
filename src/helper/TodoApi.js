import Axios from 'axios';
import AuthCookie from './AuthCookie';

const TodoApi = Axios.create({
    baseURL:'http://localhost:8000/api/todo/',
    headers : {
        'Authorization' : 'Bearer ' + AuthCookie,
    }
});

export default TodoApi