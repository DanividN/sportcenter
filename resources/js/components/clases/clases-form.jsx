import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Link, router } from '@inertiajs/react';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Award, Clock, Dumbbell, Plus, User, Users, X } from 'lucide-react';
import { useState } from 'react';

const disciplines = [
    { id: 'swimming', name: 'Natación', icon: '🏊' },
    { id: 'soccer', name: 'Fútbol', icon: '⚽' },
    { id: 'basketball', name: 'Basquetbol', icon: '🏀' },
    { id: 'volleyball', name: 'Volleyball', icon: '🏐' },
    { id: 'tennis', name: 'Tennis', icon: '🎾' },
    { id: 'padel', name: 'Padel', icon: '🎾' },
];

const instructors = [
    {
        id: '1',
        name: 'Carlos Martínez',
        specialty: 'Estilo libre y mariposa',
        disciplines: ['swimming'],
    },
    {
        id: '2',
        name: 'Ana García',
        specialty: 'Principiantes y niños',
        disciplines: ['swimming'],
    },
    {
        id: '3',
        name: 'Roberto Silva',
        specialty: 'Técnica avanzada',
        disciplines: ['swimming'],
    },
    {
        id: '4',
        name: 'María López',
        specialty: 'Natación terapéutica',
        disciplines: ['swimming'],
    },
    {
        id: '5',
        name: 'Diego Ramírez',
        specialty: 'Táctica y estrategia',
        disciplines: ['soccer'],
    },
    {
        id: '6',
        name: 'Laura Fernández',
        specialty: 'Fundamentos y técnica',
        disciplines: ['soccer', 'basketball'],
    },
    {
        id: '7',
        name: 'Pedro Sánchez',
        specialty: 'Entrenamiento físico',
        disciplines: ['basketball', 'volleyball'],
    },
    {
        id: '8',
        name: 'Carmen Torres',
        specialty: 'Defensa y ataque',
        disciplines: ['volleyball'],
    },
    {
        id: '9',
        name: 'Miguel Ángel Ruiz',
        specialty: 'Saque y volea',
        disciplines: ['tennis', 'padel'],
    },
    {
        id: '10',
        name: 'Isabel Moreno',
        specialty: 'Técnica de golpeo',
        disciplines: ['tennis', 'padel'],
    },
];

const daysOfWeek = [
    { id: 'monday', label: 'Lunes' },
    { id: 'tuesday', label: 'Martes' },
    { id: 'wednesday', label: 'Miércoles' },
    { id: 'thursday', label: 'Jueves' },
    { id: 'friday', label: 'Viernes' },
    { id: 'saturday', label: 'Sábado' },
    { id: 'sunday', label: 'Domingo' },
];

const levels = [
    {
        id: 'beginner',
        name: 'Principiante',
        description: 'Sin experiencia previa',
    },
    {
        id: 'intermediate',
        name: 'Intermedio',
        description: 'Conocimientos básicos',
    },
    { id: 'advanced', name: 'Avanzado', description: 'Técnica desarrollada' },
    {
        id: 'competitive',
        name: 'Competitivo',
        description: 'Entrenamiento de alto rendimiento',
    },
];

