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
            nombre: 'Natación',
            codigo: 'NAT-001',
            siglas: 'NAT',
            costo: '$800.00',
            estado: 'Activo',
        },
        {
            id: 2,
            nombre: 'Fútbol',
            codigo: 'FUT-001',
            siglas: 'FUT',
            costo: '$600.00',
            estado: 'Activo',
        },
        {
            id: 3,
            nombre: 'Basquetbol',
            codigo: 'BAS-001',
            siglas: 'BAS',
            costo: '$650.00',
            estado: 'Activo',
        },
        {
            id: 4,
            nombre: 'Volleyball',
            codigo: 'VOL-001',
            siglas: 'VOL',
            costo: '$550.00',
            estado: 'Inactivo',
        },
        {
            id: 5,
            nombre: 'Tennis',
            codigo: 'TEN-001',
            siglas: 'TEN',
            costo: '$900.00',
            estado: 'Activo',
        },
    ]);

    const columns = [
        {
            field: 'siglas',
            headerName: 'Siglas',
            flex: 1,
            minWidth: 80,
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            flex: 1,
            minWidth: 100,
        },
        {
            field: 'costo',
            headerName: 'Costo Mensual',
            flex: 1,
            minWidth: 100,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 120,
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
                        Gestión de Disciplinas
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Administra todas las disciplinas del sistema
                    </p>
                </div>
                <Link href="disciplinas/crear">
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
                        Crear disciplina
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
