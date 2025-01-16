import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import UseInput from "../../../hooks/UseInput"
import { UserContext } from '../../../context/UserContext';


export default function RegisterForm() {

    //navigate hook
    const navigate = useNavigate();

    //register from usercontext
    const { register } = useContext(UserContext);

    // custom hook to manage inputs
    const email = UseInput("");
    const password = UseInput("");
    const passwordConfirmation = UseInput("");

    //error and success state
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // Function to validate form before submitting
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!email.value.trim() || !password.value.trim() || !passwordConfirmation.value.trim()) {
            setError(true);
            setErrorMessage("All fields are obligatory! 🚫");
            hideErrorAfterDelay();
            return;
        }

        // Validate password length
        if (password.value.length < 6) {
            setError(true);
            setErrorMessage("Password needs to be at least 6 characters long!");
            hideErrorAfterDelay();
            return;
        }

        // Validate password match
        if (password.value !== passwordConfirmation.value) {
            setError(true);
            setErrorMessage("Passwords do not match! 🚫");
            hideErrorAfterDelay();
            return;
        }

        try {
            await register(email.value, password.value);
            navigate("/profile");
        } catch (e) {
            setError(true);
            setErrorMessage(e.response?.data?.error || "Registration failed. Please try again.");
            hideErrorAfterDelay();
            console.error("Error during registration:", e);
        }
    };

    // Function to hide error after a delay
    const hideErrorAfterDelay = () => {
        setTimeout(() => {
            setError(false);
            setErrorMessage("");
        }, 3000);
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleRegister}
                        >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...email}
                                    placeholder="name@company.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...password}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...passwordConfirmation}
                                    placeholder="••••••••"
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                            {error && (
                                <p className="bg-red-500 font-bold rounded-lg px-5 py-3 text-center text-white">
                                    {errorMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}