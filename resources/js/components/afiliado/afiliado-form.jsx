import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {
    AlertCircle,
    FileText,
    Heart,
    MapPin,
    Phone,
    Plus,
    Upload,
    User,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

const tiposTramite = [
    { id: 'nuevo', name: 'Nuevo Afiliado' },
    { id: 'renovacion', name: 'Renovación' },
    { id: 'reactivacion', name: 'Reactivación' },
];

const genders = [
    { id: 'M', name: 'Masculino' },
    { id: 'F', name: 'Femenino' },
    { id: 'O', name: 'Otro' },
];

const afiliacionesMedicas = [
    { id: 'imss', name: 'IMSS' },
    { id: 'issste', name: 'ISSSTE' },
    { id: 'privado', name: 'Seguro Privado' },
    { id: 'ninguno', name: 'Ninguno' },
];

const parentescos = [
    { id: 'padre', name: 'Padre' },
    { id: 'madre', name: 'Madre' },
    { id: 'hermano', name: 'Hermano/a' },
    { id: 'hijo', name: 'Hijo/a' },
    { id: 'conyuge', name: 'Cónyuge' },
    { id: 'otro', name: 'Otro' },
];

const colonias = [
    { id: '1', name: 'Centro' },
    { id: '2', name: 'Reforma' },
    { id: '3', name: 'Juárez' },
    { id: '4', name: 'Roma Norte' },
    { id: '5', name: 'Condesa' },
    { id: '6', name: 'Polanco' },
];

const estados = [
    { id: 'activo', name: 'Activo' },
    { id: 'inactivo', name: 'Inactivo' },
    { id: 'suspendido', name: 'Suspendido' },
];

export function AffiliateForm() {
    const [affiliates, setAffiliates] = useState([
        {
            id: '1',
            tipo_tramite: '',
            nombre: '',
            ap_paterno: '',
            ap_materno: '',
            curp: '',
            fecha_nacimiento: '',
            edad: '',
            sexo: '',
            peso: '',
            estatura: '',
            id_colonia: '',
            direccion: '',
            no_exterior: '',
            no_interior: '',
            codigo_postal: '',
            telefono_casa: '',
            telefono_movil: '',
            email: '',
            afiliacion_medica: '',
            alergias: '',
            foto_afiliado: null,
            formato_afiliado: null,
            nombre_contacto_emergencia: '',
            parentesco: '',
            telefono_contacto: '',
            estado: 'activo',
        },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('[v0] Affiliates form submitted:', affiliates);
        alert(`¡${affiliates.length} afiliado(s) registrado(s) con éxito!`);
    };

    const updateField = (affiliateId, field, value) => {
        setAffiliates(
            affiliates.map((affiliate) =>
                affiliate.id === affiliateId
                    ? { ...affiliate, [field]: value }
                    : affiliate,
            ),
        );
    };

    const handleFileChange = (affiliateId, field, file) => {
        setAffiliates(
            affiliates.map((affiliate) =>
                affiliate.id === affiliateId
                    ? { ...affiliate, [field]: file }
                    : affiliate,
            ),
        );
    };

    const addAffiliate = () => {
        setAffiliates([
            ...affiliates,
            {
                id: Date.now().toString(),
                tipo_tramite: '',
                nombre: '',
                ap_paterno: '',
                ap_materno: '',
                curp: '',
                fecha_nacimiento: '',
                edad: '',
                sexo: '',
                peso: '',
                estatura: '',
                id_colonia: '',
                direccion: '',
                no_exterior: '',
                no_interior: '',
                codigo_postal: '',
                telefono_casa: '',
                telefono_movil: '',
                email: '',
                afiliacion_medica: '',
                alergias: '',
                foto_afiliado: null,
                formato_afiliado: null,
                nombre_contacto_emergencia: '',
                parentesco: '',
                telefono_contacto: '',
                estado: 'activo',
            },
        ]);
    };

    const removeAffiliate = (id) => {
        if (affiliates.length > 1) {
            setAffiliates(
                affiliates.filter((affiliate) => affiliate.id !== id),
            );
        }
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background shadow-sm">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Users className="h-7 w-7 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Registro de Afiliados
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Gestión de Afiliados / Nuevo Afiliado
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="rounded-lg border bg-background p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {affiliates.map((affiliate, index) => (
                            <div
                                key={affiliate.id}
                                className="space-y-8 rounded-lg border-2 border-primary/20 bg-muted/20 p-6"
                            >
                                {/* Header del Afiliado */}
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center gap-2">
                                        <User className="h-6 w-6 text-primary" />
                                        <h2 className="text-xl font-bold text-foreground">
                                            Afiliado {index + 1}
                                        </h2>
                                    </div>
                                    {affiliates.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                removeAffiliate(affiliate.id)
                                            }
                                            className="h-9 w-9 p-0 hover:bg-destructive/10 hover:text-destructive"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    )}
                                </div>

                                {/* Información del Trámite */}
                                <div className="space-y-6 border-b pb-6">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            Información del Trámite
                                        </h3>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`tipo_tramite-${affiliate.id}`}
                                            >
                                                Tipo de Trámite *
                                            </Label>
                                            <TextField
                                                id={`tipo_tramite-${affiliate.id}`}
                                                select
                                                value={affiliate.tipo_tramite}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'tipo_tramite',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            >
                                                {tiposTramite.map((tipo) => (
                                                    <MenuItem
                                                        key={tipo.id}
                                                        value={tipo.id}
                                                    >
                                                        {tipo.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>

                                {/* Información Personal */}
                                <div className="space-y-6 border-b pb-6">
                                    <div className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            Información Personal
                                        </h3>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`nombre-${affiliate.id}`}
                                            >
                                                Nombre *
                                            </Label>
                                            <TextField
                                                id={`nombre-${affiliate.id}`}
                                                placeholder="Nombre(s)"
                                                value={affiliate.nombre}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'nombre',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`ap_paterno-${affiliate.id}`}
                                            >
                                                Apellido Paterno *
                                            </Label>
                                            <TextField
                                                id={`ap_paterno-${affiliate.id}`}
                                                placeholder="Apellido paterno"
                                                value={affiliate.ap_paterno}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'ap_paterno',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`ap_materno-${affiliate.id}`}
                                            >
                                                Apellido Materno
                                            </Label>
                                            <TextField
                                                id={`ap_materno-${affiliate.id}`}
                                                placeholder="Apellido materno"
                                                value={affiliate.ap_materno}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'ap_materno',
                                                        e.target.value,
                                                    )
                                                }
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`curp-${affiliate.id}`}
                                            >
                                                CURP *
                                            </Label>
                                            <TextField
                                                id={`curp-${affiliate.id}`}
                                                placeholder="18 caracteres"
                                                value={affiliate.curp}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'curp',
                                                        e.target.value.toUpperCase(),
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                inputProps={{ maxLength: 18 }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`fecha_nacimiento-${affiliate.id}`}
                                            >
                                                Fecha de Nacimiento *
                                            </Label>
                                            <TextField
                                                id={`fecha_nacimiento-${affiliate.id}`}
                                                type="date"
                                                value={
                                                    affiliate.fecha_nacimiento
                                                }
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'fecha_nacimiento',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-4">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`edad-${affiliate.id}`}
                                            >
                                                Edad *
                                            </Label>
                                            <TextField
                                                id={`edad-${affiliate.id}`}
                                                type="number"
                                                placeholder="Edad"
                                                value={affiliate.edad}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'edad',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                inputProps={{
                                                    min: 1,
                                                    max: 120,
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`sexo-${affiliate.id}`}
                                            >
                                                Sexo *
                                            </Label>
                                            <TextField
                                                id={`sexo-${affiliate.id}`}
                                                select
                                                value={affiliate.sexo}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'sexo',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            >
                                                {genders.map((gender) => (
                                                    <MenuItem
                                                        key={gender.id}
                                                        value={gender.id}
                                                    >
                                                        {gender.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`peso-${affiliate.id}`}
                                            >
                                                Peso (kg)
                                            </Label>
                                            <TextField
                                                id={`peso-${affiliate.id}`}
                                                type="number"
                                                placeholder="kg"
                                                value={affiliate.peso}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'peso',
                                                        e.target.value,
                                                    )
                                                }
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                inputProps={{
                                                    min: 1,
                                                    max: 300,
                                                    step: 0.1,
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`estatura-${affiliate.id}`}
                                            >
                                                Estatura (cm)
                                            </Label>
                                            <TextField
                                                id={`estatura-${affiliate.id}`}
                                                type="number"
                                                placeholder="cm"
                                                value={affiliate.estatura}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'estatura',
                                                        e.target.value,
                                                    )
                                                }
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                inputProps={{
                                                    min: 50,
                                                    max: 250,
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Dirección */}
                                <div className="space-y-6 border-b pb-6">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            Dirección
                                        </h3>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`direccion-${affiliate.id}`}
                                            >
                                                Calle *
                                            </Label>
                                            <TextField
                                                id={`direccion-${affiliate.id}`}
                                                placeholder="Nombre de la calle"
                                                value={affiliate.direccion}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'direccion',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="grid gap-6 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`no_exterior-${affiliate.id}`}
                                                >
                                                    No. Exterior *
                                                </Label>
                                                <TextField
                                                    id={`no_exterior-${affiliate.id}`}
                                                    placeholder="Número exterior"
                                                    value={
                                                        affiliate.no_exterior
                                                    }
                                                    onChange={(e) =>
                                                        updateField(
                                                            affiliate.id,
                                                            'no_exterior',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root':
                                                            {
                                                                height: '44px',
                                                                '&:hover fieldset':
                                                                    {
                                                                        borderColor:
                                                                            'hsl(var(--primary))',
                                                                    },
                                                                '&.Mui-focused fieldset':
                                                                    {
                                                                        borderColor:
                                                                            'hsl(var(--primary))',
                                                                    },
                                                            },
                                                    }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`no_interior-${affiliate.id}`}
                                                >
                                                    No. Interior
                                                </Label>
                                                <TextField
                                                    id={`no_interior-${affiliate.id}`}
                                                    placeholder="Número interior"
                                                    value={
                                                        affiliate.no_interior
                                                    }
                                                    onChange={(e) =>
                                                        updateField(
                                                            affiliate.id,
                                                            'no_interior',
                                                            e.target.value,
                                                        )
                                                    }
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root':
                                                            {
                                                                height: '44px',
                                                                '&:hover fieldset':
                                                                    {
                                                                        borderColor:
                                                                            'hsl(var(--primary))',
                                                                    },
                                                                '&.Mui-focused fieldset':
                                                                    {
                                                                        borderColor:
                                                                            'hsl(var(--primary))',
                                                                    },
                                                            },
                                                    }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`codigo_postal-${affiliate.id}`}
                                                >
                                                    Código Postal *
                                                </Label>
                                                <TextField
                                                    id={`codigo_postal-${affiliate.id}`}
                                                    placeholder="5 dígitos"
                                                    value={
                                                        affiliate.codigo_postal
                                                    }
                                                    onChange={(e) =>
                                                        updateField(
                                                            affiliate.id,
                                                            'codigo_postal',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    inputProps={{
                                                        maxLength: 5,
                                                    }}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root':
                                                            {
                                                                height: '44px',
                                                                '&:hover fieldset':
                                                                    {
                                                                        borderColor:
                                                                            'hsl(var(--primary))',
                                                                    },
                                                                '&.Mui-focused fieldset':
                                                                    {
                                                                        borderColor:
                                                                            'hsl(var(--primary))',
                                                                    },
                                                            },
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`id_colonia-${affiliate.id}`}
                                            >
                                                Colonia *
                                            </Label>
                                            <TextField
                                                id={`id_colonia-${affiliate.id}`}
                                                select
                                                value={affiliate.id_colonia}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'id_colonia',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            >
                                                {colonias.map((colonia) => (
                                                    <MenuItem
                                                        key={colonia.id}
                                                        value={colonia.id}
                                                    >
                                                        {colonia.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>

                                {/* Contacto */}
                                <div className="space-y-6 border-b pb-6">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            Información de Contacto
                                        </h3>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`telefono_casa-${affiliate.id}`}
                                            >
                                                Teléfono Casa
                                            </Label>
                                            <TextField
                                                id={`telefono_casa-${affiliate.id}`}
                                                type="tel"
                                                placeholder="10 dígitos"
                                                value={affiliate.telefono_casa}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'telefono_casa',
                                                        e.target.value,
                                                    )
                                                }
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                inputProps={{ maxLength: 10 }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`telefono_movil-${affiliate.id}`}
                                            >
                                                Teléfono Móvil *
                                            </Label>
                                            <TextField
                                                id={`telefono_movil-${affiliate.id}`}
                                                type="tel"
                                                placeholder="10 dígitos"
                                                value={affiliate.telefono_movil}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'telefono_movil',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                inputProps={{ maxLength: 10 }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`email-${affiliate.id}`}
                                            >
                                                Correo Electrónico *
                                            </Label>
                                            <TextField
                                                id={`email-${affiliate.id}`}
                                                type="email"
                                                placeholder="correo@ejemplo.com"
                                                value={affiliate.email}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Información Médica */}
                                <div className="space-y-6 border-b pb-6">
                                    <div className="flex items-center gap-2">
                                        <Heart className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            Información Médica
                                        </h3>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`afiliacion_medica-${affiliate.id}`}
                                            >
                                                Afiliación Médica
                                            </Label>
                                            <TextField
                                                id={`afiliacion_medica-${affiliate.id}`}
                                                select
                                                value={
                                                    affiliate.afiliacion_medica
                                                }
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'afiliacion_medica',
                                                        e.target.value,
                                                    )
                                                }
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            >
                                                {afiliacionesMedicas.map(
                                                    (afiliacion) => (
                                                        <MenuItem
                                                            key={afiliacion.id}
                                                            value={
                                                                afiliacion.id
                                                            }
                                                        >
                                                            {afiliacion.name}
                                                        </MenuItem>
                                                    ),
                                                )}
                                            </TextField>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`alergias-${affiliate.id}`}
                                            >
                                                Alergias
                                            </Label>
                                            <TextField
                                                id={`alergias-${affiliate.id}`}
                                                placeholder="Especificar alergias conocidas"
                                                value={affiliate.alergias}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'alergias',
                                                        e.target.value,
                                                    )
                                                }
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                multiline
                                                rows={1}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            minHeight: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Documentos */}
                                <div className="space-y-6 border-b pb-6">
                                    <div className="flex items-center gap-2">
                                        <Upload className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            Documentos
                                        </h3>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`foto_afiliado-${affiliate.id}`}
                                            >
                                                Foto del Afiliado
                                            </Label>
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                `foto_afiliado-${affiliate.id}`,
                                                            )
                                                            .click()
                                                    }
                                                    className="w-full"
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    {affiliate.foto_afiliado
                                                        ? affiliate
                                                              .foto_afiliado
                                                              .name
                                                        : 'Seleccionar Foto'}
                                                </Button>
                                                <input
                                                    id={`foto_afiliado-${affiliate.id}`}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            affiliate.id,
                                                            'foto_afiliado',
                                                            e.target.files[0],
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`formato_afiliado-${affiliate.id}`}
                                            >
                                                Formato de Afiliación
                                            </Label>
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                `formato_afiliado-${affiliate.id}`,
                                                            )
                                                            .click()
                                                    }
                                                    className="w-full"
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    {affiliate.formato_afiliado
                                                        ? affiliate
                                                              .formato_afiliado
                                                              .name
                                                        : 'Seleccionar Formato'}
                                                </Button>
                                                <input
                                                    id={`formato_afiliado-${affiliate.id}`}
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            affiliate.id,
                                                            'formato_afiliado',
                                                            e.target.files[0],
                                                        )
                                                    }
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contacto de Emergencia */}
                                <div className="space-y-6 border-b pb-6">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            Contacto de Emergencia
                                        </h3>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`nombre_contacto_emergencia-${affiliate.id}`}
                                            >
                                                Nombre Completo *
                                            </Label>
                                            <TextField
                                                id={`nombre_contacto_emergencia-${affiliate.id}`}
                                                placeholder="Nombre del contacto"
                                                value={
                                                    affiliate.nombre_contacto_emergencia
                                                }
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'nombre_contacto_emergencia',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`parentesco-${affiliate.id}`}
                                            >
                                                Parentesco *
                                            </Label>
                                            <TextField
                                                id={`parentesco-${affiliate.id}`}
                                                select
                                                value={affiliate.parentesco}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'parentesco',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            >
                                                {parentescos.map(
                                                    (parentesco) => (
                                                        <MenuItem
                                                            key={parentesco.id}
                                                            value={
                                                                parentesco.id
                                                            }
                                                        >
                                                            {parentesco.name}
                                                        </MenuItem>
                                                    ),
                                                )}
                                            </TextField>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`telefono_contacto-${affiliate.id}`}
                                            >
                                                Teléfono *
                                            </Label>
                                            <TextField
                                                id={`telefono_contacto-${affiliate.id}`}
                                                type="tel"
                                                placeholder="10 dígitos"
                                                value={
                                                    affiliate.telefono_contacto
                                                }
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'telefono_contacto',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                inputProps={{ maxLength: 10 }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Estado */}
                                <div className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`estado-${affiliate.id}`}
                                            >
                                                Estado *
                                            </Label>
                                            <TextField
                                                id={`estado-${affiliate.id}`}
                                                select
                                                value={affiliate.estado}
                                                onChange={(e) =>
                                                    updateField(
                                                        affiliate.id,
                                                        'estado',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                fullWidth
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    '& .MuiOutlinedInput-root':
                                                        {
                                                            height: '44px',
                                                            '&:hover fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                            '&.Mui-focused fieldset':
                                                                {
                                                                    borderColor:
                                                                        'hsl(var(--primary))',
                                                                },
                                                        },
                                                }}
                                            >
                                                {estados.map((estado) => (
                                                    <MenuItem
                                                        key={estado.id}
                                                        value={estado.id}
                                                    >
                                                        {estado.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addAffiliate}
                                className="h-12 w-full border-2 border-dashed border-primary/30 bg-transparent hover:border-primary hover:bg-primary/5"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                Agregar Afiliado Adicional
                            </Button>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex justify-end gap-3 border-t pt-4">
                            <Link href="/afiliados">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="min-w-[140px] bg-transparent"
                                >
                                    Cancelar
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                size="lg"
                                className="min-w-[140px]"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Registrar{' '}
                                {affiliates.length > 1
                                    ? `${affiliates.length} Afiliados`
                                    : 'Afiliado'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
