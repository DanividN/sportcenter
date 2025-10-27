import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  UserCog,
  Calendar,
  Settings,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ClipboardList,
  Trophy,
  UserPlus,
} from "lucide-react"

export function AdminSidebar() {
  const [expandedMenus, setExpandedMenus] = useState(["clases"])

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      href: "/dashboard",
    },
    {
      title: "Clases",
      icon: <Calendar className="w-4 h-4" />,
      href: "/clases",
    },
    {
      title: "Afiliados",
      icon: <Users className="w-4 h-4" />,
      href: "/afiliados",
    },
    {
      title: "Trabajadores",
      icon: <UserCog className="w-4 h-4" />,
      href: "/trabajadores",
    },
    {
      title: "Disciplinas",
      icon: <Trophy className="w-4 h-4" />,
      href: "/disciplinas",
    },
    {
      title: "Usuarios",
      icon: <UserPlus className="w-4 h-4" />,
      href: "/usuarios",
    },
    {
        title: "Planes",
        icon: <ClipboardList className="w-4 h-4" />,
        href: "/planes",
    },
    {
      title: "Reportes",
      icon: <ClipboardList className="w-4 h-4" />,
      submenu: [
        { title: "Asistencias", href: "/reportes/asistencias" },
        { title: "Ingresos", href: "/reportes/ingresos" },
        { title: "Clases Populares", href: "/reportes/clases" },
      ],
    },
    {
      title: "Configuración",
      icon: <Settings className="w-4 h-4" />,
      href: "/configuracion",
    },
  ]

  const toggleMenu = (title) => {
    setExpandedMenus((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <aside className="w-64 bg-[#2A3F54] text-white h-screen fixed left-0 top-0 overflow-y-auto flex flex-col">
      {/* Logo y Nombre */}
      <div className="p-4 border-b border-[#1f2f3f]">
        <a href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-[#2A3F54]" />
          </div>
          <div>
            <h1 className="font-bold text-lg">SportCenter</h1>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </a>
      </div>

      {/* Perfil de Usuario */}
      <div className="p-4 border-b border-[#1f2f3f]">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback className="bg-[#1ABB9C] text-white">AF</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Anthony Fernando</p>
            <p className="text-xs text-gray-400">Administrador</p>
          </div>
        </div>
      </div>

      {/* Menú de Navegación */}
      <nav className="flex-1 py-4">
        <div className="px-3 mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">General</p>
        </div>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-[#1f2f3f] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {expandedMenus.includes(item.title) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedMenus.includes(item.title) && (
                    <ul className="bg-[#1f2f3f] py-1">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.href}>
                          <a
                            href={subitem.href}
                            className="block px-4 py-2 pl-12 text-sm text-gray-300 hover:bg-[#172533] hover:text-white transition-colors"
                          >
                            {subitem.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <a
                  href={item.href || "#"}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#1f2f3f] transition-colors"
                >
                  {item.icon}
                  <span>{item.title}</span>
                  {item.badge && <span className="ml-auto bg-[#1ABB9C] text-xs px-2 py-0.5 rounded">{item.badge}</span>}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer del Sidebar */}
      <div className="p-4 border-t border-[#1f2f3f]">
        <p className="text-xs text-gray-400 text-center">© 2025 SportCenter</p>
      </div>
    </aside>
  )
}
