import { AdminLayout } from '../../components/admin-layout';
import { DisciplineForm } from '../../components/disciplinas/disciplina-form';


export default function createAfiliados() {
    return (
        <AdminLayout>
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Nueva Disciplina
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Completa el formulario para dar de alta una nueva
                        disciplina
                    </p>
                </div>
                <DisciplineForm />
            </div>
        </AdminLayout>
    );
}
