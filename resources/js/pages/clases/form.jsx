import { AdminLayout } from "../../components/admin-layout";
import { SportsClassForm } from "../../components/clases/clases-form";

export default function formClases (){
    return (
       <AdminLayout>
        <div className="max-w-7xl mx-auto">
            <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Nueva Clase</h1>
            <p className="text-gray-600 mt-1">Completa el formulario para dar de alta una nueva clase deportiva</p>
            </div>
            <SportsClassForm />
        </div>
        </AdminLayout>
    )
}