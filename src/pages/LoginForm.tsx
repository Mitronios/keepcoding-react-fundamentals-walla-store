import { useState } from "react";
import type { UserCredentials } from "../interfaces/auth";

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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		console.log(credentials);
	};

	return (
		<section>
			<h3>Please Login</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="email@example.com"
					required
					value={credentials.email}
					onChange={handleChange}
				/>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="**********"
					required
					value={credentials.password}
					onChange={handleChange}
				/>
				<input
					type="checkbox"
					id="remember-me"
					name="rememberMe"
					checked={credentials.rememberMe}
					onChange={handleChange}
				/>
				<label htmlFor="remember-me">Remember me</label>
				<button type="submit">Login</button>
			</form>
		</section>
	);
};

export default LoginForm;
