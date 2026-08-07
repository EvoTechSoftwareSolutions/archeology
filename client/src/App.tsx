import AppRoutes from "./routes/AppRoutes";
import { NotificationProvider } from "./contexts/NotificationContext";
import { SearchProvider } from "./contexts/SearchContext";

function App() {
  return (
    <NotificationProvider>
      <SearchProvider>
        <AppRoutes />
      </SearchProvider>
    </NotificationProvider>
  );
}

export default App;