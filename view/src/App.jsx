import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.css";
import * as yup from "yup";

export default function App() {
    const registerSchema = yup
        .object({
            username: yup.string().required("Please enter a username!"),
            password: yup.string().required("Please enter a password!"),
            confirmation: yup.string().required("Please confirm your password!")
        })
        .required();

    const loginSchema = yup
        .object({
            username: yup.string().required("Please enter your username!"),
            password: yup.string().required("Please enter your password!")
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: onchange
    });
    const onRegister = (data) => {
        fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => console.log(data.message));
    };

    const {
        register: login,
        handleSubmit: handleLogin,
        formState: { errors: loginErrors }
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: onchange
    });
    const onLogin = (data) =>
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => console.log(data.message));

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Register & Sign in
            </h2>
            <div className="min-h-full flex flex-col gap-10 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="rounded-md shadow-sm border p-5 flex">
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={handleSubmit(onRegister)}>
                        <input
                            className="appearance-none rounded-none relative block
                            placeholder-gray-500 text-gray-900 rounded-t-md 
                            focus:outline-none focus:ring-indigo-500
                            w-full px-3 py-2 border border-gray-300
                            focus:border-indigo-500 focus:z-10 sm:text-sm rounded-b-md"
                            placeholder="Username"
                            {...register("username", { required: true })}
                        />
                        <p className="text-rose-600 font-light text-xs">
                            {errors.username?.message}
                        </p>
                        <input
                            className="appearance-none rounded-none relative block
                            rounded-t-md focus:outline-none focus:ring-indigo-500
                            placeholder-gray-500 text-gray-900 rounded-b-md
                            w-full px-3 py-2 border border-gray-300
                            focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                        <p className="text-rose-600 font-light text-xs">
                            {errors.password?.message}
                        </p>
                        <input
                            className="appearance-none rounded-none relative block
                            rounded-t-md focus:outline-none focus:ring-indigo-500
                            placeholder-gray-500 text-gray-900 rounded-b-md
                            w-full px-3 py-2 border border-gray-300
                            focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            {...register("confirmation", { required: true })}
                        />
                        <p className="text-rose-600 font-light text-xs">
                            {errors.confirmation?.message}
                        </p>
                        <input
                            className="group relative w-full flex justify-center
                            py-2 px-4 border border-transparent text-sm font-medium
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-indigo-500"
                            type="submit"
                            value="Register"
                        />
                    </form>
                </div>
                <div className="rounded-md shadow-sm border p-5 flex">
                    <form onSubmit={handleLogin(onLogin)}>
                        <input
                            className="appearance-none rounded-none relative block
                            placeholder-gray-500 text-gray-900 rounded-t-md 
                            focus:outline-none focus:ring-indigo-500
                            w-full px-3 py-2 border border-gray-300
                            focus:border-indigo-500 focus:z-10 sm:text-sm rounded-b-md mt-6"
                            placeholder="Username"
                            {...login("username", { required: true })}
                        />
                        <p className="text-rose-600 font-light text-xs mt-6">
                            {loginErrors.username?.message}
                        </p>
                        <input
                            className="appearance-none rounded-none relative block
                            placeholder-gray-500 text-gray-900 rounded-t-md 
                            focus:outline-none focus:ring-indigo-500
                            w-full px-3 py-2 border border-gray-300
                            focus:border-indigo-500 focus:z-10 sm:text-sm rounded-b-md mt-6"
                            placeholder="Password"
                            {...login("password", { required: true })}
                        />
                        <p className="text-rose-600 font-light text-xs mt-6">
                            {loginErrors.password?.message}
                        </p>
                        <input
                            className="group relative w-full flex justify-center
                            py-2 px-4 border border-transparent text-sm font-medium
                            rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-indigo-500 mt-6"
                            type="submit"
                            value="Login"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
