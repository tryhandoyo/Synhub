import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const token = Cookies.get('token');
    const name = Cookies.get('name');
    const phone = Cookies.get('phone');
    const role = Cookies.get('role');

    if(!token) {
        // console.log(token);
        return <Navigate to='/login' replace/>
    }

    return children
}

export default PrivateRoutes