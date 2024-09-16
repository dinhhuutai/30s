import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import config from '~/config';
import Login from '~/pages/Login';

import { userSelector } from '~/redux/selectors';

function ProtecteCheckLogin() {
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);

    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    return user.login.currentUser ? <Navigate to={config.routes.dashboard} /> : <Login />;
}

export default ProtecteCheckLogin;