export function SportsClassForm() {
    const [formData, setFormData] = useState({
        discipline: '',
        className: '',
        description: '',
        instructor: '',
        level: '',
        maxCapacity: 8,
        duration: 60,
    });

    const [scheduleGroups, setScheduleGroups] = useState([
        {
            id: '1',
            days: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            },
            time: '08:00',
        },
    ]);

    const filteredInstructors = formData.discipline
        ? instructors.filter((instructor) =>
              instructor.disciplines.includes(formData.discipline),
          )
        : [];

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (field === 'discipline') {
            setFormData((prev) => ({ ...prev, instructor: '' }));
        }
    };

    const addScheduleGroup = () => {
        setScheduleGroups([
            ...scheduleGroups,
            {
                id: Date.now().toString(),
                days: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false,
                },
                time: '08:00',
            },
        ]);
    };

    const removeScheduleGroup = (id) => {
        if (scheduleGroups.length > 1) {
            setScheduleGroups(
                scheduleGroups.filter((group) => group.id !== id),
            );
        }
    };

    const updateScheduleDay = (groupId, day, checked) => {
        setScheduleGroups(
            scheduleGroups.map((group) =>
                group.id === groupId
                    ? { ...group, days: { ...group.days, [day]: checked } }
                    : group,
            ),
        );
    };

    const updateScheduleTime = (groupId, time) => {
        setScheduleGroups(
            scheduleGroups.map((group) =>
                group.id === groupId ? { ...group, time } : group,
            ),
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/clases', {
            onSuccess: () => {
                toast.success('Clase creada con éxito'); // <-- se muestra aquí mismo
            },
            onError: () => {
                toast.error('Error al crear la clase');
            },
        });
    };

    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background shadow-sm">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Dumbbell className="h-7 w-7 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">
                                Alta de Clase Deportiva
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Gestión de Clases / Nueva Clase
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="rounded-lg border bg-background p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Disciplina Deportiva */}
                        <div className="space-y-4 border-b pb-6">
                            <div className="flex items-center gap-2">
                                <Dumbbell className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Disciplina Deportiva
                                </h2>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="discipline">
                                    Selecciona la disciplina *
                                </Label>
                                <Select
                                    value={formData.discipline}
                                    onValueChange={(value) =>
                                        updateField('discipline', value)
                                    }
                                    required
                                >
                                    <SelectTrigger
                                        id="discipline"
                                        className="h-11 text-base"
                                    >
                                        <SelectValue placeholder="Selecciona una disciplina" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {disciplines.map((discipline) => (
                                            <SelectItem
                                                key={discipline.id}
                                                value={discipline.id}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">
                                                        {discipline.icon}
                                                    </span>
                                                    <span className="font-medium">
                                                        {discipline.name}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Información de la Clase */}
                        <div className="space-y-6 border-b pb-6">
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Información de la Clase
                                </h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="className">
                                        Nombre de la Clase *
                                    </Label>
                                    <TextField
                                        id="className"
                                        placeholder="Ej: Natación Avanzada Matutina"
                                        value={formData.className}
                                        onChange={(e) =>
                                            updateField(
                                                'className',
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
                                    <Label htmlFor="level">Nivel *</Label>
                                    <Select
                                        value={formData.level}
                                        onValueChange={(value) =>
                                            updateField('level', value)
                                        }
                                        required
                                    >
                                        <SelectTrigger
                                            id="level"
                                            className="h-11 text-base"
                                        >
                                            <SelectValue placeholder="Selecciona el nivel" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {levels.map((level) => (
                                                <SelectItem
                                                    key={level.id}
                                                    value={level.id}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            {level.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {level.description}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <TextField
                                    id="description"
                                    placeholder="Describe los objetivos y características de esta clase..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        updateField(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    multiline
                                    rows={3}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
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

                        {/* Instructor */}
                        <div className="space-y-4 border-b pb-6">
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Instructor
                                </h2>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="instructor">
                                    Selecciona un instructor *
                                </Label>
                                <Select
                                    value={formData.instructor}
                                    onValueChange={(value) =>
                                        updateField('instructor', value)
                                    }
                                    required
                                    disabled={!formData.discipline}
                                >
                                    <SelectTrigger
                                        id="instructor"
                                        className="h-11 text-base"
                                    >
                                        <SelectValue
                                            placeholder={
                                                formData.discipline
                                                    ? 'Selecciona un instructor'
                                                    : 'Primero selecciona una disciplina'
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredInstructors.map(
                                            (instructor) => (
                                                <SelectItem
                                                    key={instructor.id}
                                                    value={instructor.id}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">
                                                            {instructor.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {
                                                                instructor.specialty
                                                            }
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                {!formData.discipline && (
                                    <p className="text-sm text-muted-foreground">
                                        Selecciona una disciplina para ver los
                                        instructores disponibles
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Horarios */}
                        <div className="space-y-4 border-b pb-6">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Horarios
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {scheduleGroups.map((group, index) => (
                                    <div
                                        key={group.id}
                                        className="space-y-4 rounded-lg border bg-muted/30 p-5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <Label className="text-base font-medium">
                                                Grupo de Horario {index + 1}
                                            </Label>
                                            {scheduleGroups.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        removeScheduleGroup(
                                                            group.id,
                                                        )
                                                    }
                                                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm text-muted-foreground">
                                                Selecciona los días:
                                            </Label>
                                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                                {daysOfWeek.map((day) => (
                                                    <FormControlLabel
                                                        key={day.id}
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    group.days[
                                                                        day.id
                                                                    ]
                                                                }
                                                                onChange={(e) =>
                                                                    updateScheduleDay(
                                                                        group.id,
                                                                        day.id,
                                                                        e.target
                                                                            .checked,
                                                                    )
                                                                }
                                                                sx={{
                                                                    color: 'hsl(var(--primary))',
                                                                    '&.Mui-checked':
                                                                        {
                                                                            color: 'hsl(var(--primary))',
                                                                        },
                                                                }}
                                                            />
                                                        }
                                                        label={day.label}
                                                        className="m-0"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor={`time-${group.id}`}
                                                className="text-sm text-muted-foreground"
                                            >
                                                Hora de inicio:
                                            </Label>
                                            <TextField
                                                id={`time-${group.id}`}
                                                type="time"
                                                value={group.time}
                                                onChange={(e) =>
                                                    updateScheduleTime(
                                                        group.id,
                                                        e.target.value,
                                                    )
                                                }
                                                variant="outlined"
                                                size="small"
                                                fullWidth
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
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addScheduleGroup}
                                    className="h-11 w-full bg-transparent hover:bg-primary/5"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Agregar Grupo de Horario
                                </Button>
                            </div>
                        </div>

                        {/* Capacidad y Duración */}
                        <div className="space-y-6 border-b pb-6">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">
                                    Capacidad y Duración
                                </h2>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            Cupo Máximo
                                        </Label>
                                        <Stack direction="row" spacing={1}>
                                            <Chip
                                                label={`${formData.maxCapacity} personas`}
                                                color="primary"
                                                size="small"
                                            />
                                        </Stack>
                                    </div>
                                    <div className="px-2">
                                        <Slider
                                            value={formData.maxCapacity}
                                            onChange={(_, value) =>
                                                updateField(
                                                    'maxCapacity',
                                                    value,
                                                )
                                            }
                                            min={1}
                                            max={20}
                                            step={1}
                                            marks={[
                                                { value: 1, label: '1' },
                                                { value: 5, label: '5' },
                                                { value: 10, label: '10' },
                                                { value: 15, label: '15' },
                                                { value: 20, label: '20' },
                                            ]}
                                            valueLabelDisplay="auto"
                                            sx={{
                                                color: 'hsl(var(--primary))',
                                                '& .MuiSlider-thumb': {
                                                    backgroundColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '& .MuiSlider-track': {
                                                    backgroundColor:
                                                        'hsl(var(--primary))',
                                                },
                                                '& .MuiSlider-rail': {
                                                    backgroundColor:
                                                        'hsl(var(--muted))',
                                                },
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Duración de la Clase
                                        </Label>
                                        <Stack direction="row" spacing={1}>
                                            <Chip
                                                label={`${formData.duration} minutos`}
                                                color="secondary"
                                                size="small"
                                            />
                                        </Stack>
                                    </div>
                                    <div className="px-2">
                                        <Slider
                                            value={formData.duration}
                                            onChange={(_, value) =>
                                                updateField('duration', value)
                                            }
                                            min={30}
                                            max={120}
                                            step={15}
                                            marks={[
                                                { value: 30, label: '30min' },
                                                { value: 60, label: '1h' },
                                                { value: 90, label: '1.5h' },
                                                { value: 120, label: '2h' },
                                            ]}
                                            valueLabelDisplay="auto"
                                            sx={{
                                                color: 'hsl(var(--secondary))',
                                                '& .MuiSlider-thumb': {
                                                    backgroundColor:
                                                        'hsl(var(--secondary))',
                                                },
                                                '& .MuiSlider-track': {
                                                    backgroundColor:
                                                        'hsl(var(--secondary))',
                                                },
                                                '& .MuiSlider-rail': {
                                                    backgroundColor:
                                                        'hsl(var(--muted))',
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Link href="/clases">
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
                                Crear Clase
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
