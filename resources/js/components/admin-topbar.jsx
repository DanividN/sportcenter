import { Bell, Search, User, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function AdminTopbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-6">
      {/* Buscador */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Buscar clases, afiliados, trabajadores..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Acciones del Usuario */}
      <div className="flex items-center gap-4">
        {/* Notificaciones */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                3
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <div className="p-3 hover:bg-gray-50 cursor-pointer border-b">
                <p className="text-sm font-medium">Nueva inscripción</p>
                <p className="text-xs text-gray-500 mt-1">Juan Pérez se inscribió a Natación Avanzada</p>
                <p className="text-xs text-gray-400 mt-1">Hace 5 minutos</p>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer border-b">
                <p className="text-sm font-medium">Clase cancelada</p>
                <p className="text-xs text-gray-500 mt-1">Fútbol Intermedio - Lunes 10:00 AM</p>
                <p className="text-xs text-gray-400 mt-1">Hace 1 hora</p>
              </div>
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm font-medium">Nuevo maestro registrado</p>
                <p className="text-xs text-gray-500 mt-1">María González - Instructora de Volleyball</p>
                <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Perfil de Usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#1ABB9C] text-white text-sm">AF</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">Anthony Fernando</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
