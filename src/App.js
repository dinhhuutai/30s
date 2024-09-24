import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout';
import { routes } from './routes';
import config from './config';
import ProtectedCheckUser from './routing/ProtectedCheckUser';
import ProtecteRouterLogin from './routing/ProtecteRouterLogin';
import ProtecteCheckLogin from './routing/ProtecteCheckLogin';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedCheckUser />}>
                    <Route path="/" element={<Navigate to={config.routes.dashboard} />} />
                    <Route path="/login" element={<ProtecteCheckLogin />} />
                    <Route path="/register" element={<Register />} />

                    {routes.map((route, index) => {
                        return (
                            route.login && (
                                <Route path="/" element={<ProtecteRouterLogin />}>
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            route.isPageLogin ? (
                                                <route.component />
                                            ) : (
                                                <DefaultLayout>
                                                    <route.component />
                                                </DefaultLayout>
                                            )
                                        }
                                    />
                                </Route>
                            )
                        );
                    })}

                    <Route path="*" element={<Navigate to={config.routes.dashboard} />} />
                </Route>

                {/* {routes.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.isPageLogin ? (
                                    <route.component />
                                ) : (
                                    <DefaultLayout>
                                        <route.component />
                                    </DefaultLayout>
                                )
                            }
                        />
                    );
                })} */}
            </Routes>
        </Router>
    );
}

export default App;
