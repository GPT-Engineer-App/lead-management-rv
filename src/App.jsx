import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth.jsx";
import Index from "./pages/Index.jsx";
import SalesmanDashboard from "./pages/SalesmanDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth allowedRoles={['salesman', 'admin']}>
            <SalesmanDashboard />
          </RequireAuth>
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
