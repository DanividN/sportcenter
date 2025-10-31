import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Search, UserCheck, Calendar, Trash2 } from "lucide-react"
import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"

// Datos de ejemplo
const affiliatesData = [
  {
    id: "1",
    nombre: "Juan Pérez García",
    foto: "/hombre.png",
    edad: 28,
    telefono: "5551234567",
    email: "juan.perez@email.com",
    estado: "activo",
    disciplinasAsignadas: [],
  },
  {
    id: "2",
    nombre: "María López Hernández",
    foto: "/mujer-sonriente.png",
    edad: 32,
    telefono: "5559876543",
    email: "maria.lopez@email.com",
    estado: "activo",
    disciplinasAsignadas: [],
  },
  {
    id: "3",
    nombre: "Carlos Ramírez Soto",
    foto: "/athletic-man.png",
    edad: 25,
    telefono: "5556543210",
    email: "carlos.ramirez@email.com",
    estado: "activo",
    disciplinasAsignadas: [],
  },
  {
    id: "4",
    nombre: "Ana Martínez Cruz",
    foto: "/mujer-deportista.jpg",
    edad: 30,
    telefono: "5554567890",
    email: "ana.martinez@email.com",
    estado: "activo",
    disciplinasAsignadas: [],
  },
]

const disciplinasDisponibles = [
  { id: "natacion", name: "Natación", color: "#3b82f6" },
  { id: "futbol", name: "Fútbol", color: "#10b981" },
  { id: "basquetbol", name: "Basquetbol", color: "#f59e0b" },
  { id: "volleyball", name: "Volleyball", color: "#8b5cf6" },
  { id: "tennis", name: "Tennis", color: "#ec4899" },
  { id: "padel", name: "Padel", color: "#06b6d4" },
]

