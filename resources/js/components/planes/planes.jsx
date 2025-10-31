import {
    Close,
    Description,
    History,
    Payment,
    PersonOff,
    Refresh,
    Search,
    UploadFile,
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export function PlansManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAffiliate, setSelectedAffiliate] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState(''); // 'renew', 'payment', 'history'
    const [additionalUsers, setAdditionalUsers] = useState([]);
    const [extraDiscountPercent, setExtraDiscountPercent] = useState(0);
    const [requiresInvoice, setRequiresInvoice] = useState('no');
    const [paymentAmount, setPaymentAmount] = useState(0);

    const affiliates = [
        {
            id: 1,
            affiliateId: 'AF001',
            name: 'Juan Pérez García',
            photo: '/hombre.png',
            email: 'juan.perez@email.com',
            phone: '555-1234',
            status: 'Activo',
            startDate: '2024-01-15',
            endDate: '2024-07-15',
            assignedDisciplines: [
                {
                    name: 'Natación',
                    classes: [
                        {
                            name: 'Natación Principiante - Lunes 8:00 AM',
                            instructor: 'Carlos Ruiz',
                            price: 400,
                        },
                        {
                            name: 'Natación Principiante - Miércoles 8:00 AM',
                            instructor: 'Carlos Ruiz',
                            price: 400,
                        },
                    ],
                },
                {
                    name: 'Fútbol',
                    classes: [
                        {
                            name: 'Fútbol Intermedio - Martes 10:00 AM',
                            instructor: 'Luis Torres',
                            price: 600,
                        },
                    ],
                },
            ],
            additionalUsers: [
                {
                    id: 1,
                    name: 'María Pérez',
                    relation: 'Hija',
                    active: true,
                    disciplines: [
                        {
                            name: 'Natación',
                            classes: [
                                {
                                    name: 'Natación Principiante - Lunes 8:00 AM',
                                    price: 400,
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Pedro Pérez',
                    relation: 'Hijo',
                    active: true,
                    disciplines: [
                        {
                            name: 'Fútbol',
                            classes: [
                                {
                                    name: 'Fútbol Principiante - Martes 10:00 AM',
                                    price: 500,
                                },
                            ],
                        },
                    ],
                },
            ],
            paymentHistory: [
                {
                    date: '2024-12-01',
                    amount: 2300,
                    method: 'Tarjeta',
                    status: 'Pagado',
                    invoice: 'factura-001.pdf',
                },
                {
                    date: '2024-11-01',
                    amount: 2300,
                    method: 'Efectivo',
                    status: 'Pagado',
                    invoice: null,
                },
                {
                    date: '2024-10-01',
                    amount: 2300,
                    method: 'Transferencia',
                    status: 'Pagado',
                    invoice: 'factura-002.pdf',
                },
            ],
            paymentStatus: 'Al corriente',
            lastPayment: '2024-12-01',
            nextPayment: '2025-01-01',
            packageDiscount: 10,
        },
        {
            id: 2,
            affiliateId: 'AF002',
            name: 'Ana Martínez López',
            photo: '/mujer-sonriente.png',
            email: 'ana.martinez@email.com',
            phone: '555-5678',
            status: 'Por vencer',
            startDate: '2024-02-01',
            endDate: '2025-01-05',
            assignedDisciplines: [
                {
                    name: 'Yoga',
                    classes: [
                        {
                            name: 'Yoga Principiante - Lunes 6:00 PM',
                            instructor: 'Laura Sánchez',
                            price: 250,
                        },
                        {
                            name: 'Yoga Principiante - Jueves 6:00 PM',
                            instructor: 'Laura Sánchez',
                            price: 250,
                        },
                    ],
                },
            ],
            additionalUsers: [],
            paymentHistory: [
                {
                    date: '2024-11-01',
                    amount: 500,
                    method: 'Tarjeta',
                    status: 'Pagado',
                    invoice: null,
                },
                {
                    date: '2024-10-01',
                    amount: 500,
                    method: 'Tarjeta',
                    status: 'Pagado',
                    invoice: null,
                },
            ],
            paymentStatus: 'Pendiente',
            lastPayment: '2024-11-01',
            nextPayment: '2024-12-01',
            packageDiscount: 0,
        },
        {
            id: 3,
            affiliateId: 'AF003',
            name: 'Carlos Rodríguez',
            photo: '/athletic-man.png',
            email: 'carlos.rodriguez@email.com',
            phone: '555-9012',
            status: 'Vencido',
            startDate: '2023-06-01',
            endDate: '2024-12-01',
            assignedDisciplines: [
                {
                    name: 'Basquetbol',
                    classes: [
                        {
                            name: 'Basquetbol Avanzado - Martes 4:00 PM',
                            instructor: 'Miguel Ángel',
                            price: 350,
                        },
                        {
                            name: 'Basquetbol Avanzado - Jueves 4:00 PM',
                            instructor: 'Miguel Ángel',
                            price: 350,
                        },
                    ],
                },
                {
                    name: 'Volleyball',
                    classes: [
                        {
                            name: 'Volleyball Intermedio - Viernes 5:00 PM',
                            instructor: 'Roberto Gómez',
                            price: 650,
                        },
                    ],
                },
            ],
            additionalUsers: [],
            paymentHistory: [
                {
                    date: '2024-10-01',
                    amount: 1350,
                    method: 'Efectivo',
                    status: 'Pagado',
                    invoice: null,
                },
                {
                    date: '2024-09-01',
                    amount: 1350,
                    method: 'Efectivo',
                    status: 'Pagado',
                    invoice: null,
                },
            ],
            paymentStatus: 'Atrasado',
            lastPayment: '2024-10-01',
            nextPayment: '2024-11-01',
            packageDiscount: 0,
        },
    ];

    const calculateMonthlyTotal = (affiliate) => {
        let subtotal = 0;

        affiliate.assignedDisciplines.forEach((discipline) => {
            discipline.classes.forEach((classItem) => {
                subtotal += classItem.price;
            });
        });

        affiliate.additionalUsers
            .filter((user) => user.active)
            .forEach((user) => {
                user.disciplines.forEach((discipline) => {
                    discipline.classes.forEach((classItem) => {
                        subtotal += classItem.price;
                    });
                });
            });

        const discount = (subtotal * affiliate.packageDiscount) / 100;
        const total = subtotal - discount;

        return { subtotal, discount, total };
    };

    const calculateFinalTotal = () => {
        if (!selectedAffiliate) return 0;
        const { total } = calculateMonthlyTotal(selectedAffiliate);
        const extraDiscountAmount = (total * extraDiscountPercent) / 100;
        return Math.max(0, total - extraDiscountAmount);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Activo':
                return 'success';
            case 'Por vencer':
                return 'warning';
            case 'Vencido':
                return 'error';
            default:
                return 'default';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'Al corriente':
                return 'success';
            case 'Pendiente':
                return 'warning';
            case 'Atrasado':
                return 'error';
            default:
                return 'default';
        }
    };

    const handleSelectAffiliate = (affiliate) => {
        setSelectedAffiliate(affiliate);
        setAdditionalUsers(affiliate.additionalUsers);
    };

    const handleOpenDialog = (type) => {
        setDialogType(type);
        setOpenDialog(true);
        if (type === 'payment' && selectedAffiliate) {
            const { total } = calculateMonthlyTotal(selectedAffiliate);
            setPaymentAmount(total);
            setExtraDiscountPercent(0);
            setRequiresInvoice('no');
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDialogType('');
        setExtraDiscountPercent(0);
        setRequiresInvoice('no');
    };

    const handleToggleAdditionalUser = (userId) => {
        setAdditionalUsers((prev) =>
            prev.map((user) =>
                user.id === userId ? { ...user, active: !user.active } : user,
            ),
        );
    };

    const handleUploadInvoice = (paymentIndex) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.jpg,.jpeg,.png';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                console.log('[v0] Factura cargada:', file.name);
                // Aquí se implementaría la lógica para subir el archivo
            }
        };
        input.click();
    };

    const filteredAffiliates = affiliates.filter(
        (affiliate) =>
            affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            affiliate.affiliateId
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: '#2A3F54', mb: 1 }}
                >
                    Gestión de Planes y Pagos
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575' }}>
                    Busca afiliados para gestionar sus planes, pagos y usuarios
                    adicionales
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Left Panel - Search & List */}
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            bgcolor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            height: 'calc(100vh - 200px)',
                        }}
                    >
                        <CardContent>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Buscar afiliado..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <Search
                                            sx={{ mr: 1, color: '#757575' }}
                                        />
                                    ),
                                }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: '#26A69A',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#26A69A',
                                        },
                                    },
                                }}
                            />

                            <Box
                                sx={{
                                    overflowY: 'auto',
                                    maxHeight: 'calc(100vh - 320px)',
                                }}
                            >
                                {filteredAffiliates.map((affiliate) => (
                                    <Box
                                        key={affiliate.id}
                                        onClick={() =>
                                            handleSelectAffiliate(affiliate)
                                        }
                                        sx={{
                                            p: 2,
                                            mb: 2,
                                            border: '2px solid',
                                            borderColor:
                                                selectedAffiliate?.id ===
                                                affiliate.id
                                                    ? '#26A69A'
                                                    : '#E0E0E0',
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            bgcolor:
                                                selectedAffiliate?.id ===
                                                affiliate.id
                                                    ? '#E0F2F1'
                                                    : 'white',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                borderColor: '#26A69A',
                                                bgcolor: '#F1F8F7',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                mb: 1,
                                            }}
                                        >
                                            <Avatar
                                                src={affiliate.photo}
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    mr: 2,
                                                }}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {affiliate.name}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: '#757575' }}
                                                >
                                                    {affiliate.affiliateId}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Chip
                                                label={affiliate.status}
                                                color={getStatusColor(
                                                    affiliate.status,
                                                )}
                                                size="small"
                                            />
                                            <Chip
                                                label={affiliate.paymentStatus}
                                                color={getPaymentStatusColor(
                                                    affiliate.paymentStatus,
                                                )}
                                                size="small"
                                            />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Panel - Details */}
                <Grid item xs={12} md={8}>
                    {selectedAffiliate ? (
                        <Box>
                            {/* Affiliate Info Card */}
                            <Card
                                sx={{
                                    bgcolor: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    mb: 3,
                                }}
                            >
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={3}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Avatar
                                                    src={
                                                        selectedAffiliate.photo
                                                    }
                                                    sx={{
                                                        width: 120,
                                                        height: 120,
                                                        mb: 2,
                                                        border: '4px solid #E0F2F1',
                                                    }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 600,
                                                        textAlign: 'center',
                                                        mb: 1,
                                                    }}
                                                >
                                                    {selectedAffiliate.name}
                                                </Typography>
                                                <Chip
                                                    label={
                                                        selectedAffiliate.affiliateId
                                                    }
                                                    size="small"
                                                    sx={{ mb: 1 }}
                                                />
                                                <Chip
                                                    label={
                                                        selectedAffiliate.status
                                                    }
                                                    color={getStatusColor(
                                                        selectedAffiliate.status,
                                                    )}
                                                    size="small"
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={5}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: '#757575', mb: 1 }}
                                            >
                                                Información de Contacto
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ mb: 0.5 }}
                                            >
                                                📧 {selectedAffiliate.email}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ mb: 2 }}
                                            >
                                                📱 {selectedAffiliate.phone}
                                            </Typography>

                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: '#757575', mb: 1 }}
                                            >
                                                Vigencia del Plan
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ mb: 0.5 }}
                                            >
                                                Inicio:{' '}
                                                {selectedAffiliate.startDate}
                                            </Typography>
                                            <Typography variant="body2">
                                                Fin: {selectedAffiliate.endDate}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    bgcolor: '#F5F5F5',
                                                    borderRadius: 2,
                                                    mb: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        color: '#757575',
                                                        mb: 1,
                                                    }}
                                                >
                                                    Resumen de Pago
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        mb: 1,
                                                    }}
                                                >
                                                    <Typography variant="body2">
                                                        Subtotal:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        $
                                                        {
                                                            calculateMonthlyTotal(
                                                                selectedAffiliate,
                                                            ).subtotal
                                                        }
                                                    </Typography>
                                                </Box>
                                                {selectedAffiliate.packageDiscount >
                                                    0 && (
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: '#26A69A',
                                                            }}
                                                        >
                                                            Descuento (
                                                            {
                                                                selectedAffiliate.packageDiscount
                                                            }
                                                            %):
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: '#26A69A',
                                                            }}
                                                        >
                                                            -$
                                                            {
                                                                calculateMonthlyTotal(
                                                                    selectedAffiliate,
                                                                ).discount
                                                            }
                                                        </Typography>
                                                    </Box>
                                                )}
                                                <Divider sx={{ my: 1 }} />
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        Total Mensual:
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: '#26A69A',
                                                        }}
                                                    >
                                                        $
                                                        {
                                                            calculateMonthlyTotal(
                                                                selectedAffiliate,
                                                            ).total
                                                        }
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={
                                                        selectedAffiliate.paymentStatus
                                                    }
                                                    color={getPaymentStatusColor(
                                                        selectedAffiliate.paymentStatus,
                                                    )}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 600,
                                                        width: '100%',
                                                    }}
                                                />
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1,
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={<Payment />}
                                                    fullWidth
                                                    sx={{
                                                        bgcolor: '#26A69A',
                                                        '&:hover': {
                                                            bgcolor: '#00897B',
                                                        },
                                                        textTransform: 'none',
                                                    }}
                                                    onClick={() =>
                                                        handleOpenDialog(
                                                            'payment',
                                                        )
                                                    }
                                                >
                                                    Registrar Pago
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<Refresh />}
                                                    fullWidth
                                                    sx={{
                                                        borderColor: '#26A69A',
                                                        color: '#26A69A',
                                                        '&:hover': {
                                                            borderColor:
                                                                '#00897B',
                                                            bgcolor: '#E0F2F1',
                                                        },
                                                        textTransform: 'none',
                                                    }}
                                                    onClick={() =>
                                                        handleOpenDialog(
                                                            'renew',
                                                        )
                                                    }
                                                >
                                                    Renovar Plan
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<History />}
                                                    fullWidth
                                                    sx={{
                                                        borderColor: '#2196F3',
                                                        color: '#2196F3',
                                                        '&:hover': {
                                                            borderColor:
                                                                '#1976D2',
                                                            bgcolor: '#E3F2FD',
                                                        },
                                                        textTransform: 'none',
                                                    }}
                                                    onClick={() =>
                                                        handleOpenDialog(
                                                            'history',
                                                        )
                                                    }
                                                >
                                                    Ver Historial
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>

                            {/* Assigned Disciplines & Classes */}
                            <Card
                                sx={{
                                    bgcolor: 'white',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    mb: 3,
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            mb: 2,
                                            color: '#2A3F54',
                                        }}
                                    >
                                        Disciplinas y Clases Asignadas
                                    </Typography>
                                    {selectedAffiliate.assignedDisciplines.map(
                                        (discipline, idx) => (
                                            <Box key={idx} sx={{ mb: 3 }}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 1,
                                                        color: '#26A69A',
                                                    }}
                                                >
                                                    {discipline.name}
                                                </Typography>
                                                {discipline.classes.map(
                                                    (classItem, classIdx) => (
                                                        <Box
                                                            key={classIdx}
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent:
                                                                    'space-between',
                                                                alignItems:
                                                                    'center',
                                                                p: 2,
                                                                mb: 1,
                                                                bgcolor:
                                                                    '#F5F5F5',
                                                                borderRadius: 1,
                                                            }}
                                                        >
                                                            <Box>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {
                                                                        classItem.name
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        color: '#757575',
                                                                    }}
                                                                >
                                                                    Instructor:{' '}
                                                                    {
                                                                        classItem.instructor
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: '#26A69A',
                                                                }}
                                                            >
                                                                $
                                                                {
                                                                    classItem.price
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    ),
                                                )}
                                            </Box>
                                        ),
                                    )}
                                </CardContent>
                            </Card>

                            {/* Additional Users Management */}
                            {additionalUsers.length > 0 && (
                                <Card
                                    sx={{
                                        bgcolor: 'white',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 2,
                                                color: '#2A3F54',
                                            }}
                                        >
                                            Usuarios Adicionales
                                        </Typography>
                                        {additionalUsers.map((user) => (
                                            <Box
                                                key={user.id}
                                                sx={{
                                                    p: 2,
                                                    mb: 2,
                                                    border: '2px solid',
                                                    borderColor: user.active
                                                        ? '#26A69A'
                                                        : '#E0E0E0',
                                                    borderRadius: 2,
                                                    bgcolor: user.active
                                                        ? '#E0F2F1'
                                                        : '#F5F5F5',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'center',
                                                        mb: 2,
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {user.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: '#757575',
                                                            }}
                                                        >
                                                            {user.relation}
                                                        </Typography>
                                                    </Box>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={
                                                                    user.active
                                                                }
                                                                onChange={() =>
                                                                    handleToggleAdditionalUser(
                                                                        user.id,
                                                                    )
                                                                }
                                                                sx={{
                                                                    '& .MuiSwitch-switchBase.Mui-checked':
                                                                        {
                                                                            color: '#26A69A',
                                                                        },
                                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
                                                                        {
                                                                            backgroundColor:
                                                                                '#26A69A',
                                                                        },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            user.active
                                                                ? 'Activo'
                                                                : 'Inactivo'
                                                        }
                                                    />
                                                </Box>
                                                {user.active && (
                                                    <Box>
                                                        {user.disciplines.map(
                                                            (
                                                                discipline,
                                                                idx,
                                                            ) => (
                                                                <Box
                                                                    key={idx}
                                                                    sx={{
                                                                        mb: 1,
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="subtitle2"
                                                                        sx={{
                                                                            fontWeight: 600,
                                                                            mb: 0.5,
                                                                        }}
                                                                    >
                                                                        {
                                                                            discipline.name
                                                                        }
                                                                    </Typography>
                                                                    {discipline.classes.map(
                                                                        (
                                                                            classItem,
                                                                            classIdx,
                                                                        ) => (
                                                                            <Box
                                                                                key={
                                                                                    classIdx
                                                                                }
                                                                                sx={{
                                                                                    display:
                                                                                        'flex',
                                                                                    justifyContent:
                                                                                        'space-between',
                                                                                    p: 1,
                                                                                    bgcolor:
                                                                                        'white',
                                                                                    borderRadius: 1,
                                                                                    mb: 0.5,
                                                                                }}
                                                                            >
                                                                                <Typography variant="caption">
                                                                                    {
                                                                                        classItem.name
                                                                                    }
                                                                                </Typography>
                                                                                <Typography
                                                                                    variant="caption"
                                                                                    sx={{
                                                                                        fontWeight: 600,
                                                                                        color: '#26A69A',
                                                                                    }}
                                                                                >
                                                                                    $
                                                                                    {
                                                                                        classItem.price
                                                                                    }
                                                                                </Typography>
                                                                            </Box>
                                                                        ),
                                                                    )}
                                                                </Box>
                                                            ),
                                                        )}
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                        <Alert
                                            severity="info"
                                            icon={<PersonOff />}
                                        >
                                            Desactiva usuarios adicionales para
                                            excluirlos del cálculo mensual
                                        </Alert>
                                    </CardContent>
                                </Card>
                            )}
                        </Box>
                    ) : (
                        <Card
                            sx={{
                                bgcolor: 'white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                height: 'calc(100vh - 200px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box sx={{ textAlign: 'center', p: 4 }}>
                                <Search
                                    sx={{
                                        fontSize: 80,
                                        color: '#E0E0E0',
                                        mb: 2,
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{ color: '#757575', mb: 1 }}
                                >
                                    Selecciona un afiliado
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: '#9E9E9E' }}
                                >
                                    Busca y selecciona un afiliado de la lista
                                    para ver sus detalles y gestionar su plan
                                </Typography>
                            </Box>
                        </Card>
                    )}
                </Grid>
            </Grid>

            {/* Dialogs */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {dialogType === 'renew' && 'Renovar Plan'}
                        {dialogType === 'payment' && 'Registrar Pago'}
                        {dialogType === 'history' && 'Historial de Pagos'}
                    </Typography>
                    <IconButton onClick={handleCloseDialog}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {dialogType === 'renew' && selectedAffiliate && (
                        <Box>
                            <Alert severity="info" sx={{ mb: 3 }}>
                                Renovando plan para {selectedAffiliate.name}
                            </Alert>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Período de Renovación</InputLabel>
                                <Select
                                    defaultValue="6"
                                    label="Período de Renovación"
                                >
                                    <MenuItem value="1">1 mes</MenuItem>
                                    <MenuItem value="3">3 meses</MenuItem>
                                    <MenuItem value="6">6 meses</MenuItem>
                                    <MenuItem value="12">12 meses</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Fecha de Inicio"
                                type="date"
                                defaultValue={
                                    new Date().toISOString().split('T')[0]
                                }
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 2 }}
                            />
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: '#E0F2F1',
                                    borderRadius: 2,
                                }}
                            >
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Total a pagar:{' '}
                                    <strong>
                                        $
                                        {calculateMonthlyTotal(
                                            selectedAffiliate,
                                        ).total * 6}
                                    </strong>
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: '#757575' }}
                                >
                                    Incluye descuento del{' '}
                                    {selectedAffiliate.packageDiscount}%
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {dialogType === 'payment' && selectedAffiliate && (
                        <Box>
                            <Alert severity="info" sx={{ mb: 3 }}>
                                Registrando pago para {selectedAffiliate.name}
                            </Alert>

                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: '#F5F5F5',
                                    borderRadius: 2,
                                    mb: 3,
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{ mb: 2, fontWeight: 600 }}
                                >
                                    Resumen de Costos
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="body2">
                                        Subtotal:
                                    </Typography>
                                    <Typography variant="body2">
                                        $
                                        {
                                            calculateMonthlyTotal(
                                                selectedAffiliate,
                                            ).subtotal
                                        }
                                    </Typography>
                                </Box>
                                {selectedAffiliate.packageDiscount > 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#26A69A' }}
                                        >
                                            Descuento Paquete (
                                            {selectedAffiliate.packageDiscount}
                                            %):
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#26A69A' }}
                                        >
                                            -$
                                            {
                                                calculateMonthlyTotal(
                                                    selectedAffiliate,
                                                ).discount
                                            }
                                        </Typography>
                                    </Box>
                                )}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mb: 1,
                                    }}
                                >
                                    <Typography variant="body2">
                                        Total antes de descuento extra:
                                    </Typography>
                                    <Typography variant="body2">
                                        $
                                        {
                                            calculateMonthlyTotal(
                                                selectedAffiliate,
                                            ).total
                                        }
                                    </Typography>
                                </Box>
                                {extraDiscountPercent > 0 && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#FF9800' }}
                                        >
                                            Descuento Extra (
                                            {extraDiscountPercent}%):
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#FF9800' }}
                                        >
                                            -$
                                            {(
                                                (calculateMonthlyTotal(
                                                    selectedAffiliate,
                                                ).total *
                                                    extraDiscountPercent) /
                                                100
                                            ).toFixed(2)}
                                        </Typography>
                                    </Box>
                                )}
                                <Divider sx={{ my: 1 }} />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Total Final:
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#26A69A',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        ${calculateFinalTotal().toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>

                            <TextField
                                fullWidth
                                label="Descuento Extra (%)"
                                type="number"
                                value={extraDiscountPercent}
                                onChange={(e) =>
                                    setExtraDiscountPercent(
                                        Math.max(
                                            0,
                                            Math.min(
                                                100,
                                                Number(e.target.value),
                                            ),
                                        ),
                                    )
                                }
                                variant="outlined"
                                helperText="Porcentaje de descuento adicional (0-100%)"
                                sx={{ mb: 2 }}
                                InputProps={{
                                    endAdornment: (
                                        <Typography sx={{ ml: 1 }}>
                                            %
                                        </Typography>
                                    ),
                                }}
                                inputProps={{
                                    min: 0,
                                    max: 100,
                                    step: 0.5,
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Monto a Pagar"
                                type="number"
                                value={calculateFinalTotal().toFixed(2)}
                                variant="outlined"
                                disabled
                                sx={{ mb: 2 }}
                                InputProps={{
                                    startAdornment: (
                                        <Typography sx={{ mr: 1 }}>
                                            $
                                        </Typography>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Fecha de Pago"
                                type="date"
                                defaultValue={
                                    new Date().toISOString().split('T')[0]
                                }
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 2 }}
                            />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Método de Pago</InputLabel>
                                <Select
                                    defaultValue="efectivo"
                                    label="Método de Pago"
                                >
                                    <MenuItem value="efectivo">
                                        Efectivo
                                    </MenuItem>
                                    <MenuItem value="tarjeta">Tarjeta</MenuItem>
                                    <MenuItem value="transferencia">
                                        Transferencia
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl component="fieldset" sx={{ mb: 2 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ mb: 1, fontWeight: 600 }}
                                >
                                    ¿Requiere Factura?
                                </Typography>
                                <RadioGroup
                                    row
                                    value={requiresInvoice}
                                    onChange={(e) =>
                                        setRequiresInvoice(e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="si"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: '#26A69A',
                                                    '&.Mui-checked': {
                                                        color: '#26A69A',
                                                    },
                                                }}
                                            />
                                        }
                                        label="Sí"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={
                                            <Radio
                                                sx={{
                                                    color: '#26A69A',
                                                    '&.Mui-checked': {
                                                        color: '#26A69A',
                                                    },
                                                }}
                                            />
                                        }
                                        label="No"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Notas"
                                multiline
                                rows={3}
                                variant="outlined"
                                placeholder="Observaciones adicionales sobre el pago..."
                            />
                        </Box>
                    )}

                    {dialogType === 'history' && selectedAffiliate && (
                        <Box>
                            <TableContainer component={Paper} elevation={0}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#F5F5F5' }}>
                                            <TableCell sx={{ fontWeight: 600 }}>
                                                Fecha
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>
                                                Monto
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>
                                                Método
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>
                                                Estado
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>
                                                Factura
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedAffiliate.paymentHistory.map(
                                            (payment, idx) => (
                                                <TableRow key={idx}>
                                                    <TableCell>
                                                        {payment.date}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: '#26A69A',
                                                        }}
                                                    >
                                                        ${payment.amount}
                                                    </TableCell>
                                                    <TableCell>
                                                        {payment.method}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={
                                                                payment.status
                                                            }
                                                            color="success"
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        {payment.invoice ? (
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    gap: 1,
                                                                }}
                                                            >
                                                                <Chip
                                                                    icon={
                                                                        <Description />
                                                                    }
                                                                    label="Ver Factura"
                                                                    size="small"
                                                                    color="primary"
                                                                    onClick={() =>
                                                                        console.log(
                                                                            '[v0] Abriendo factura:',
                                                                            payment.invoice,
                                                                        )
                                                                    }
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                    }}
                                                                />
                                                            </Box>
                                                        ) : (
                                                            <Button
                                                                size="small"
                                                                startIcon={
                                                                    <UploadFile />
                                                                }
                                                                onClick={() =>
                                                                    handleUploadInvoice(
                                                                        idx,
                                                                    )
                                                                }
                                                                sx={{
                                                                    textTransform:
                                                                        'none',
                                                                    color: '#26A69A',
                                                                    '&:hover': {
                                                                        bgcolor:
                                                                            '#E0F2F1',
                                                                    },
                                                                }}
                                                            >
                                                                Subir
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={handleCloseDialog}
                        sx={{ textTransform: 'none' }}
                    >
                        Cancelar
                    </Button>
                    {dialogType !== 'history' && (
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#26A69A',
                                '&:hover': { bgcolor: '#00897B' },
                                textTransform: 'none',
                            }}
                            onClick={handleCloseDialog}
                        >
                            Confirmar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
}
