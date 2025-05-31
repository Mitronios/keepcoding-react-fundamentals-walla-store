import "./App.css";
import LoginForm from "./pages/LoginForm";

function App() {
	return (
		<main className=" max-w-[1024px] w-[90%] my-0 mx-auto bg">
			<h1 className="text-gray-500 text-2xl">React Walla store</h1>
			<LoginForm />
		</main>
	);
}

export default App;
