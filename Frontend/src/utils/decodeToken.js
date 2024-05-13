import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie";

export const decodeToken =() => {
    const token = Cookies.get('session-auth-access');
    if (token) {
        const decoded = jwtDecode(token);
        return decoded;
    }
}