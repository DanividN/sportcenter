import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Briefcase, MapPin, Plus, User, UserCog } from 'lucide-react';
import { useState } from 'react';

const workerTypes = [
    { id: 'instructor', name: 'Instructor' },
    { id: 'receptionist', name: 'Recepcionista' },
    { id: 'maintenance', name: 'Mantenimiento' },
    { id: 'admin', name: 'Administrativo' },
    { id: 'security', name: 'Seguridad' },
];

const professions = [
    { id: 'sports_trainer', name: 'Entrenador Deportivo' },
    { id: 'swimming_instructor', name: 'Instructor de Natación' },
    { id: 'physical_therapist', name: 'Fisioterapeuta' },
    { id: 'receptionist', name: 'Recepcionista' },
    { id: 'administrator', name: 'Administrador' },
    { id: 'maintenance_tech', name: 'Técnico de Mantenimiento' },
    { id: 'security_guard', name: 'Guardia de Seguridad' },
    { id: 'other', name: 'Otro' },
];

const genders = [
    { id: 'M', name: 'Masculino' },
    { id: 'F', name: 'Femenino' },
    { id: 'O', name: 'Otro' },
];

// Datos de ejemplo para colonias (esto vendría de una base de datos)
const colonias = [
    { id: '1', name: 'Centro' },
    { id: '2', name: 'Reforma' },
    { id: '3', name: 'Juárez' },
    { id: '4', name: 'Roma Norte' },
    { id: '5', name: 'Condesa' },
    { id: '6', name: 'Polanco' },
];

export function WorkerForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        ap_paterno: '',
        ap_materno: '',
        sexo: '',
        edad: '',
        telefono: '',
        tipo: '',
        profesion: '',
        id_colonia: '',
        direccion: '',
        codigo_postal: '',
        no_exterior: '',
        no_interior: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('[v0] Worker form submitted:', formData);
        alert('¡Trabajador registrado con éxito!');
    };

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background shadow-sm">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center gap-3">
                        <UserCog className="h-7 w-7 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Alta de Trabajador
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Gestión de Trabajadores / Nuevo Trabajador
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="rounded-lg border bg-background p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Información Personal */}
                        <div className="space-y-6 border-b pb-6">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Información Personal
                                </h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="nombre">Nombre *</Label>
                                    <TextField
                                        id="nombre"
                                        placeholder="Nombre(s)"
                                        value={formData.nombre}
                                        onChange={(e) =>
                                            updateField(
                                                'nombre',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ap_paterno">
                                        Apellido Paterno *
                                    </Label>
                                    <TextField
                                        id="ap_paterno"
                                        placeholder="Apellido paterno"
                                        value={formData.ap_paterno}
                                        onChange={(e) =>
                                            updateField(
                                                'ap_paterno',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ap_materno">
                                        Apellido Materno
                                    </Label>
                                    <TextField
                                        id="ap_materno"
                                        placeholder="Apellido materno"
                                        value={formData.ap_materno}
                                        onChange={(e) =>
                                            updateField(
                                                'ap_materno',
                                                e.target.value,
                                            )
                                        }
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="sexo">Sexo *</Label>
                                    <TextField
                                        id="sexo"
                                        select
                                        value={formData.sexo}
                                        onChange={(e) =>
                                            updateField('sexo', e.target.value)
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
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
                                    <Label htmlFor="edad">Edad *</Label>
                                    <TextField
                                        id="edad"
                                        type="number"
                                        placeholder="Edad"
                                        value={formData.edad}
                                        onChange={(e) =>
                                            updateField('edad', e.target.value)
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ min: 18, max: 100 }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="telefono">Teléfono *</Label>
                                    <TextField
                                        id="telefono"
                                        type="tel"
                                        placeholder="10 dígitos"
                                        value={formData.telefono}
                                        onChange={(e) =>
                                            updateField(
                                                'telefono',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ maxLength: 10 }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Información Laboral */}
                        <div className="space-y-6 border-b pb-6">
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Información Laboral
                                </h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="tipo">
                                        Tipo de Trabajador *
                                    </Label>
                                    <TextField
                                        id="tipo"
                                        select
                                        value={formData.tipo}
                                        onChange={(e) =>
                                            updateField('tipo', e.target.value)
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                            },
                                        }}
                                    >
                                        {workerTypes.map((type) => (
                                            <MenuItem
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="profesion">
                                        Profesión *
                                    </Label>
                                    <TextField
                                        id="profesion"
                                        select
                                        value={formData.profesion}
                                        onChange={(e) =>
                                            updateField(
                                                'profesion',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                            },
                                        }}
                                    >
                                        {professions.map((profession) => (
                                            <MenuItem
                                                key={profession.id}
                                                value={profession.id}
                                            >
                                                {profession.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="space-y-6 border-b pb-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Dirección
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="direccion">Calle *</Label>
                                    <TextField
                                        id="direccion"
                                        placeholder="Nombre de la calle"
                                        value={formData.direccion}
                                        onChange={(e) =>
                                            updateField(
                                                'direccion',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="no_exterior">
                                            No. Exterior *
                                        </Label>
                                        <TextField
                                            id="no_exterior"
                                            placeholder="Número exterior"
                                            value={formData.no_exterior}
                                            onChange={(e) =>
                                                updateField(
                                                    'no_exterior',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: '44px',
                                                    '&:hover fieldset': {
                                                        borderColor:
                                                            'hsl(var(--primary))',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor:
                                                            'hsl(var(--primary))',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="no_interior">
                                            No. Interior
                                        </Label>
                                        <TextField
                                            id="no_interior"
                                            placeholder="Número interior"
                                            value={formData.no_interior}
                                            onChange={(e) =>
                                                updateField(
                                                    'no_interior',
                                                    e.target.value,
                                                )
                                            }
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: '44px',
                                                    '&:hover fieldset': {
                                                        borderColor:
                                                            'hsl(var(--primary))',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor:
                                                            'hsl(var(--primary))',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="codigo_postal">
                                            Código Postal *
                                        </Label>
                                        <TextField
                                            id="codigo_postal"
                                            placeholder="5 dígitos"
                                            value={formData.codigo_postal}
                                            onChange={(e) =>
                                                updateField(
                                                    'codigo_postal',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            inputProps={{ maxLength: 5 }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: '44px',
                                                    '&:hover fieldset': {
                                                        borderColor:
                                                            'hsl(var(--primary))',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor:
                                                            'hsl(var(--primary))',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="id_colonia">
                                        Colonia *
                                    </Label>
                                    <TextField
                                        id="id_colonia"
                                        select
                                        value={formData.id_colonia}
                                        onChange={(e) =>
                                            updateField(
                                                'id_colonia',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                height: '44px',
                                                '&:hover fieldset': {
                                                    borderColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '&.Mui-focused fieldset': {
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

                        {/* Botones de Acción */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Link href="/trabajadores">
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
                                Registrar Trabajador
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
