import Footer from "../src/components/Footer/Footer";
import PizzeriaNavbar from "../src/components/Navbar/PizzeriaNavbar";


// se utiliza children por que acepta un componente hijo que es el que se renderizara
export const MainLayout = ({ children }) => {
    return (
        <div className="h-screen flex flex-col justify-between">
            <PizzeriaNavbar />
            {children}
            <Footer />
        </div>
    );
}