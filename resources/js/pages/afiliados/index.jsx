import { Link } from '@inertiajs/react';
import { Add, Assignment, Delete, Edit, Visibility } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { AdminLayout } from '../../components/admin-layout';

export default function indexAfiliados() {
    const [afiliados] = useState([
        {
            id: 1,
            nombre: 'Juan',
            ap_paterno: 'Pérez',
            ap_materno: 'López',
            adicionales: 3,
            curp: 'PEPJ800101HDFLRN01',
            edad: 28,
            sexo: 'Masculino',
            telefono_movil: '5512345678',
            email: 'juan.perez@example.com',
            colonia: 'Centro',
            estado: 'activo',
        },
        {
            id: 2,
            nombre: 'María',
            ap_paterno: 'González',
            ap_materno: 'Ramírez',
            adicionales: 2,
            curp: 'GORM920512MDFRML02',
            edad: 33,
            sexo: 'Femenino',
            telefono_movil: '5523456789',
            email: 'maria.gonzalez@example.com',
            colonia: 'Roma Norte',
            estado: 'activo',
        },
        {
            id: 3,
            nombre: 'Luis',
            ap_paterno: 'Hernández',
            ap_materno: 'Castillo',
            adicionales: 1,
            curp: 'HECL970223HDFRSN03',
            edad: 27,
            sexo: 'Masculino',
            telefono_movil: '5534567890',
            email: 'luis.hernandez@example.com',
            colonia: 'Del Valle',
            estado: 'inactivo',
        },
        {
            id: 4,
            nombre: 'Ana',
            ap_paterno: 'Martínez',
            ap_materno: 'Soto',
            adicionales: 0,
            curp: 'MASA890315MDFTNL04',
            edad: 36,
            sexo: 'Femenino',
            telefono_movil: '5545678901',
            email: 'ana.martinez@example.com',
            colonia: 'Narvarte',
            estado: 'activo',
        },
        {
            id: 5,
            nombre: 'Pedro',
            ap_paterno: 'Sánchez',
            ap_materno: 'Ramírez',
            adicionales: 0,
            curp: 'PESJ900101MDFRML05',
            edad: 40,
            sexo: 'Masculino',
            telefono_movil: '5556789012',
            email: 'pedro.sanchez@example.com',
            colonia: 'Juárez',
            estado: 'activo',
        },
    ]);

    const columns = [
        {
            field: 'nombreCompleto',
            headerName: 'Titular',
            flex: 1.2,
            minWidth: 200,
            valueGetter: (value, row) =>
                `${row.nombre} ${row.ap_paterno} ${row.ap_materno}`,
        },
        {
            field: 'adicionales',
            headerName: 'Adicionales',
            flex:1,
            minWidth: 70,
            align: 'center',
            headerAlign: 'center',

        },
        {
            field: 'curp',
            headerName: 'CURP',
            flex: 1,
            minWidth: 180,
        },
        {
            field: 'edad',
            headerName: 'Edad',
            width: 80,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'sexo',
            headerName: 'Sexo',
            width: 110,
            renderCell: (params) => (
                <Chip
                    label={params.value}
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
            field: 'telefono_movil',
            headerName: 'Teléfono',
            flex: 1,
            minWidth: 130,
        },
        {
            field: 'email',
            headerName: 'Correo Electrónico',
            flex: 1.2,
            minWidth: 200,
        },
        {
            field: 'colonia',
            headerName: 'Colonia',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value === 'activo' ? 'Activo' : 'Inactivo'}
                    size="small"
                    color={params.value === 'activo' ? 'success' : 'default'}
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
                    <Tooltip title="Ver asignaciones">
                        <Link href="/afiliados/asignaciones">
                            <IconButton size="small" color="primary">
                                <Assignment fontSize="small" />
                            </IconButton>
                        </Link>
                    </Tooltip>
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
                        Gestión de Afiliados
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Administra todas los afiliados del sistema
                    </p>
                </div>
                <Link href="afiliados/crear">
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
                        Crear Afiliado
                    </Button>
                </Link>
            </div>
            <div className="p-6">
                <DataGrid
                    rows={afiliados}
                    columns={columns}
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
