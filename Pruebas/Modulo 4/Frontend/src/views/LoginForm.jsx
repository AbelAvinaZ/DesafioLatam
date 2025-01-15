import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import useInput from '../hooks/UseInput';


export default function LoginForm() {
    // navigate hook
    const navigate = useNavigate();

    // login from usercontext
    const { login } = useContext(UserContext);

    // Form states with custom hook
    const email = useInput("");
    const password = useInput("");

    //error and success state
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // Function to validate form before submitting
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate fields
        if (!email.value.trim() || !password.value.trim()) {
            setError(true);
            setErrorMessage("All fields are obligatory! 🚫");
            hideErrorAfterDelay();
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError(true);
            setErrorMessage("Password needs to be at least 6 characters long!");
            hideErrorAfterDelay();
            return;
        }

        try {
            await login(email, password);
            navigate("/profile");
        } catch (e) {
            setError(true);
            setErrorMessage(error.message || "Invalid credentials. Please try again.");
            hideErrorAfterDelay();
            console.error(e)
        }
    };

    // Function to hide error after a delay
    const hideErrorAfterDelay = () => {
        setTimeout(() => {
            setError(false);
            setErrorMessage("");
        }, 3000); // 3 seconds
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sing in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleLogin}
                        >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                    {...email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...password}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
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