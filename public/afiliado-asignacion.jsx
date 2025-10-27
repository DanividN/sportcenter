import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Search, UserCheck, Calendar } from "lucide-react"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Chip from "@mui/material/Chip"


// Datos de ejemplo
const affiliatesData = [
  {
    id: "1",
    nombre: "Juan Pérez García",
    foto: "/img/hombre.jpg",
    edad: 28,
    telefono: "5551234567",
    email: "juan.perez@email.com",
    estado: "activo",
    disciplinas: ["Natación"],
    clases: ["Natación Intermedio - Lunes 8:00"],
  },
  {
    id: "2",
    nombre: "María López Hernández",
    foto: "/img/mujer-sonriente.jpg",
    edad: 32,
    telefono: "5559876543",
    email: "maria.lopez@email.com",
    estado: "activo",
    disciplinas: ["Fútbol", "Volleyball"],
    clases: ["Fútbol Avanzado - Martes 10:00", "Volleyball Principiante - Jueves 16:00"],
  },
  {
    id: "3",
    nombre: "Carlos Pérez Soto",
    foto: "/img/athletic-man.jpg",
    edad: 15,
    telefono: "5556543210",
    email: "carlos.ramirez@email.com",
    estado: "activo",
    disciplinas: [],
    clases: [],
  },
  {
    id: "4",
    nombre: "Ana Pérez López",
    foto: "/img/niña-atletica.jpg",
    edad: 12,
    telefono: "5554567890",
    email: "ana.martinez@email.com",
    estado: "activo",
    disciplinas: ["Tennis"],
    clases: ["Tennis Intermedio - Viernes 14:00"],
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
  natacion: [
    { id: "nat1", name: "Natación Principiante - Lunes 8:00", cupo: 15, inscritos: 12 },
    { id: "nat2", name: "Natación Intermedio - Lunes 8:00", cupo: 12, inscritos: 10 },
    { id: "nat3", name: "Natación Avanzado - Miércoles 10:00", cupo: 10, inscritos: 8 },
  ],
  futbol: [
    { id: "fut1", name: "Fútbol Principiante - Martes 9:00", cupo: 20, inscritos: 18 },
    { id: "fut2", name: "Fútbol Avanzado - Martes 10:00", cupo: 20, inscritos: 15 },
  ],
  basquetbol: [
    { id: "bas1", name: "Basquetbol Principiante - Jueves 8:00", cupo: 16, inscritos: 14 },
    { id: "bas2", name: "Basquetbol Intermedio - Jueves 10:00", cupo: 16, inscritos: 12 },
  ],
  volleyball: [
    { id: "vol1", name: "Volleyball Principiante - Jueves 16:00", cupo: 18, inscritos: 16 },
    { id: "vol2", name: "Volleyball Avanzado - Viernes 16:00", cupo: 14, inscritos: 10 },
  ],
  tennis: [
    { id: "ten1", name: "Tennis Principiante - Viernes 14:00", cupo: 8, inscritos: 6 },
    { id: "ten2", name: "Tennis Intermedio - Viernes 14:00", cupo: 8, inscritos: 7 },
  ],
  padel: [
    { id: "pad1", name: "Padel Principiante - Sábado 10:00", cupo: 12, inscritos: 10 },
    { id: "pad2", name: "Padel Avanzado - Sábado 12:00", cupo: 10, inscritos: 8 },
  ],
}

export function AffiliateAssignment() {
  const [affiliates, setAffiliates] = useState(affiliatesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAffiliate, setSelectedAffiliate] = useState(null)
  const [selectedDisciplines, setSelectedDisciplines] = useState([])
  const [selectedClasses, setSelectedClasses] = useState([])

  const filteredAffiliates = affiliates.filter(
    (affiliate) =>
      affiliate.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelectAffiliate = (affiliate) => {
    setSelectedAffiliate(affiliate)
    setSelectedDisciplines(affiliate.disciplinas || [])
    setSelectedClasses(affiliate.clases || [])
  }

  const handleDisciplineToggle = (disciplineName) => {
    setSelectedDisciplines((prev) =>
      prev.includes(disciplineName) ? prev.filter((d) => d !== disciplineName) : [...prev, disciplineName],
    )
  }

  const handleClassToggle = (className) => {
    setSelectedClasses((prev) =>
      prev.includes(className) ? prev.filter((c) => c !== className) : [...prev, className],
    )
  }

  const handleSaveAssignment = () => {
    if (selectedAffiliate) {
      setAffiliates(
        affiliates.map((affiliate) =>
          affiliate.id === selectedAffiliate.id
            ? { ...affiliate, disciplinas: selectedDisciplines, clases: selectedClasses }
            : affiliate,
        ),
      )
      alert("Asignación guardada exitosamente")
      setSelectedAffiliate(null)
    }
  }

  const getAvailableClasses = () => {
    const classes = []
    selectedDisciplines.forEach((disciplina) => {
      const disciplinaKey = disciplina
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
      if (clasesDisponibles[disciplinaKey]) {
        classes.push(...clasesDisponibles[disciplinaKey])
      }
    })
    return classes
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
                {filteredAffiliates.map((affiliate) => (
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
                        {affiliate.disciplinas.length > 0 && (
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {affiliate.disciplinas.slice(0, 2).map((disc, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0">
                                {disc}
                              </Badge>
                            ))}
                            {affiliate.disciplinas.length > 2 && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                +{affiliate.disciplinas.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                  {/* Selección de Disciplinas */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Disciplinas Deportivas</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      {disciplinasDisponibles.map((disciplina) => (
                        <div
                          key={disciplina.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedDisciplines.includes(disciplina.name)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleDisciplineToggle(disciplina.name)}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedDisciplines.includes(disciplina.name)}
                                sx={{
                                  color: disciplina.color,
                                  "&.Mui-checked": {
                                    color: disciplina.color,
                                  },
                                }}
                              />
                            }
                            label={
                              <span className="font-medium" style={{ color: disciplina.color }}>
                                {disciplina.name}
                              </span>
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selección de Clases */}
                  {selectedDisciplines.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Clases Disponibles</h3>
                      </div>

                      <div className="space-y-3">
                        {getAvailableClasses().map((clase) => {
                          const cupoDisponible = clase.cupo - clase.inscritos
                          const porcentajeLleno = (clase.inscritos / clase.cupo) * 100

                          return (
                            <div
                              key={clase.id}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedClasses.includes(clase.name)
                                  ? "border-primary bg-primary/5"
                                  : cupoDisponible === 0
                                    ? "border-destructive/30 bg-destructive/5 cursor-not-allowed opacity-60"
                                    : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => cupoDisponible > 0 && handleClassToggle(clase.name)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                  <Checkbox
                                    checked={selectedClasses.includes(clase.name)}
                                    disabled={cupoDisponible === 0 && !selectedClasses.includes(clase.name)}
                                    sx={{
                                      "&.Mui-checked": {
                                        color: "hsl(var(--primary))",
                                      },
                                    }}
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{clase.name}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                                        <div
                                          className={`h-full transition-all ${
                                            porcentajeLleno >= 90
                                              ? "bg-destructive"
                                              : porcentajeLleno >= 70
                                                ? "bg-yellow-500"
                                                : "bg-primary"
                                          }`}
                                          style={{ width: `${porcentajeLleno}%` }}
                                        />
                                      </div>
                                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {clase.inscritos}/{clase.cupo}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Chip
                                  label={cupoDisponible === 0 ? "Lleno" : `${cupoDisponible} disponibles`}
                                  size="small"
                                  sx={{
                                    backgroundColor:
                                      cupoDisponible === 0
                                        ? "hsl(var(--destructive))"
                                        : cupoDisponible <= 3
                                          ? "#f59e0b"
                                          : "hsl(var(--primary))",
                                    color: "white",
                                    fontWeight: 600,
                                  }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Botones de Acción */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedAffiliate(null)}
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
