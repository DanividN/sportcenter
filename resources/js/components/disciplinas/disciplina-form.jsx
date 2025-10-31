import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from '@inertiajs/react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Plus, Trophy } from 'lucide-react';
import { useState } from 'react';

const estadoOptions = [
    { id: 'activo', name: 'Activo' },
    { id: 'inactivo', name: 'Inactivo' },
];

export function DisciplineForm() {
    const [formData, setFormData] = useState({
        nombre_disciplina: '',
        codigo: '',
        siglas: '',
        costo: '',
        estado: 'activo',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('[v0] Discipline form submitted:', formData);
        alert('¡Disciplina registrada con éxito!');
    };

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background shadow-sm">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Trophy className="h-7 w-7 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Alta de Disciplina
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Gestión de Disciplinas / Nueva Disciplina
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-6 py-8">
                <div className="rounded-lg border bg-background p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Información de la Disciplina */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Información de la Disciplina
                                </h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="nombre_disciplina">
                                        Nombre de la Disciplina *
                                    </Label>
                                    <TextField
                                        id="nombre_disciplina"
                                        placeholder="Ej: Natación, Fútbol, Tennis"
                                        value={formData.nombre_disciplina}
                                        onChange={(e) =>
                                            updateField(
                                                'nombre_disciplina',
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
                                    <Label htmlFor="codigo">Código *</Label>
                                    <TextField
                                        id="codigo"
                                        placeholder="Código único de la disciplina"
                                        value={formData.codigo}
                                        onChange={(e) =>
                                            updateField(
                                                'codigo',
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
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="siglas">Siglas *</Label>
                                    <TextField
                                        id="siglas"
                                        placeholder="Ej: NAT, FUT, TEN"
                                        value={formData.siglas}
                                        onChange={(e) =>
                                            updateField(
                                                'siglas',
                                                e.target.value.toUpperCase(),
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

                                <div className="space-y-2">
                                    <Label htmlFor="costo">
                                        Costo Mensual *
                                    </Label>
                                    <TextField
                                        id="costo"
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.costo}
                                        onChange={(e) =>
                                            updateField('costo', e.target.value)
                                        }
                                        required
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ min: 0, step: '0.01' }}
                                        InputProps={{
                                            startAdornment: (
                                                <span className="mr-2 text-muted-foreground">
                                                    $
                                                </span>
                                            ),
                                        }}
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
                                    <Label htmlFor="estado">Estado *</Label>
                                    <TextField
                                        id="estado"
                                        select
                                        value={formData.estado}
                                        onChange={(e) =>
                                            updateField(
                                                'estado',
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
                                        {estadoOptions.map((option) => (
                                            <MenuItem
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex justify-end gap-3 border-t pt-4">
                            <Link href="/disciplinas">
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
                                Registrar Disciplina
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
