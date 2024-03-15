import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootLayout } from "./components/pages/RootLayout/RootLayout";
import { HomePage } from "./components/pages/HomePage/HomePage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RootLayout />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
