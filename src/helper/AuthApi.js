import Axios from 'axios';

const AuthApi = Axios.create({
    baseURL:'http://localhost:8000/api/auth/'
});

export default AuthApi