const clasesDisponibles = {
  natacion: {
    Lunes: [
      { id: "nat-lun-1", hora: "08:00 AM", nivel: "Principiante", cupo: 15, inscritos: 12 },
      { id: "nat-lun-2", hora: "10:00 AM", nivel: "Intermedio", cupo: 12, inscritos: 10 },
      { id: "nat-lun-3", hora: "04:00 PM", nivel: "Avanzado", cupo: 10, inscritos: 10 },
    ],
    Martes: [
      { id: "nat-mar-1", hora: "09:00 AM", nivel: "Principiante", cupo: 15, inscritos: 10 },
      { id: "nat-mar-2", hora: "02:00 PM", nivel: "Intermedio", cupo: 12, inscritos: 8 },
    ],
    Miércoles: [
      { id: "nat-mie-1", hora: "08:00 AM", nivel: "Avanzado", cupo: 10, inscritos: 5 },
      { id: "nat-mie-2", hora: "04:00 PM", nivel: "Principiante", cupo: 15, inscritos: 14 },
    ],
    Jueves: [
      { id: "nat-jue-1", hora: "09:00 AM", nivel: "Intermedio", cupo: 12, inscritos: 10 },
      { id: "nat-jue-2", hora: "05:00 PM", nivel: "Avanzado", cupo: 10, inscritos: 8 },
    ],
    Viernes: [
      { id: "nat-vie-1", hora: "10:00 AM", nivel: "Principiante", cupo: 15, inscritos: 9 },
      { id: "nat-vie-2", hora: "03:00 PM", nivel: "Intermedio", cupo: 12, inscritos: 11 },
    ],
    Sábado: [{ id: "nat-sab-1", hora: "09:00 AM", nivel: "Principiante", cupo: 20, inscritos: 15 }],
    Domingo: [{ id: "nat-dom-1", hora: "10:00 AM", nivel: "Intermedio", cupo: 15, inscritos: 12 }],
  },
  futbol: {
    Lunes: [
      { id: "fut-lun-1", hora: "09:00 AM", nivel: "Principiante", cupo: 20, inscritos: 15 },
      { id: "fut-lun-2", hora: "03:00 PM", nivel: "Avanzado", cupo: 18, inscritos: 18 },
    ],
    Miércoles: [
      { id: "fut-mie-1", hora: "10:00 AM", nivel: "Intermedio", cupo: 20, inscritos: 17 },
      { id: "fut-mie-2", hora: "04:00 PM", nivel: "Principiante", cupo: 20, inscritos: 12 },
    ],
    Viernes: [{ id: "fut-vie-1", hora: "11:00 AM", nivel: "Avanzado", cupo: 18, inscritos: 16 }],
    Sábado: [
      { id: "fut-sab-1", hora: "08:00 AM", nivel: "Principiante", cupo: 22, inscritos: 18 },
      { id: "fut-sab-2", hora: "10:00 AM", nivel: "Intermedio", cupo: 20, inscritos: 15 },
    ],
  },
  basquetbol: {
    Martes: [
      { id: "bas-mar-1", hora: "08:00 AM", nivel: "Principiante", cupo: 16, inscritos: 14 },
      { id: "bas-mar-2", hora: "04:00 PM", nivel: "Intermedio", cupo: 16, inscritos: 12 },
    ],
    Jueves: [
      { id: "bas-jue-1", hora: "09:00 AM", nivel: "Avanzado", cupo: 14, inscritos: 10 },
      { id: "bas-jue-2", hora: "05:00 PM", nivel: "Principiante", cupo: 16, inscritos: 15 },
    ],
    Sábado: [{ id: "bas-sab-1", hora: "11:00 AM", nivel: "Intermedio", cupo: 16, inscritos: 14 }],
  },
  volleyball: {
    Lunes: [{ id: "vol-lun-1", hora: "02:00 PM", nivel: "Principiante", cupo: 18, inscritos: 16 }],
    Miércoles: [{ id: "vol-mie-1", hora: "03:00 PM", nivel: "Intermedio", cupo: 16, inscritos: 12 }],
    Jueves: [{ id: "vol-jue-1", hora: "04:00 PM", nivel: "Principiante", cupo: 18, inscritos: 16 }],
    Viernes: [{ id: "vol-vie-1", hora: "04:00 PM", nivel: "Avanzado", cupo: 14, inscritos: 10 }],
  },
  tennis: {
    Martes: [{ id: "ten-mar-1", hora: "02:00 PM", nivel: "Principiante", cupo: 8, inscritos: 6 }],
    Jueves: [{ id: "ten-jue-1", hora: "03:00 PM", nivel: "Intermedio", cupo: 8, inscritos: 7 }],
    Viernes: [{ id: "ten-vie-1", hora: "02:00 PM", nivel: "Intermedio", cupo: 8, inscritos: 7 }],
    Sábado: [
      { id: "ten-sab-1", hora: "09:00 AM", nivel: "Avanzado", cupo: 6, inscritos: 5 },
      { id: "ten-sab-2", hora: "11:00 AM", nivel: "Principiante", cupo: 8, inscritos: 6 },
    ],
  },
  padel: {
    Miércoles: [{ id: "pad-mie-1", hora: "05:00 PM", nivel: "Principiante", cupo: 12, inscritos: 10 }],
    Viernes: [{ id: "pad-vie-1", hora: "06:00 PM", nivel: "Intermedio", cupo: 10, inscritos: 8 }],
    Sábado: [
      { id: "pad-sab-1", hora: "10:00 AM", nivel: "Principiante", cupo: 12, inscritos: 10 },
      { id: "pad-sab-2", hora: "12:00 PM", nivel: "Avanzado", cupo: 10, inscritos: 8 },
    ],
    Domingo: [{ id: "pad-dom-1", hora: "09:00 AM", nivel: "Intermedio", cupo: 12, inscritos: 9 }],
  },
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export default function AffiliateAssignment() {
  const [affiliates, setAffiliates] = useState(affiliatesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAffiliate, setSelectedAffiliate] = useState(null)
  const [selectedDisciplines, setSelectedDisciplines] = useState([])

  const filteredAffiliates = affiliates.filter(
    (affiliate) =>
      affiliate.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAffiliate = (affiliate) => {
    setSelectedAffiliate(affiliate)
    setSelectedDisciplines(affiliate.disciplinasAsignadas || [])
  }

  const handleAddDiscipline = () => {
    setSelectedDisciplines((prev) => [
      ...prev,
      {
        disciplina: "",
        nivel: "",
        clasesPorSemana: 1,
        clasesSeleccionadas: {},
      },
    ])
  }

  const handleRemoveDiscipline = (index) => {
    const nuevas = [...selectedDisciplines]
    nuevas.splice(index, 1)
    setSelectedDisciplines(nuevas)
  }

  const handleUpdateDiscipline = (index, field, value) => {
    const nuevas = [...selectedDisciplines]
    nuevas[index][field] = value
    if (field === "disciplina") {
      nuevas[index].clasesSeleccionadas = {}
    }
    setSelectedDisciplines(nuevas)
  }

  const handleSelectClass = (disciplineIndex, dia, claseId) => {
    const nuevas = [...selectedDisciplines]
    const disciplinaKey = nuevas[disciplineIndex].disciplina
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

    if (claseId === "") {
      delete nuevas[disciplineIndex].clasesSeleccionadas[dia]
    } else {
      const clasesDia = clasesDisponibles[disciplinaKey]?.[dia] || []
      const claseSel = clasesDia.find((c) => c.id === claseId)
      nuevas[disciplineIndex].clasesSeleccionadas[dia] = claseSel
    }
    setSelectedDisciplines(nuevas)
  }

  const handleSaveAssignment = () => {
    if (selectedAffiliate) {
      setAffiliates(
        affiliates.map((affiliate) =>
          affiliate.id === selectedAffiliate.id
            ? { ...affiliate, disciplinasAsignadas: selectedDisciplines }
            : affiliate,
        ),
      )
      alert("Asignación guardada exitosamente")
      setSelectedAffiliate(null)
      setSelectedDisciplines([])
    }
  }

  const getDisciplinasResumen = (disciplinasAsignadas) => {
    if (!disciplinasAsignadas || disciplinasAsignadas.length === 0) return []
    return disciplinasAsignadas.filter((d) => d.disciplina).map((d) => d.disciplina)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <UserCheck className="h-7 w-7 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Asignación de Disciplinas y Clases</h1>
              <p className="text-sm text-muted-foreground">Gestión de Afiliados / Asignar Clases</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Lista de Afiliados */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-background rounded-lg shadow-sm border p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Afiliados</h2>
              </div>

              {/* Buscador */}
              <div className="mb-4">
                <TextField
                  placeholder="Buscar afiliado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: <Search className="h-4 w-4 mr-2 text-muted-foreground" />,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: "40px",
                      "&:hover fieldset": {
                        borderColor: "hsl(var(--primary))",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "hsl(var(--primary))",
                      },
                    },
                  }}
                />
              </div>

              {/* Cards de Afiliados */}
              <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                {filteredAffiliates.map((affiliate) => {
                  const disciplinas = getDisciplinasResumen(affiliate.disciplinasAsignadas)
                  return (
                    <div
                      key={affiliate.id}
                      onClick={() => handleSelectAffiliate(affiliate)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedAffiliate?.id === affiliate.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={affiliate.foto || "/placeholder.svg"}
                          alt={affiliate.nombre}
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{affiliate.nombre}</h3>
                          <p className="text-xs text-muted-foreground">{affiliate.edad} años</p>
                          {disciplinas.length > 0 && (
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {disciplinas.slice(0, 2).map((disc, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0">
                                  {disc}
                                </Badge>
                              ))}
                              {disciplinas.length > 2 && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                  +{disciplinas.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Panel de Asignación */}
          <div className="lg:col-span-2">
            {selectedAffiliate ? (
              <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
                {/* Header del Afiliado Seleccionado */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedAffiliate.foto || "/placeholder.svg"}
                      alt={selectedAffiliate.nombre}
                      className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-foreground mb-1">{selectedAffiliate.nombre}</h2>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {selectedAffiliate.edad} años
                        </span>
                        <span>📞 {selectedAffiliate.telefono}</span>
                        <span>✉️ {selectedAffiliate.email}</span>
                      </div>
                      <Badge className="mt-2" variant={selectedAffiliate.estado === "activo" ? "default" : "secondary"}>
                        {selectedAffiliate.estado}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Disciplinas</h3>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddDiscipline}
                        className="gap-2 bg-transparent"
                      >
                        + Añadir disciplina
                      </Button>
                    </div>

                    {selectedDisciplines.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No hay disciplinas seleccionadas aún. Haz clic en "Añadir disciplina" para comenzar.
                      </p>
                    )}

                    <div className="space-y-6">
                      {selectedDisciplines.map((item, index) => {
                        const disciplinaKey = item.disciplina
                          ?.toLowerCase()
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                        const disciplinaColor =
                          disciplinasDisponibles.find((d) => d.name === item.disciplina)?.color || "#3b82f6"

                        return (
                          <div
                            key={index}
                            className="border-2 rounded-lg p-4 bg-muted/30 shadow-sm space-y-4"
                            style={{ borderColor: item.disciplina ? disciplinaColor + "40" : "#e5e7eb" }}
                          >
                            {/* Encabezado */}
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-base">Disciplina #{index + 1}</h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveDiscipline(index)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Eliminar
                              </Button>
                            </div>

                            {/* Selects de configuración */}
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={4}>
                                <FormControl fullWidth size="small" variant="outlined">
                                  <InputLabel>Disciplina</InputLabel>
                                  <Select
                                    value={item.disciplina}
                                    label="Disciplina"
                                    onChange={(e) => handleUpdateDiscipline(index, "disciplina", e.target.value)}
                                    sx={{
                                      "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: item.disciplina ? disciplinaColor : undefined,
                                      },
                                      "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: item.disciplina ? disciplinaColor : undefined,
                                      },
                                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: item.disciplina ? disciplinaColor : undefined,
                                      },
                                    }}
                                  >
                                    {disciplinasDisponibles.map((d) => (
                                      <MenuItem key={d.id} value={d.name}>
                                        <span style={{ color: d.color, fontWeight: 600 }}>{d.name}</span>
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} md={4}>
                                <FormControl fullWidth size="small" variant="outlined" disabled={!item.disciplina}>
                                  <InputLabel>Nivel</InputLabel>
                                  <Select
                                    value={item.nivel}
                                    label="Nivel"
                                    onChange={(e) => handleUpdateDiscipline(index, "nivel", e.target.value)}
                                  >
                                    <MenuItem value="Principiante">Principiante</MenuItem>
                                    <MenuItem value="Intermedio">Intermedio</MenuItem>
                                    <MenuItem value="Avanzado">Avanzado</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} md={4}>
                                <FormControl fullWidth size="small" variant="outlined" disabled={!item.disciplina}>
                                  <InputLabel>Clases por semana</InputLabel>
                                  <Select
                                    value={item.clasesPorSemana}
                                    label="Clases por semana"
                                    onChange={(e) => handleUpdateDiscipline(index, "clasesPorSemana", e.target.value)}
                                  >
                                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                      <MenuItem key={num} value={num}>
                                        {num}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>

                            {item.disciplina && (
                              <div>
                                <h5 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  Clases disponibles por día
                                </h5>
                                <div className="grid grid-cols-7 gap-2">
                                  {diasSemana.map((dia) => {
                                    const clasesDia = clasesDisponibles[disciplinaKey]?.[dia] || []
                                    const disponibles = clasesDia.filter(
                                      (c) => c.cupo > c.inscritos && (!item.nivel || c.nivel === item.nivel),
                                    )

                                    const claseSeleccionada = item.clasesSeleccionadas[dia]
                                    const clasesSeleccionadasCount = Object.keys(item.clasesSeleccionadas).length
                                    const puedeAgregar =
                                      clasesSeleccionadasCount < item.clasesPorSemana || claseSeleccionada

                                    return (
                                      <div
                                        key={dia}
                                        className="p-2 rounded-lg border-2 text-sm bg-background shadow-sm transition-all"
                                        style={{
                                          borderColor: claseSeleccionada ? disciplinaColor : "#e5e7eb",
                                          backgroundColor: claseSeleccionada ? `${disciplinaColor}15` : "#ffffff",
                                        }}
                                      >
                                        <div className="font-semibold mb-2 text-center text-xs">{dia.slice(0, 3)}</div>

                                        {disponibles.length > 0 ? (
                                          <FormControl size="small" fullWidth disabled={!puedeAgregar}>
                                            <Select
                                              value={claseSeleccionada?.id || ""}
                                              onChange={(e) => handleSelectClass(index, dia, e.target.value)}
                                              displayEmpty
                                              sx={{
                                                fontSize: "0.75rem",
                                                "& .MuiSelect-select": {
                                                  padding: "4px 8px",
                                                },
                                              }}
                                            >
                                              <MenuItem value="" sx={{ fontSize: "0.75rem" }}>
                                                -- Sin clase --
                                              </MenuItem>
                                              {disponibles.map((c) => (
                                                <MenuItem key={c.id} value={c.id} sx={{ fontSize: "0.75rem" }}>
                                                  {c.hora} ({c.cupo - c.inscritos} disp.)
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        ) : (
                                          <p className="text-xs text-muted-foreground text-center">Sin clases</p>
                                        )}
                                      </div>
                                    )
                                  })}
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 text-right">
                                  Seleccionadas: {Object.keys(item.clasesSeleccionadas).length} / {item.clasesPorSemana}{" "}
                                  clase{item.clasesPorSemana > 1 ? "s" : ""}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Botones de Acción */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedAffiliate(null)
                        setSelectedDisciplines([])
                      }}
                      className="min-w-[120px]"
                    >
                      Cancelar
                    </Button>
                    <Button type="button" onClick={handleSaveAssignment} className="min-w-[120px]">
                      Guardar Asignación
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-background rounded-lg shadow-sm border p-12 text-center">
                <UserCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">Selecciona un Afiliado</h3>
                <p className="text-sm text-muted-foreground">
                  Elige un afiliado de la lista para asignarle disciplinas y clases
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
