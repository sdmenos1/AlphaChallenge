import { HeaderWrapper } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { GraduationCap, Leaf, Cpu, Cog, Radio, Briefcase } from "lucide-react"

export default function CarrerasPage() {
  const carreras = [
    {
      icon: Leaf,
      nombre: "Ingeniería Ambiental",
      descripcion:
        "Forma profesionales capaces de diseñar, implementar y gestionar soluciones para la protección del medio ambiente y el desarrollo sostenible.",
      color: "from-green-500 to-emerald-600",
      areas: ["Gestión Ambiental", "Tratamiento de Aguas", "Energías Renovables", "Evaluación de Impacto Ambiental"],
    },
    {
      icon: Cpu,
      nombre: "Ingeniería de Sistemas",
      descripcion:
        "Prepara profesionales en el desarrollo de software, gestión de tecnologías de información y soluciones informáticas innovadoras.",
      color: "from-blue-500 to-cyan-600",
      areas: ["Desarrollo de Software", "Inteligencia Artificial", "Ciberseguridad", "Bases de Datos"],
    },
    {
      icon: Cog,
      nombre: "Ingeniería Mecánica y Eléctrica",
      descripcion:
        "Forma ingenieros especializados en diseño mecánico, sistemas eléctricos y automatización industrial.",
      color: "from-orange-500 to-red-600",
      areas: ["Diseño Mecánico", "Sistemas Eléctricos", "Automatización", "Energía"],
    },
    {
      icon: Radio,
      nombre: "Ingeniería Electrónica y Telecomunicaciones",
      descripcion:
        "Capacita profesionales en sistemas electrónicos, redes de comunicación y tecnologías de telecomunicaciones.",
      color: "from-purple-500 to-pink-600",
      areas: ["Telecomunicaciones", "Sistemas Digitales", "Redes", "IoT"],
    },
    {
      icon: Briefcase,
      nombre: "Administración de Empresas",
      descripcion:
        "Desarrolla líderes empresariales con visión estratégica, capacidad de gestión y espíritu emprendedor.",
      color: "from-yellow-500 to-amber-600",
      areas: ["Gestión Empresarial", "Marketing", "Finanzas", "Emprendimiento"],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/estudiantes-universitarios-tecnologia.jpg')] opacity-10 bg-cover bg-center" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <GraduationCap className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-balance">Carreras Profesionales</h1>
              <p className="text-xl md:text-2xl font-semibold text-white/90">
                5 programas académicos de excelencia tecnológica
              </p>
            </div>
          </div>
        </section>

        {/* Carreras Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {carreras.map((carrera, index) => {
                const Icon = carrera.icon
                return (
                  <div
                    key={index}
                    className="bg-background rounded-3xl p-8 shadow-lg border border-border hover:shadow-2xl transition-all group"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div
                        className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${carrera.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-10 w-10 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-3xl font-black text-foreground mb-3">{carrera.nombre}</h3>
                        <p className="text-lg text-foreground/80 mb-6 leading-relaxed">{carrera.descripcion}</p>

                        <div>
                          <h4 className="text-sm font-bold text-primary mb-3">Áreas de Especialización:</h4>
                          <div className="flex flex-wrap gap-2">
                            {carrera.areas.map((area, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 bg-muted rounded-full text-sm font-semibold text-foreground/70 border border-border"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-black text-foreground mb-6">¿Listo para tu futuro?</h2>
              <p className="text-xl text-foreground/70 mb-8">
                Únete a la comunidad UNTELS y forma parte de la próxima generación de profesionales tecnológicos del
                Perú.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.untels.edu.pe/03admision.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Proceso de Admisión
                </a>
                <a
                  href="/"
                  className="px-8 py-4 bg-background border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
                >
                  Volver al Inicio
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
