import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth.jsx";
import Index from "./pages/Index.jsx";
import SalesmanDashboard from "./pages/SalesmanDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

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
      <Route
        path="/admin-dashboard"
        element={
          <RequireAuth allowedRoles={['admin']}>
            <AdminDashboard />
          </RequireAuth>
        }
      />
      </Routes>
    </Router>
  );
}

export default App;
