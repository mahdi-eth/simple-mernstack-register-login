import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
        }).then((response) => response.json()).then((data) => console.log(data.message));;
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
        }).then((response) => response.json()).then((data) => console.log(data.message));;

    return (
        <>
            <form onSubmit={handleSubmit(onRegister)}>
                <input {...register("username", { required: true })} />
                <p>{errors.username?.message}</p>
                <input {...register("password", { required: true })} />
                <p>{errors.password?.message}</p>
                <input {...register("confirmation", { required: true })} />
                <p>{errors.confirmation?.message}</p>
                <input type="submit" value="Register" />
            </form>
            <br />
            <form onSubmit={handleLogin(onLogin)}>
                <input {...login("username", { required: true })} />
                <p>{loginErrors.username?.message}</p>
                <input {...login("password", { required: true })} />
                <p>{loginErrors.password?.message}</p>
                <input type="submit" value="Login" />
            </form>
        </>
    );
}
