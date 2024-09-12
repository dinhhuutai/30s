import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from '~/layouts/DefaultLayout';
import { routes } from './routes';
import config from './config';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={config.routes.dashboard} />} />
                {routes.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <DefaultLayout>
                                    <route.component />
                                </DefaultLayout>
                            }
                        />
                    );
                })}

                <Route path="*" element={<Navigate to={config.routes.dashboard} />} />
            </Routes>
        </Router>
    );
}

export default App;
