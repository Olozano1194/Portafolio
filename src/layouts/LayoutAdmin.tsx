import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
// import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

function LayoutAdmin() {
    return (
        <>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
                <div className="xl:col-span-5">
                    <Header />
                    <main className="bg-surface flex-1 overflow-y-auto pt-16 ">
                        <Outlet />
                    </main>
                    {/* <Footer />                  */}
                </div>
            </div>
        </>
    );
}
export default LayoutAdmin;