import {
    Add,
    Close,
    Delete,
    Edit,
    Payment,
    PersonAdd,
    Refresh,
    Search,
} from '@mui/icons-material';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export function PlansManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState(''); // 'renew', 'enroll', 'addUser', 'payment', 'package'
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');

    // Datos de ejemplo
    const plans = [
        {
            id: 1,
            affiliateId: 'AF001',
            affiliateName: 'Juan Pérez García',
            photo: '/hombre.png',
            status: 'Activo',
            startDate: '2024-01-15',
            endDate: '2024-07-15',
            disciplines: [
                { name: 'Natación', price: 800, classes: 3 },
                { name: 'Fútbol', price: 600, classes: 2 },
            ],
            additionalUsers: [
                {
                    id: 1,
                    name: 'María Pérez',
                    relation: 'Hija',
                    disciplines: ['Natación'],
                },
                {
                    id: 2,
                    name: 'Pedro Pérez',
                    relation: 'Hijo',
                    disciplines: ['Fútbol'],
                },
            ],
            totalMonthly: 1400,
            discount: 10,
            finalPrice: 1260,
            paymentStatus: 'Al corriente',
            lastPayment: '2024-12-01',
            nextPayment: '2025-01-01',
        },
        {
            id: 2,
            affiliateId: 'AF002',
            affiliateName: 'Ana Martínez López',
            photo: '/mujer-sonriente.png',
            status: 'Por vencer',
            startDate: '2024-02-01',
            endDate: '2025-01-05',
            disciplines: [{ name: 'Yoga', price: 500, classes: 2 }],
            additionalUsers: [],
            totalMonthly: 500,
            discount: 0,
            finalPrice: 500,
            paymentStatus: 'Pendiente',
            lastPayment: '2024-11-01',
            nextPayment: '2024-12-01',
        },
        {
            id: 3,
            affiliateId: 'AF003',
            affiliateName: 'Carlos Rodríguez',
            photo: '/athletic-man.png',
            status: 'Vencido',
            startDate: '2023-06-01',
            endDate: '2024-12-01',
            disciplines: [
                { name: 'Basquetbol', price: 700, classes: 3 },
                { name: 'Volleyball', price: 650, classes: 2 },
            ],
            additionalUsers: [],
            totalMonthly: 1350,
            discount: 0,
            finalPrice: 1350,
            paymentStatus: 'Atrasado',
            lastPayment: '2024-10-01',
            nextPayment: '2024-11-01',
        },
    ];

    const availableDisciplines = [
        { name: 'Natación', price: 800 },
        { name: 'Fútbol', price: 600 },
        { name: 'Basquetbol', price: 700 },
        { name: 'Volleyball', price: 650 },
        { name: 'Tennis', price: 900 },
        { name: 'Padel', price: 850 },
        { name: 'Yoga', price: 500 },
    ];

    const packages = [
        { id: 1, name: 'Paquete Básico', disciplines: 1, discount: 0 },
        { id: 2, name: 'Paquete Doble', disciplines: 2, discount: 10 },
        { id: 3, name: 'Paquete Triple', disciplines: 3, discount: 15 },
        { id: 4, name: 'Paquete Familiar', disciplines: 4, discount: 20 },
        { id: 5, name: 'Paquete Premium', disciplines: 5, discount: 25 },
    ];

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

    const handleOpenDialog = (type, plan) => {
        setDialogType(type);
        setSelectedPlan(plan);
        setOpenDialog(true);
        if (type === 'enroll' || type === 'package') {
            setSelectedDisciplines([]);
            setSelectedPackage('');
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPlan(null);
        setDialogType('');
        setSelectedDisciplines([]);
        setSelectedPackage('');
    };

    const handleDisciplineToggle = (discipline) => {
        setSelectedDisciplines((prev) =>
            prev.includes(discipline)
                ? prev.filter((d) => d !== discipline)
                : [...prev, discipline],
        );
    };

    const calculateTotal = () => {
        const subtotal = selectedDisciplines.reduce((sum, disciplineName) => {
            const discipline = availableDisciplines.find(
                (d) => d.name === disciplineName,
            );
            return sum + (discipline?.price || 0);
        }, 0);

        const pkg = packages.find((p) => p.id === selectedPackage);
        const discount = pkg ? (subtotal * pkg.discount) / 100 : 0;

        return {
            subtotal,
            discount,
            total: subtotal - discount,
        };
    };

    const filteredPlans = plans.filter(
        (plan) =>
            plan.affiliateName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            plan.affiliateId.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box
                sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: '#2A3F54' }}
                >
                    Gestión de Planes
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{
                        bgcolor: '#26A69A',
                        '&:hover': { bgcolor: '#00897B' },
                        textTransform: 'none',
                        px: 3,
                    }}
                    onClick={() => handleOpenDialog('enroll', null)}
                >
                    Nuevo Plan
                </Button>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar por nombre o ID de afiliado..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <Search sx={{ mr: 1, color: '#757575' }} />
                        ),
                    }}
                    sx={{
                        bgcolor: 'white',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': { borderColor: '#26A69A' },
                            '&.Mui-focused fieldset': {
                                borderColor: '#26A69A',
                            },
                        },
                    }}
                />
            </Box>

            {/* Plans Grid */}
            <Grid container spacing={3}>
                {filteredPlans.map((plan) => (
                    <Grid item xs={12} key={plan.id}>
                        <Card
                            sx={{
                                bgcolor: 'white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                },
                                transition: 'all 0.3s',
                            }}
                        >
                            <CardContent>
                                <Grid container spacing={3}>
                                    {/* Left Section - Affiliate Info */}
                                    <Grid item xs={12} md={3}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Avatar
                                                src={plan.photo}
                                                sx={{
                                                    width: 100,
                                                    height: 100,
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
                                                {plan.affiliateName}
                                            </Typography>
                                            <Chip
                                                label={plan.affiliateId}
                                                size="small"
                                                sx={{ mb: 1 }}
                                            />
                                            <Chip
                                                label={plan.status}
                                                color={getStatusColor(
                                                    plan.status,
                                                )}
                                                size="small"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Middle Section - Plan Details */}
                                    <Grid item xs={12} md={5}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ color: '#757575', mb: 1 }}
                                        >
                                            Disciplinas Contratadas
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            {plan.disciplines.map(
                                                (disc, idx) => (
                                                    <Box
                                                        key={idx}
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                            alignItems:
                                                                'center',
                                                            mb: 1,
                                                            p: 1,
                                                            bgcolor: '#F5F5F5',
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {disc.name}
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                gap: 2,
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: '#757575',
                                                                }}
                                                            >
                                                                {disc.classes}{' '}
                                                                clases/sem
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: '#26A69A',
                                                                }}
                                                            >
                                                                ${disc.price}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                ),
                                            )}
                                        </Box>

                                        {plan.additionalUsers.length > 0 && (
                                            <>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        color: '#757575',
                                                        mb: 1,
                                                    }}
                                                >
                                                    Usuarios Adicionales (
                                                    {
                                                        plan.additionalUsers
                                                            .length
                                                    }
                                                    )
                                                </Typography>
                                                <Box>
                                                    {plan.additionalUsers.map(
                                                        (user) => (
                                                            <Box
                                                                key={user.id}
                                                                sx={{
                                                                    display:
                                                                        'flex',
                                                                    justifyContent:
                                                                        'space-between',
                                                                    alignItems:
                                                                        'center',
                                                                    mb: 1,
                                                                    p: 1,
                                                                    bgcolor:
                                                                        '#FFF3E0',
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
                                                                            user.name
                                                                        }
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            color: '#757575',
                                                                        }}
                                                                    >
                                                                        {
                                                                            user.relation
                                                                        }{' '}
                                                                        -{' '}
                                                                        {user.disciplines.join(
                                                                            ', ',
                                                                        )}
                                                                    </Typography>
                                                                </Box>
                                                                <IconButton
                                                                    size="small"
                                                                    color="error"
                                                                >
                                                                    <Delete fontSize="small" />
                                                                </IconButton>
                                                            </Box>
                                                        ),
                                                    )}
                                                </Box>
                                            </>
                                        )}

                                        <Box
                                            sx={{
                                                mt: 2,
                                                display: 'flex',
                                                gap: 1,
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{ color: '#757575' }}
                                            >
                                                Vigencia:
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {plan.startDate} al{' '}
                                                {plan.endDate}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    {/* Right Section - Payment & Actions */}
                                    <Grid item xs={12} md={4}>
                                        <Box
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                                bgcolor: '#F5F5F5',
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: '#757575', mb: 1 }}
                                            >
                                                Información de Pago
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
                                                    ${plan.totalMonthly}
                                                </Typography>
                                            </Box>
                                            {plan.discount > 0 && (
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
                                                        {plan.discount}%):
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#26A69A',
                                                        }}
                                                    >
                                                        -$
                                                        {plan.totalMonthly -
                                                            plan.finalPrice}
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
                                                    ${plan.finalPrice}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={plan.paymentStatus}
                                                color={getPaymentStatusColor(
                                                    plan.paymentStatus,
                                                )}
                                                size="small"
                                                sx={{
                                                    fontWeight: 600,
                                                    width: '100%',
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    display: 'block',
                                                    mt: 1,
                                                    color: '#757575',
                                                }}
                                            >
                                                Último pago: {plan.lastPayment}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    display: 'block',
                                                    color: '#757575',
                                                }}
                                            >
                                                Próximo pago: {plan.nextPayment}
                                            </Typography>
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
                                                startIcon={<Refresh />}
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
                                                        'renew',
                                                        plan,
                                                    )
                                                }
                                            >
                                                Renovar
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<Payment />}
                                                fullWidth
                                                sx={{
                                                    borderColor: '#26A69A',
                                                    color: '#26A69A',
                                                    '&:hover': {
                                                        borderColor: '#00897B',
                                                        bgcolor: '#E0F2F1',
                                                    },
                                                    textTransform: 'none',
                                                }}
                                                onClick={() =>
                                                    handleOpenDialog(
                                                        'payment',
                                                        plan,
                                                    )
                                                }
                                            >
                                                Registrar Pago
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<PersonAdd />}
                                                fullWidth
                                                sx={{
                                                    borderColor: '#FF9800',
                                                    color: '#FF9800',
                                                    '&:hover': {
                                                        borderColor: '#F57C00',
                                                        bgcolor: '#FFF3E0',
                                                    },
                                                    textTransform: 'none',
                                                }}
                                                onClick={() =>
                                                    handleOpenDialog(
                                                        'addUser',
                                                        plan,
                                                    )
                                                }
                                            >
                                                Agregar Usuario
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<Edit />}
                                                fullWidth
                                                sx={{
                                                    borderColor: '#2196F3',
                                                    color: '#2196F3',
                                                    '&:hover': {
                                                        borderColor: '#1976D2',
                                                        bgcolor: '#E3F2FD',
                                                    },
                                                    textTransform: 'none',
                                                }}
                                                onClick={() =>
                                                    handleOpenDialog(
                                                        'package',
                                                        plan,
                                                    )
                                                }
                                            >
                                                Cambiar Paquete
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for Actions */}
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
                        {dialogType === 'enroll' && 'Inscribir Nuevo Plan'}
                        {dialogType === 'addUser' &&
                            'Agregar Usuario Adicional'}
                        {dialogType === 'payment' && 'Registrar Pago'}
                        {dialogType === 'package' && 'Cambiar Paquete'}
                    </Typography>
                    <IconButton onClick={handleCloseDialog}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {(dialogType === 'enroll' || dialogType === 'package') && (
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ mb: 2, fontWeight: 600 }}
                            >
                                Seleccionar Disciplinas
                            </Typography>
                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                {availableDisciplines.map((discipline) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        key={discipline.name}
                                    >
                                        <Box
                                            onClick={() =>
                                                handleDisciplineToggle(
                                                    discipline.name,
                                                )
                                            }
                                            sx={{
                                                p: 2,
                                                border: '2px solid',
                                                borderColor:
                                                    selectedDisciplines.includes(
                                                        discipline.name,
                                                    )
                                                        ? '#26A69A'
                                                        : '#E0E0E0',
                                                borderRadius: 2,
                                                cursor: 'pointer',
                                                bgcolor:
                                                    selectedDisciplines.includes(
                                                        discipline.name,
                                                    )
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
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: 600 }}
                                                >
                                                    {discipline.name}
                                                </Typography>
                                                <Checkbox
                                                    checked={selectedDisciplines.includes(
                                                        discipline.name,
                                                    )}
                                                    sx={{
                                                        color: '#26A69A',
                                                        '&.Mui-checked': {
                                                            color: '#26A69A',
                                                        },
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: '#26A69A',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                ${discipline.price}/mes
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Typography
                                variant="subtitle1"
                                sx={{ mb: 2, fontWeight: 600 }}
                            >
                                Seleccionar Paquete (Opcional)
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Paquete</InputLabel>
                                <Select
                                    value={selectedPackage}
                                    onChange={(e) =>
                                        setSelectedPackage(e.target.value)
                                    }
                                    label="Paquete"
                                >
                                    <MenuItem value="">Sin paquete</MenuItem>
                                    {packages.map((pkg) => (
                                        <MenuItem key={pkg.id} value={pkg.id}>
                                            {pkg.name} - {pkg.discount}%
                                            descuento ({pkg.disciplines}{' '}
                                            disciplinas)
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {selectedDisciplines.length > 0 && (
                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: '#F5F5F5',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ mb: 1, fontWeight: 600 }}
                                    >
                                        Resumen de Pago
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
                                            ${calculateTotal().subtotal}
                                        </Typography>
                                    </Box>
                                    {calculateTotal().discount > 0 && (
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
                                                Descuento:
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: '#26A69A' }}
                                            >
                                                -${calculateTotal().discount}
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
                                            variant="h6"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            Total Mensual:
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#26A69A',
                                            }}
                                        >
                                            ${calculateTotal().total}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )}

                    {dialogType === 'renew' && selectedPlan && (
                        <Box>
                            <Alert severity="info" sx={{ mb: 3 }}>
                                Renovando plan para {selectedPlan.affiliateName}
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
                                        ${selectedPlan.finalPrice * 6}
                                    </strong>
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: '#757575' }}
                                >
                                    Incluye descuento del{' '}
                                    {selectedPlan.discount}%
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {dialogType === 'addUser' && selectedPlan && (
                        <Box>
                            <TextField
                                fullWidth
                                label="Nombre Completo"
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Parentesco"
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Disciplinas</InputLabel>
                                <Select multiple label="Disciplinas">
                                    {availableDisciplines.map((disc) => (
                                        <MenuItem
                                            key={disc.name}
                                            value={disc.name}
                                        >
                                            {disc.name} - ${disc.price}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Alert severity="warning">
                                Se recalculará el total mensual al agregar este
                                usuario adicional
                            </Alert>
                        </Box>
                    )}

                    {dialogType === 'payment' && selectedPlan && (
                        <Box>
                            <Alert severity="info" sx={{ mb: 3 }}>
                                Registrando pago para{' '}
                                {selectedPlan.affiliateName}
                            </Alert>
                            <TextField
                                fullWidth
                                label="Monto"
                                type="number"
                                defaultValue={selectedPlan.finalPrice}
                                variant="outlined"
                                sx={{ mb: 2 }}
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
                            <TextField
                                fullWidth
                                label="Notas"
                                multiline
                                rows={3}
                                variant="outlined"
                            />
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
                </DialogActions>
            </Dialog>
        </Box>
    );
}

// import { useState } from "react"
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Chip,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Avatar,
//   Grid,
//   Divider,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Switch,
//   FormControlLabel,
// } from "@mui/material"
// import { Search, Refresh, Payment, Close, History, PersonOff } from "@mui/icons-material"

// export function PlansManagement() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedAffiliate, setSelectedAffiliate] = useState(null)
//   const [openDialog, setOpenDialog] = useState(false)
//   const [dialogType, setDialogType] = useState("") // 'renew', 'payment', 'history'
//   const [additionalUsers, setAdditionalUsers] = useState([])

//   const affiliates = [
//     {
//       id: 1,
//       affiliateId: "AF001",
//       name: "Juan Pérez García",
//       photo: "/hombre.png",
//       email: "juan.perez@email.com",
//       phone: "555-1234",
//       status: "Activo",
//       startDate: "2024-01-15",
//       endDate: "2024-07-15",
//       // Disciplinas y clases asignadas desde affiliate-assignment
//       assignedDisciplines: [
//         {
//           name: "Natación",
//           classes: [
//             { name: "Natación Principiante - Lunes 8:00 AM", instructor: "Carlos Ruiz", price: 400 },
//             { name: "Natación Principiante - Miércoles 8:00 AM", instructor: "Carlos Ruiz", price: 400 },
//           ],
//         },
//         {
//           name: "Fútbol",
//           classes: [{ name: "Fútbol Intermedio - Martes 10:00 AM", instructor: "Luis Torres", price: 600 }],
//         },
//       ],
//       additionalUsers: [
//         {
//           id: 1,
//           name: "María Pérez",
//           relation: "Hija",
//           active: true,
//           disciplines: [
//             {
//               name: "Natación",
//               classes: [{ name: "Natación Principiante - Lunes 8:00 AM", price: 400 }],
//             },
//           ],
//         },
//         {
//           id: 2,
//           name: "Pedro Pérez",
//           relation: "Hijo",
//           active: true,
//           disciplines: [
//             {
//               name: "Fútbol",
//               classes: [{ name: "Fútbol Principiante - Martes 10:00 AM", price: 500 }],
//             },
//           ],
//         },
//       ],
//       paymentHistory: [
//         { date: "2024-12-01", amount: 2300, method: "Tarjeta", status: "Pagado" },
//         { date: "2024-11-01", amount: 2300, method: "Efectivo", status: "Pagado" },
//         { date: "2024-10-01", amount: 2300, method: "Transferencia", status: "Pagado" },
//       ],
//       paymentStatus: "Al corriente",
//       lastPayment: "2024-12-01",
//       nextPayment: "2025-01-01",
//       packageDiscount: 10,
//     },
//     {
//       id: 2,
//       affiliateId: "AF002",
//       name: "Ana Martínez López",
//       photo: "/mujer-sonriente.png",
//       email: "ana.martinez@email.com",
//       phone: "555-5678",
//       status: "Por vencer",
//       startDate: "2024-02-01",
//       endDate: "2025-01-05",
//       assignedDisciplines: [
//         {
//           name: "Yoga",
//           classes: [
//             { name: "Yoga Principiante - Lunes 6:00 PM", instructor: "Laura Sánchez", price: 250 },
//             { name: "Yoga Principiante - Jueves 6:00 PM", instructor: "Laura Sánchez", price: 250 },
//           ],
//         },
//       ],
//       additionalUsers: [],
//       paymentHistory: [
//         { date: "2024-11-01", amount: 500, method: "Tarjeta", status: "Pagado" },
//         { date: "2024-10-01", amount: 500, method: "Tarjeta", status: "Pagado" },
//       ],
//       paymentStatus: "Pendiente",
//       lastPayment: "2024-11-01",
//       nextPayment: "2024-12-01",
//       packageDiscount: 0,
//     },
//     {
//       id: 3,
//       affiliateId: "AF003",
//       name: "Carlos Rodríguez",
//       photo: "/athletic-man.png",
//       email: "carlos.rodriguez@email.com",
//       phone: "555-9012",
//       status: "Vencido",
//       startDate: "2023-06-01",
//       endDate: "2024-12-01",
//       assignedDisciplines: [
//         {
//           name: "Basquetbol",
//           classes: [
//             { name: "Basquetbol Avanzado - Martes 4:00 PM", instructor: "Miguel Ángel", price: 350 },
//             { name: "Basquetbol Avanzado - Jueves 4:00 PM", instructor: "Miguel Ángel", price: 350 },
//           ],
//         },
//         {
//           name: "Volleyball",
//           classes: [{ name: "Volleyball Intermedio - Viernes 5:00 PM", instructor: "Roberto Gómez", price: 650 }],
//         },
//       ],
//       additionalUsers: [],
//       paymentHistory: [
//         { date: "2024-10-01", amount: 1350, method: "Efectivo", status: "Pagado" },
//         { date: "2024-09-01", amount: 1350, method: "Efectivo", status: "Pagado" },
//       ],
//       paymentStatus: "Atrasado",
//       lastPayment: "2024-10-01",
//       nextPayment: "2024-11-01",
//       packageDiscount: 0,
//     },
//   ]

//   const calculateMonthlyTotal = (affiliate) => {
//     let subtotal = 0

//     // Sumar clases del afiliado principal
//     affiliate.assignedDisciplines.forEach((discipline) => {
//       discipline.classes.forEach((classItem) => {
//         subtotal += classItem.price
//       })
//     })

//     // Sumar clases de usuarios adicionales activos
//     affiliate.additionalUsers
//       .filter((user) => user.active)
//       .forEach((user) => {
//         user.disciplines.forEach((discipline) => {
//           discipline.classes.forEach((classItem) => {
//             subtotal += classItem.price
//           })
//         })
//       })

//     const discount = (subtotal * affiliate.packageDiscount) / 100
//     const total = subtotal - discount

//     return { subtotal, discount, total }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Activo":
//         return "success"
//       case "Por vencer":
//         return "warning"
//       case "Vencido":
//         return "error"
//       default:
//         return "default"
//     }
//   }

//   const getPaymentStatusColor = (status) => {
//     switch (status) {
//       case "Al corriente":
//         return "success"
//       case "Pendiente":
//         return "warning"
//       case "Atrasado":
//         return "error"
//       default:
//         return "default"
//     }
//   }

//   const handleSelectAffiliate = (affiliate) => {
//     setSelectedAffiliate(affiliate)
//     setAdditionalUsers(affiliate.additionalUsers)
//   }

//   const handleOpenDialog = (type) => {
//     setDialogType(type)
//     setOpenDialog(true)
//   }

//   const handleCloseDialog = () => {
//     setOpenDialog(false)
//     setDialogType("")
//   }

//   const handleToggleAdditionalUser = (userId) => {
//     setAdditionalUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, active: !user.active } : user)))
//   }

//   const filteredAffiliates = affiliates.filter(
//     (affiliate) =>
//       affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       affiliate.affiliateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h4" sx={{ fontWeight: 600, color: "#2A3F54", mb: 1 }}>
//           Gestión de Planes y Pagos
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#757575" }}>
//           Busca afiliados para gestionar sus planes, pagos y usuarios adicionales
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Left Panel - Search & List */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ bgcolor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", height: "calc(100vh - 200px)" }}>
//             <CardContent>
//               {/* Search Bar */}
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Buscar afiliado..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: <Search sx={{ mr: 1, color: "#757575" }} />,
//                 }}
//                 sx={{
//                   mb: 2,
//                   "& .MuiOutlinedInput-root": {
//                     "&:hover fieldset": { borderColor: "#26A69A" },
//                     "&.Mui-focused fieldset": { borderColor: "#26A69A" },
//                   },
//                 }}
//               />

//               {/* Affiliates List */}
//               <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 320px)" }}>
//                 {filteredAffiliates.map((affiliate) => (
//                   <Box
//                     key={affiliate.id}
//                     onClick={() => handleSelectAffiliate(affiliate)}
//                     sx={{
//                       p: 2,
//                       mb: 2,
//                       border: "2px solid",
//                       borderColor: selectedAffiliate?.id === affiliate.id ? "#26A69A" : "#E0E0E0",
//                       borderRadius: 2,
//                       cursor: "pointer",
//                       bgcolor: selectedAffiliate?.id === affiliate.id ? "#E0F2F1" : "white",
//                       transition: "all 0.3s",
//                       "&:hover": {
//                         borderColor: "#26A69A",
//                         bgcolor: "#F1F8F7",
//                       },
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                       <Avatar src={affiliate.photo} sx={{ width: 50, height: 50, mr: 2 }} />
//                       <Box sx={{ flex: 1 }}>
//                         <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                           {affiliate.name}
//                         </Typography>
//                         <Typography variant="caption" sx={{ color: "#757575" }}>
//                           {affiliate.affiliateId}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       <Chip label={affiliate.status} color={getStatusColor(affiliate.status)} size="small" />
//                       <Chip
//                         label={affiliate.paymentStatus}
//                         color={getPaymentStatusColor(affiliate.paymentStatus)}
//                         size="small"
//                       />
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Right Panel - Details */}
//         <Grid item xs={12} md={8}>
//           {selectedAffiliate ? (
//             <Box>
//               {/* Affiliate Info Card */}
//               <Card sx={{ bgcolor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", mb: 3 }}>
//                 <CardContent>
//                   <Grid container spacing={3}>
//                     <Grid item xs={12} md={3}>
//                       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                         <Avatar
//                           src={selectedAffiliate.photo}
//                           sx={{ width: 120, height: 120, mb: 2, border: "4px solid #E0F2F1" }}
//                         />
//                         <Typography variant="h6" sx={{ fontWeight: 600, textAlign: "center", mb: 1 }}>
//                           {selectedAffiliate.name}
//                         </Typography>
//                         <Chip label={selectedAffiliate.affiliateId} size="small" sx={{ mb: 1 }} />
//                         <Chip
//                           label={selectedAffiliate.status}
//                           color={getStatusColor(selectedAffiliate.status)}
//                           size="small"
//                           sx={{ fontWeight: 600 }}
//                         />
//                       </Box>
//                     </Grid>

//                     <Grid item xs={12} md={5}>
//                       <Typography variant="subtitle2" sx={{ color: "#757575", mb: 1 }}>
//                         Información de Contacto
//                       </Typography>
//                       <Typography variant="body2" sx={{ mb: 0.5 }}>
//                         📧 {selectedAffiliate.email}
//                       </Typography>
//                       <Typography variant="body2" sx={{ mb: 2 }}>
//                         📱 {selectedAffiliate.phone}
//                       </Typography>

//                       <Typography variant="subtitle2" sx={{ color: "#757575", mb: 1 }}>
//                         Vigencia del Plan
//                       </Typography>
//                       <Typography variant="body2" sx={{ mb: 0.5 }}>
//                         Inicio: {selectedAffiliate.startDate}
//                       </Typography>
//                       <Typography variant="body2">Fin: {selectedAffiliate.endDate}</Typography>
//                     </Grid>

//                     <Grid item xs={12} md={4}>
//                       <Box sx={{ p: 2, bgcolor: "#F5F5F5", borderRadius: 2, mb: 2 }}>
//                         <Typography variant="subtitle2" sx={{ color: "#757575", mb: 1 }}>
//                           Resumen de Pago
//                         </Typography>
//                         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//                           <Typography variant="body2">Subtotal:</Typography>
//                           <Typography variant="body2">${calculateMonthlyTotal(selectedAffiliate).subtotal}</Typography>
//                         </Box>
//                         {selectedAffiliate.packageDiscount > 0 && (
//                           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//                             <Typography variant="body2" sx={{ color: "#26A69A" }}>
//                               Descuento ({selectedAffiliate.packageDiscount}%):
//                             </Typography>
//                             <Typography variant="body2" sx={{ color: "#26A69A" }}>
//                               -${calculateMonthlyTotal(selectedAffiliate).discount}
//                             </Typography>
//                           </Box>
//                         )}
//                         <Divider sx={{ my: 1 }} />
//                         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                           <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                             Total Mensual:
//                           </Typography>
//                           <Typography variant="body1" sx={{ fontWeight: 600, color: "#26A69A" }}>
//                             ${calculateMonthlyTotal(selectedAffiliate).total}
//                           </Typography>
//                         </Box>
//                         <Chip
//                           label={selectedAffiliate.paymentStatus}
//                           color={getPaymentStatusColor(selectedAffiliate.paymentStatus)}
//                           size="small"
//                           sx={{ fontWeight: 600, width: "100%" }}
//                         />
//                       </Box>

//                       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                         <Button
//                           variant="contained"
//                           startIcon={<Payment />}
//                           fullWidth
//                           sx={{
//                             bgcolor: "#26A69A",
//                             "&:hover": { bgcolor: "#00897B" },
//                             textTransform: "none",
//                           }}
//                           onClick={() => handleOpenDialog("payment")}
//                         >
//                           Registrar Pago
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           startIcon={<Refresh />}
//                           fullWidth
//                           sx={{
//                             borderColor: "#26A69A",
//                             color: "#26A69A",
//                             "&:hover": { borderColor: "#00897B", bgcolor: "#E0F2F1" },
//                             textTransform: "none",
//                           }}
//                           onClick={() => handleOpenDialog("renew")}
//                         >
//                           Renovar Plan
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           startIcon={<History />}
//                           fullWidth
//                           sx={{
//                             borderColor: "#2196F3",
//                             color: "#2196F3",
//                             "&:hover": { borderColor: "#1976D2", bgcolor: "#E3F2FD" },
//                             textTransform: "none",
//                           }}
//                           onClick={() => handleOpenDialog("history")}
//                         >
//                           Ver Historial
//                         </Button>
//                       </Box>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>

//               {/* Assigned Disciplines & Classes */}
//               <Card sx={{ bgcolor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", mb: 3 }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#2A3F54" }}>
//                     Disciplinas y Clases Asignadas
//                   </Typography>
//                   {selectedAffiliate.assignedDisciplines.map((discipline, idx) => (
//                     <Box key={idx} sx={{ mb: 3 }}>
//                       <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#26A69A" }}>
//                         {discipline.name}
//                       </Typography>
//                       {discipline.classes.map((classItem, classIdx) => (
//                         <Box
//                           key={classIdx}
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             p: 2,
//                             mb: 1,
//                             bgcolor: "#F5F5F5",
//                             borderRadius: 1,
//                           }}
//                         >
//                           <Box>
//                             <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                               {classItem.name}
//                             </Typography>
//                             <Typography variant="caption" sx={{ color: "#757575" }}>
//                               Instructor: {classItem.instructor}
//                             </Typography>
//                           </Box>
//                           <Typography variant="body1" sx={{ fontWeight: 600, color: "#26A69A" }}>
//                             ${classItem.price}
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Box>
//                   ))}
//                 </CardContent>
//               </Card>

//               {/* Additional Users Management */}
//               {additionalUsers.length > 0 && (
//                 <Card sx={{ bgcolor: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//                   <CardContent>
//                     <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#2A3F54" }}>
//                       Usuarios Adicionales
//                     </Typography>
//                     {additionalUsers.map((user) => (
//                       <Box
//                         key={user.id}
//                         sx={{
//                           p: 2,
//                           mb: 2,
//                           border: "2px solid",
//                           borderColor: user.active ? "#26A69A" : "#E0E0E0",
//                           borderRadius: 2,
//                           bgcolor: user.active ? "#E0F2F1" : "#F5F5F5",
//                         }}
//                       >
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                           <Box>
//                             <Typography variant="body1" sx={{ fontWeight: 600 }}>
//                               {user.name}
//                             </Typography>
//                             <Typography variant="caption" sx={{ color: "#757575" }}>
//                               {user.relation}
//                             </Typography>
//                           </Box>
//                           <FormControlLabel
//                             control={
//                               <Switch
//                                 checked={user.active}
//                                 onChange={() => handleToggleAdditionalUser(user.id)}
//                                 sx={{
//                                   "& .MuiSwitch-switchBase.Mui-checked": {
//                                     color: "#26A69A",
//                                   },
//                                   "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
//                                     backgroundColor: "#26A69A",
//                                   },
//                                 }}
//                               />
//                             }
//                             label={user.active ? "Activo" : "Inactivo"}
//                           />
//                         </Box>
//                         {user.active && (
//                           <Box>
//                             {user.disciplines.map((discipline, idx) => (
//                               <Box key={idx} sx={{ mb: 1 }}>
//                                 <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
//                                   {discipline.name}
//                                 </Typography>
//                                 {discipline.classes.map((classItem, classIdx) => (
//                                   <Box
//                                     key={classIdx}
//                                     sx={{
//                                       display: "flex",
//                                       justifyContent: "space-between",
//                                       p: 1,
//                                       bgcolor: "white",
//                                       borderRadius: 1,
//                                       mb: 0.5,
//                                     }}
//                                   >
//                                     <Typography variant="caption">{classItem.name}</Typography>
//                                     <Typography variant="caption" sx={{ fontWeight: 600, color: "#26A69A" }}>
//                                       ${classItem.price}
//                                     </Typography>
//                                   </Box>
//                                 ))}
//                               </Box>
//                             ))}
//                           </Box>
//                         )}
//                       </Box>
//                     ))}
//                     <Alert severity="info" icon={<PersonOff />}>
//                       Desactiva usuarios adicionales para excluirlos del cálculo mensual
//                     </Alert>
//                   </CardContent>
//                 </Card>
//               )}
//             </Box>
//           ) : (
//             <Card
//               sx={{
//                 bgcolor: "white",
//                 boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                 height: "calc(100vh - 200px)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Box sx={{ textAlign: "center", p: 4 }}>
//                 <Search sx={{ fontSize: 80, color: "#E0E0E0", mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: "#757575", mb: 1 }}>
//                   Selecciona un afiliado
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#9E9E9E" }}>
//                   Busca y selecciona un afiliado de la lista para ver sus detalles y gestionar su plan
//                 </Typography>
//               </Box>
//             </Card>
//           )}
//         </Grid>
//       </Grid>

//       {/* Dialogs */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h6" sx={{ fontWeight: 600 }}>
//             {dialogType === "renew" && "Renovar Plan"}
//             {dialogType === "payment" && "Registrar Pago"}
//             {dialogType === "history" && "Historial de Pagos"}
//           </Typography>
//           <IconButton onClick={handleCloseDialog}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {dialogType === "renew" && selectedAffiliate && (
//             <Box>
//               <Alert severity="info" sx={{ mb: 3 }}>
//                 Renovando plan para {selectedAffiliate.name}
//               </Alert>
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Período de Renovación</InputLabel>
//                 <Select defaultValue="6" label="Período de Renovación">
//                   <MenuItem value="1">1 mes</MenuItem>
//                   <MenuItem value="3">3 meses</MenuItem>
//                   <MenuItem value="6">6 meses</MenuItem>
//                   <MenuItem value="12">12 meses</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 fullWidth
//                 label="Fecha de Inicio"
//                 type="date"
//                 defaultValue={new Date().toISOString().split("T")[0]}
//                 InputLabelProps={{ shrink: true }}
//                 sx={{ mb: 2 }}
//               />
//               <Box sx={{ p: 2, bgcolor: "#E0F2F1", borderRadius: 2 }}>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   Total a pagar: <strong>${calculateMonthlyTotal(selectedAffiliate).total * 6}</strong>
//                 </Typography>
//                 <Typography variant="caption" sx={{ color: "#757575" }}>
//                   Incluye descuento del {selectedAffiliate.packageDiscount}%
//                 </Typography>
//               </Box>
//             </Box>
//           )}

//           {dialogType === "payment" && selectedAffiliate && (
//             <Box>
//               <Alert severity="info" sx={{ mb: 3 }}>
//                 Registrando pago para {selectedAffiliate.name}
//               </Alert>
//               <TextField
//                 fullWidth
//                 label="Monto"
//                 type="number"
//                 defaultValue={calculateMonthlyTotal(selectedAffiliate).total}
//                 variant="outlined"
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Fecha de Pago"
//                 type="date"
//                 defaultValue={new Date().toISOString().split("T")[0]}
//                 InputLabelProps={{ shrink: true }}
//                 sx={{ mb: 2 }}
//               />
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Método de Pago</InputLabel>
//                 <Select defaultValue="efectivo" label="Método de Pago">
//                   <MenuItem value="efectivo">Efectivo</MenuItem>
//                   <MenuItem value="tarjeta">Tarjeta</MenuItem>
//                   <MenuItem value="transferencia">Transferencia</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField fullWidth label="Notas" multiline rows={3} variant="outlined" />
//             </Box>
//           )}

//           {dialogType === "history" && selectedAffiliate && (
//             <Box>
//               <TableContainer component={Paper} elevation={0}>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: "#F5F5F5" }}>
//                       <TableCell sx={{ fontWeight: 600 }}>Fecha</TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>Monto</TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>Método</TableCell>
//                       <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {selectedAffiliate.paymentHistory.map((payment, idx) => (
//                       <TableRow key={idx}>
//                         <TableCell>{payment.date}</TableCell>
//                         <TableCell sx={{ fontWeight: 600, color: "#26A69A" }}>${payment.amount}</TableCell>
//                         <TableCell>{payment.method}</TableCell>
//                         <TableCell>
//                           <Chip label={payment.status} color="success" size="small" />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} sx={{ textTransform: "none" }}>
//             Cancelar
//           </Button>
//           {dialogType !== "history" && (
//             <Button
//               variant="contained"
//               sx={{
//                 bgcolor: "#26A69A",
//                 "&:hover": { bgcolor: "#00897B" },
//                 textTransform: "none",
//               }}
//               onClick={handleCloseDialog}
//             >
//               Confirmar
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }
