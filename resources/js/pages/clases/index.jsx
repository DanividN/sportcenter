import { Link } from '@inertiajs/react';
import { Add, Visibility } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { AdminLayout } from '../../components/admin-layout';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit } from 'lucide-react';

export default function index() {
    const [classes] = useState([
        {
            id: 1,
            nombre: 'Natación Principiantes',
            disciplina: 'Natación',
            instructor: 'Carlos Martínez',
            nivel: 'Principiante',
            cupo: 15,
            duracion: 60,
            horarios: 'Lun, Mié, Vie - 08:00 , 11:00, 16:00',
            estado: 'Activa',
        },
        {
            id: 2,
            nombre: 'Fútbol Avanzado',
            disciplina: 'Fútbol',
            instructor: 'Ana García',
            nivel: 'Avanzado',
            cupo: 20,
            duracion: 90,
            horarios: 'Mar, Jue - 08:00, 16:00',
            estado: 'Activa',
        },
        {
            id: 3,
            nombre: 'Basquetbol Intermedio',
            disciplina: 'Basquetbol',
            instructor: 'Luis Rodríguez',
            nivel: 'Intermedio',
            cupo: 12,
            duracion: 75,
            horarios: 'Lun, Mié - 18:00',
            estado: 'Activa',
        },
        {
            id: 4,
            nombre: 'Tennis Individual',
            disciplina: 'Tennis',
            instructor: 'María López',
            nivel: 'Avanzado',
            cupo: 8,
            duracion: 60,
            horarios: 'Sáb - 10:00',
            estado: 'Inactiva',
        },
        {
            id: 5,
            nombre: 'Volleyball Competitivo',
            disciplina: 'Volleyball',
            instructor: 'Pedro Sánchez',
            nivel: 'Competitivo',
            cupo: 18,
            duracion: 120,
            horarios: 'Vie - 19:00',
            estado: 'Activa',
        },
    ]);

    const columns = [
        {
            field: 'nombre',
            headerName: 'Nombre de la Clase',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'disciplina',
            headerName: 'Disciplina',
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        fontWeight: 500,
                    }}
                />
            ),
        },
        {
            field: 'instructor',
            headerName: 'Instructor',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'nivel',
            headerName: 'Nivel',
            width: 130,
            renderCell: (params) => {
                const colors = {
                    Principiante: { bg: '#e8f5e9', color: '#2e7d32' },
                    Intermedio: { bg: '#fff3e0', color: '#e65100' },
                    Avanzado: { bg: '#fce4ec', color: '#c2185b' },
                    Competitivo: { bg: '#f3e5f5', color: '#7b1fa2' },
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
            field: 'cupo',
            headerName: 'Cupo',
            width: 80,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'duracion',
            headerName: 'Duración',
            width: 100,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => `${params.value} min`,
        },
        {
            field: 'horarios',
            headerName: 'Horarios',
            flex: 1,
            minWidth: 180,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 110,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'Activa' ? 'success' : 'default'}
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
                        Gestión de Clases
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Administra todas las clases deportivas del sistema
                    </p>
                </div>
                <Link href="clases/crear">
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
                        Crear Clase
                    </Button>
                </Link>
            </div>
            <div className="p-6">
                <DataGrid
                    rows={classes}
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
