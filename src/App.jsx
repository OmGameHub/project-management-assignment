import { BrowserRouter } from "react-router-dom";

import MRoutes from "./routes/MRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <MRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
