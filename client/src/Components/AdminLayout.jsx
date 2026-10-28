import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  const adminToken = localStorage.getItem("adminToken");
  const admin = localStorage.getItem("admin");

  if (!adminToken && !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;