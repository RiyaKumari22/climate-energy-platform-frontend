import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Climate from "./pages/Climate";
import Energy from "./pages/Energy";
import Power from "./pages/Power";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import AddDataset from "./pages/AddDataset";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ManageAdmins from "./pages/ManageAdmins";
import EditDataset from "./pages/EditDataset";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/climate"
            element={<Climate />}
          />

          <Route
            path="/energy"
            element={<Energy />}
          />

          <Route
            path="/power"
            element={<Power />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          {/* =========================
              ADMIN ROUTES
          ========================== */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={["ADMIN", "SUPER_ADMIN"]}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-dataset"
            element={
              <ProtectedRoute
                allowedRoles={["ADMIN", "SUPER_ADMIN"]}
              >
                <AddDataset />
              </ProtectedRoute>
            }
          />

          {/* =========================
              SUPER ADMIN ROUTES
          ========================== */}

          <Route
            path="/super-admin"
            element={
              <ProtectedRoute
                allowedRoles={["SUPER_ADMIN"]}
              >
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/admins"
            element={
              <ProtectedRoute
                allowedRoles={["SUPER_ADMIN"]}
              >
                <ManageAdmins />
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/datasets/:id/edit"
            element={
              <ProtectedRoute
                allowedRoles={["SUPER_ADMIN"]}
              >
                <EditDataset />
              </ProtectedRoute>
            }
          />

        </Routes>
          <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;