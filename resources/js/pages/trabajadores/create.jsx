import { AdminLayout } from "../../components/admin-layout";
import { WorkerForm } from "../../components/trabajador/trabajador-form";

export default function createTrabajador (){
    return (
       <AdminLayout>
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Trabajador</h1>
            <p className="text-gray-600 mt-1">Completa el formulario para dar de alta un nuevo trabajador</p>
            </div>
            <WorkerForm />
        </div>
        </AdminLayout>
    )
}
