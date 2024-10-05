import { Link } from 'react-router-dom';
import config from '~/config';

function HeaderLogo() {
    return (
        <div className="flex justify-center items-center px-[24px] w-[var(--admin-width-sidebar)] h-full">
            <h2>
                <Link
                    to={config.routes.adminAnalytics}
                    className="text-[26px] hover:text-[var(--color-logo-hover)] text-[var(--color-logo)] uppercase font-[620]"
                >
                    10s.biz
                </Link>
            </h2>
        </div>
    );
}

export default HeaderLogo;
