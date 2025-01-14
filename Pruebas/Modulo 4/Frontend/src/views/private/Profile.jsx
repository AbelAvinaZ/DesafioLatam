import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

export const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/me",
                    {
                        method: "GET",  //can erase the method, its already explicit in the axios
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            cart: carrito,
                        })
                    });
                setUser(res.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    alert("Acceso no válido. Por favor, inicia sesión.");
                    navigate("/login");
                } else {
                    console.error("Error al obtener los datos del usuario:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            getData();
        } else {
            alert("Token no encontrado. Por favor, inicia sesión.");
            navigate("/login");
        }
    }, [navigate]);

    if (loading)
        return <LoadingSpinner />

    return (
        <div className="relative flex flex-col min-h-screen w-full min-w-0 mb-6 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable">
            {/* <!-- card body --> */}
            <div className="px-9 pt-9 flex-auto min-h-[70px] pb-0 bg-transparent">
                <div className="flex flex-wrap mb-6 xl:flex-nowrap">
                    <div className="mb-5 mr-5">
                        <div className="relative inline-block shrink-0 rounded-2xl">
                            <img className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px]" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg" alt="image" />
                            <div className="group/tooltip relative">
                                <span className="w-[15px] h-[15px] absolute bg-success rounded-full bottom-0 end-0 -mb-1 -mr-2  border border-white"></span>
                                <span className="text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform bg-white rounded-2xl shadow-sm bottom-0 -mb-2 start-full ml-4 font-medium text-secondary-inverse group-hover/tooltip:opacity-100 opacity-0 block"> Status: Active </span>
                            </div>
                        </div>
                    </div>
                    <div className="grow">
                        <div className="flex flex-wrap items-start justify-between mb-2">
                            <div className="flex flex-col">
                                <div className="flex items-center mb-2">
                                    <a className="text-secondary-inverse hover:text-blue transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1" href="javascript:void(0)"> Alec Jhonson </a>
                                </div>
                                <div className="flex flex-wrap pr-2 mb-4 font-medium">
                                    <a className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-blue" href="javascript:void(0)">
                                        <span className="mr-1">
                                            📍
                                        </span> New York, NY </a>
                                    <a className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-blue" href="javascript:void(0)">
                                        <span className="mr-1">
                                            ✉️
                                        </span> {user.email} </a>
                                </div>
                            </div>
                            <div className="flex flex-wrap my-auto">
                                <a href="javascript:void(0)" className="inline-block px-6 py-3 mr-3 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl text-muted  bg-neutral-100 hover:bg-neutral-200 active:bg-light-dark focus:bg-light-dark "> Follow </a>
                                <a href="javascript:void(0)" className="inline-block px-6 py-3 text-base font-medium leading-normal text-center text-white align-middle transition-colors duration-150 ease-in-out border-0 shadow-none cursor-pointer rounded-2xl bg-blue-500 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-dark "> Hire </a>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <div className="flex flex-wrap items-center">
                                <a href="javascript:void(0)" className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 320 Following </a>
                                <a href="javascript:void(0)" className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 2.5k Followers </a>
                                <a href="javascript:void(0)" className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal"> 48 Deals </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="w-full h-px border-neutral-200" />
                <ul className="group flex flex-wrap items-stretch text-[1.15rem] font-semibold list-none border-b-2 border-transparent border-solid active-assignments">
                    <li className="flex mt-2 -mb-[2px]">
                        <a aria-controls="summary" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent hover:font-bold hover:border-blue-400" href="javascript:void(0)"> Summary </a>
                    </li>
                    <li className="flex mt-2 -mb-[2px]">
                        <a aria-controls="assignments" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent hover:font-bold hover:border-blue-400" href="javascript:void(0)"> Assignments </a>
                    </li>
                    <li className="flex mt-2 -mb-[2px]">
                        <a aria-controls="marketing" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent hover:font-bold hover:border-blue-400" href="javascript:void(0)"> Marketing </a>
                    </li>
                    <li className="flex mt-2 -mb-[2px]">
                        <a aria-controls="followers" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent hover:font-bold hover:border-blue-400" href="javascript:void(0)"> Followers </a>
                    </li>
                    <li className="flex mt-2 -mb-[2px] group">
                        <a aria-controls="history" className="py-5 mr-1 sm:mr-3 lg:mr-10 transition-colors duration-200 ease-in-out border-b-2 border-transparent hover:font-bold hover:border-blue-400" href="javascript:void(0)"> History </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}