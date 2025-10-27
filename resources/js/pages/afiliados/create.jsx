import { AdminLayout } from '../../components/admin-layout';
import { AffiliateForm } from '../../components/afiliado/afiliado-form';

export default function createAfiliados() {
    return (
        <AdminLayout>
            <div className="mx-auto max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Nuevo Trabajador
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Completa el formulario para dar de alta un nuevo
                        trabajador
                    </p>
                </div>
                <AffiliateForm />
            </div>
        </AdminLayout>
    );
}
