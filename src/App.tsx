import { AppProvider } from "@/context/AppContext";
import AppRoutes from "./routes/AppRoute";

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
