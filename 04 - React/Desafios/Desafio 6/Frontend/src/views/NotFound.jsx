import {Link} from "react-router"

export const NotFound = () => {
    
    return ( 
        <div className="text-center">
            <p className="font-bold mb-3">
                The route you are looking for doesn´t exist... 
            </p>
            <Link
                to="/"
                className="rounded px-3 py-1 bg-blue-300 font-semibold"
            >
                Home
            </Link>

        </div>
     );
}