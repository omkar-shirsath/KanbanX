import React from 'react'

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const JWTAuth = () => {
    const token = Cookies.get('token');
    if (!token) {
        console.error('Token not found in cookies');
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export default JWTAuth