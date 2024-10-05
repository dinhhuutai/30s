import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import config from '~/config';
import Spinner from 'react-bootstrap/Spinner';

import { userSelector } from '~/redux/selectors';

function ProtecteRouterLogin() {
    const tmp = useSelector(userSelector);
    const [user, setUser] = useState(tmp);

    useEffect(() => {
        setUser(tmp);
    }, [tmp]);

    if (user.login.isFetching) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return user.login.currentUser ? <Outlet /> : <Navigate to={config.routes.login} />;
}

export default ProtecteRouterLogin;
