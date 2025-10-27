import { Link } from "@inertiajs/react";
import Button from "@mui/material/Button";
import { AdminLayout } from "../../components/admin-layout";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function indexTrabajadores() {
    const workersRows = [
        {
            id: 1,
            nombre: 'Carlos',
            ap_paterno: 'Martínez',
            ap_materno: 'López',
            sexo: 'Masculino',
            edad: 32,
            telefono: '555-1234',
            tipo: 'Instructor',
            profesion: 'Entrenador de Natación',
            direccion: 'Av. Principal 123, Col. Centro',
            codigo_postal: '12345',
            estado: 'Activo',
        },
        {
            id: 2,
            nombre: 'Ana',
            ap_paterno: 'García',
            ap_materno: 'Rodríguez',
            sexo: 'Femenino',
            edad: 28,
            telefono: '555-5678',
            tipo: 'Instructor',
            profesion: 'Entrenadora de Fútbol',
            direccion: 'Calle Reforma 456, Col. Norte',
            codigo_postal: '12346',
            estado: 'Activo',
        },
        {
            id: 3,
            nombre: 'Luis',
            ap_paterno: 'Rodríguez',
            ap_materno: 'Sánchez',
            sexo: 'Masculino',
            edad: 35,
            telefono: '555-9012',
            tipo: 'Instructor',
            profesion: 'Entrenador de Basquetbol',
            direccion: 'Blvd. Juárez 789, Col. Sur',
            codigo_postal: '12347',
            estado: 'Activo',
        },
        {
            id: 4,
            nombre: 'María',
            ap_paterno: 'López',
            ap_materno: 'Hernández',
            sexo: 'Femenino',
            edad: 26,
            telefono: '555-3456',
            tipo: 'Recepcionista',
            profesion: 'Administración',
            direccion: 'Calle Hidalgo 321, Col. Centro',
            codigo_postal: '12345',
            estado: 'Activo',
        },
        {
            id: 5,
            nombre: 'Pedro',
            ap_paterno: 'Sánchez',
            ap_materno: 'Ramírez',
            sexo: 'Masculino',
            edad: 40,
            telefono: '555-7890',
            tipo: 'Instructor',
            profesion: 'Entrenador de Volleyball',
            direccion: 'Av. Insurgentes 654, Col. Este',
            codigo_postal: '12348',
            estado: 'Inactivo',
        },
        {
            id: 6,
            nombre: 'Laura',
            ap_paterno: 'Fernández',
            ap_materno: 'Torres',
            sexo: 'Femenino',
            edad: 29,
            telefono: '555-2468',
            tipo: 'Mantenimiento',
            profesion: 'Técnico de Instalaciones',
            direccion: 'Calle Morelos 147, Col. Oeste',
            codigo_postal: '12349',
            estado: 'Activo',
        },
    ];

    const workersColumns = [
        {
            field: 'nombreCompleto',
            headerName: 'Nombre Completo',
            flex: 1,
            minWidth: 200,
            valueGetter: (value, row) =>
                `${row.nombre} ${row.ap_paterno} ${row.ap_materno}`,
        },
        {
            field: 'tipo',
            headerName: 'Tipo',
            width: 140,
            renderCell: (params) => {
                const colors = {
                    Instructor: { bg: '#e3f2fd', color: '#1976d2' },
                    Recepcionista: { bg: '#f3e5f5', color: '#7b1fa2' },
                    Mantenimiento: { bg: '#fff3e0', color: '#e65100' },
                    Administrativo: { bg: '#e8f5e9', color: '#2e7d32' },
                };
                const style = colors[params.value] || {
                    bg: '#f5f5f5',
                    color: '#616161',
                };
                return (
                    <Chip
                        label={params.value}
                        size="small"
                        sx={{
                            backgroundColor: style.bg,
                            color: style.color,
                            fontWeight: 500,
                        }}
                    />
                );
            },
        },
        {
            field: 'profesion',
            headerName: 'Profesión',
            flex: 1,
            minWidth: 180,
        },
        {
            field: 'sexo',
            headerName: 'Sexo',
            width: 100,
            renderCell: (params) => (
                <Chip
                    label={params.value === 'Masculino' ? 'M' : 'F'}
                    size="small"
                    sx={{
                        backgroundColor:
                            params.value === 'Masculino'
                                ? '#e3f2fd'
                                : '#fce4ec',
                        color:
                            params.value === 'Masculino'
                                ? '#1976d2'
                                : '#c2185b',
                        fontWeight: 500,
                    }}
                />
            ),
        },
        {
            field: 'edad',
            headerName: 'Edad',
            width: 80,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'telefono',
            headerName: 'Teléfono',
            width: 130,
        },
        {
            field: 'direccion',
            headerName: 'Dirección',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 110,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'Activo' ? 'success' : 'default'}
                    sx={{ fontWeight: 500 }}
                />
            ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 140,
            sortable: false,
            renderCell: (params) => (
                <div className="flex gap-1">
                    <Tooltip title="Ver detalles">
                        <IconButton size="small" color="primary">
                            <Visibility fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                        <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <IconButton size="small" color="error">
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Gestión de Trabajadores
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Administra todas las trabajadoras del sistema
                    </p>
                </div>
                <Link href="trabajadores/crear">
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        sx={{
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                            textTransform: 'none',
                            fontWeight: 600,
                            paddingX: 3,
                            paddingY: 1.5,
                        }}
                    >
                        Crear Trabajador
                    </Button>
                </Link>
            </div>
            <div className="p-6">
                <DataGrid
                    rows={workersRows}
                    columns={workersColumns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #f0f0f0',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f8f9fa',
                            borderBottom: '2px solid #e0e0e0',
                            fontWeight: 600,
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                />
            </div>
        </AdminLayout>
    );
}
