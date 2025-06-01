import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navBar";
import Adverts from "./pages/Adverts";
import LoginForm from "./pages/LoginForm";
import { RequireAuth } from "./auth/RequireAuth";
import AdvertDetail from "./pages/AdvertDetail";
import NewAdvertPage from "./pages/NewAdvertPage";
import NotFound from "./pages/Notfound";

function App() {
	return (
		<>
			<Navbar />
			<main
				className=" max-w-[1024px] w-[90%] my-0 mx-auto
    bg-gray-100"
			>
				<Routes>
					<Route
						path="/login"
						element={<LoginForm />}
					/>
					<Route
						path="/adverts"
						element={
							<RequireAuth>
								<Adverts />
							</RequireAuth>
						}
					/>
					<Route
						path="/adverts/:id"
						element={
							<RequireAuth>
								<AdvertDetail />
							</RequireAuth>
						}
					/>
					<Route
						path="/adverts/new-advert"
						element={
							<RequireAuth>
								<NewAdvertPage />
							</RequireAuth>
						}
					/>
					<Route
						path="/not-found"
						element={<NotFound />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</main>
		</>
	);
}

export default App;
