import "./App.css";
import Navbar from "./components/layout/navBar";
import Adverts from "./pages/Adverts";

function App() {
	return (
		<main
			className=" max-w-[1024px] w-[90%] my-0 mx-auto
    bg-gray-100"
		>
			<Navbar />
			<Adverts />
		</main>
	);
}

export default App;
