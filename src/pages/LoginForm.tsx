import { useState } from "react";
import type { UserCredentials } from "../interfaces/auth";
import { authService } from "../services/authService";

const initialLoginState: UserCredentials = {
	email: "",
	password: "",
	rememberMe: false,
};

const LoginForm = () => {
	const [credentials, setCredentials] =
		useState<UserCredentials>(initialLoginState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target;
		const inputValue = type === "checkbox" ? checked : value;

		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[name]: inputValue,
		}));
	};

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();
		try {
			const response = await authService(credentials);
			const authToken = response.accessToken;

			if (credentials.rememberMe) {
				localStorage.setItem("authToken", authToken);
			} else {
				console.log(response);
				sessionStorage.setItem("authToken", authToken);
			}

			// TODO: redirect user to adverts page
		} catch (error) {
			console.log("Uh! Oh!", error);
		}
	};

	return (
		<section
			className="
    min-h-screen flex items-center justify-center
    bg-gray-100 dark:bg-gray-900"
		>
			<form
				className="
          bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl
          flex flex-col gap-5 w-full max-w-sm
        "
				onSubmit={handleSubmit}
			>
				<h3 className="text-2xl font-bold text-gray-500 dark:text-white text-center mb-6">
					Please Login
				</h3>
				<div className="flex flex-col gap-2">
					<label
						className="
              bg-green-700 text-white
              py-2 px-4 rounded-md font-semibold text-sm uppercase
            "
						htmlFor="email"
					>
						Email:
					</label>
					<input
						className="p-3 border border-gray-300 rounded-md
          text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
          dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500"
						type="email"
						id="email"
						name="email"
						placeholder="email@example.com"
						required
						autoComplete="email"
						value={credentials.email}
						onChange={handleChange}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label
						className="
          bg-green-700 text-white
            py-2 px-4 rounded-md font-semibold text-sm uppercase"
						htmlFor="password"
					>
						Password:
					</label>
					<input
						className="
            p-3 border border-gray-300 rounded-md
            text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
            dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500"
						type="password"
						id="password"
						name="password"
						placeholder="**********"
						required
						autoComplete="current-password"
						value={credentials.password}
						onChange={handleChange}
					/>
				</div>
				<div className="flex items-center gap-2">
					<input
						className="
            form-checkbox h-5 w-5 text-green-600 rounded
            focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
						type="checkbox"
						id="remember-me"
						name="rememberMe"
						autoComplete="off"
						checked={credentials.rememberMe}
						onChange={handleChange}
					/>
					<label
						className="
           bg-green-700 text-white
            py-1.5 px-3 rounded-md font-semibold text-xs uppercase"
						htmlFor="remember-me"
					>
						Remember me
					</label>
				</div>
				<button
					className="
        bg-green-700 hover:bg-green-700 text-white
        font-bold py-3 px-6 rounded-md
        transition duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75
        dark:bg-green-800 dark:hover:bg-green-900"
					type="submit"
				>
					Login
				</button>
			</form>
		</section>
	);
};

export default LoginForm;
