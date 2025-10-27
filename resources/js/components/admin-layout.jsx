import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminSidebar } from './admin-sidebar';
import { AdminTopbar } from './admin-topbar';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export function AdminLayout({ children }) {
    const { successMessage, errorMessage } = usePage().props;

    useEffect(() => {
        if (successMessage) toast.success(successMessage);
        if (errorMessage) toast.error(errorMessage);
    }, [successMessage, errorMessage]);
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick={false}
                toastClassName="toast"
            />
            <div className="min-h-screen bg-gray-50">
                <AdminSidebar />
                <AdminTopbar />
                <main className="mt-16 ml-64 p-6">{children}</main>
            </div>
        </>
    );
}
