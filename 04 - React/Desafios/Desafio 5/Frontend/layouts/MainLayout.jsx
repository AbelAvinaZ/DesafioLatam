import Footer from "../src/components/Footer/Footer";
import PizzeriaNavbar from "../src/components/Navbar/PizzeriaNavbar";



export const MainLayout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col justify-between">
            <PizzeriaNavbar />
            {children}
            <Footer />
        </div>
    );
}