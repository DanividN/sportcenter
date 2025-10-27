import { AdminLayout } from "../../components/admin-layout";
import { PlansManagement } from "../../components/planes/planes";

export default function PlanesIndex() {
    return (
       <AdminLayout>
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Gestión de Planes
              </h1>
              <p className="mt-1 text-gray-600">
                Administra todas las clases deportivas del sistema
              </p>
            </div>
            <PlansManagement />
          </div>
       </AdminLayout>
    );
}
