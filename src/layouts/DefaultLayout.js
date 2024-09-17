import Header from './components/Header';
import Notice from './components/Notice';
import Sidebar from './components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="">
            <div
                className={`w-[var(--width-sidebar)] fixed top-[0px] left-[0px] bottom-[0px] bg-[var(--color-white)] text-[var(--color-text-sidebar)]`}
            >
                <Sidebar />
            </div>
            <div className="ml-[var(--width-sidebar)]">
                <div className="h-[var(--height-header)] fixed top-[0px] left-[var(--width-sidebar)] right-[0px] z-[9999] bg-[var(--bg-color-header)] text-[var(--color-text-header)]">
                    <Header />
                </div>
                <div className="mt-[var(--height-header)]  min-h-[var(--min-h-page)] bg-[var(--bg-color-page)] p-[20px]">
                    {children}
                </div>
            </div>
            <Notice />
        </div>
    );
}

export default DefaultLayout;
