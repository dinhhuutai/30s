import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '~/redux/selectors';
import { useEffect, useState } from 'react';
import setAuthToken from '~/middlewares/setAuthToken';
import axios from 'axios';
import authSlice from '~/redux/slices/authSlice';

import { jwtDecode } from 'jwt-decode';

// refresh Token
export let axiosJWT;

function ProtectedCheckUser() {
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);
    const dispatch = useDispatch();

    const Token = () => {
        axiosJWT = axios.create({
            withCredentials: true, //mang theo cookie
            baseURL: 'http://localhost:5000/', //địa chỉ của BE
        });

        axiosJWT.interceptors.request.use(
            async (config) => {
                let date = new Date();

                const decodeToken = jwtDecode(user.login.accessToken);
                if (decodeToken.exp < date.getTime() / 1000) {
                    const data = await refreshToken();

                    if (data.success) {
                        dispatch(authSlice.actions.refreshToken(data.accessToken));
                        config.headers['Authorization'] = `Bearer ${data.accessToken}`;
                    } else {
                        dispatch(authSlice.actions.checkUserError());
                        setAuthToken(null);
                    }
                }

                return config;
            },
            (err) => {
                return Promise.reject(err);
            },
        );

        const refreshToken = async () => {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/v1/user/refresh`,
                    (axios.defaults.withCredentials = true),
                );

                return res.data;
            } catch (error) {
                console.log(error);
            }
        };
    };

    // Check User
    const checkUser = async () => {
        if (user.login.accessToken) {
            setAuthToken(user.login.accessToken);
        }

        try {
            const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/v1/user/check`, {
                headers: { Authorization: `Bearer ${user.login.accessToken}` },
            });

            if (res.data.success) {
                dispatch(authSlice.actions.checkUser(res.data.user));
            } else {
                dispatch(authSlice.actions.checkUserError());
                setAuthToken(null);
            }
        } catch (error) {
            dispatch(authSlice.actions.checkUserError());
            setAuthToken(null);
        }
    };

    const location = useLocation();
    useEffect(() => {
        Token();

        checkUser();
    }, [location]);

    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    return <Outlet />;
}

export default ProtectedCheckUser;
