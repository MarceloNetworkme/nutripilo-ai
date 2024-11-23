import { AppRoute } from "./app.route";
import { AppProvider } from "./app.provider";
import { AppService } from "./app.service";
import { BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "../theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../infra/configs/query.config";

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<AppProvider>
					<AppService>
						<BrowserRouter>
							<AppRoute />
						</BrowserRouter>
					</AppService>
				</AppProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
