import { HeaderWrapper } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { Leaf, Recycle, Lightbulb, Droplets, TreePine, Wind } from "lucide-react"

export default function SostenibilidadPage() {
  const iniciativas = [
    {
      icon: Recycle,
      titulo: "Gestión de Residuos",
      descripcion:
        "Programa integral de reciclaje y manejo responsable de residuos sólidos en todo el campus universitario.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Lightbulb,
      titulo: "Eficiencia Energética",
      descripcion: "Implementación de tecnologías LED y sistemas de ahorro energético en todas las instalaciones.",
      color: "from-yellow-500 to-amber-600",
    },
    {
      icon: Droplets,
      titulo: "Conservación del Agua",
      descripcion: "Sistemas de captación de agua de lluvia y uso eficiente del recurso hídrico.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: TreePine,
      titulo: "Áreas Verdes",
      descripcion: "Mantenimiento y expansión de espacios verdes que mejoran la calidad ambiental del campus.",
      color: "from-lime-500 to-green-600",
    },
    {
      icon: Wind,
      titulo: "Calidad del Aire",
      descripcion: "Monitoreo constante y acciones para mantener un ambiente saludable y libre de contaminación.",
      color: "from-sky-500 to-blue-600",
    },
    {
      icon: Leaf,
      titulo: "Educación Ambiental",
      descripcion: "Talleres y campañas de concientización sobre prácticas sostenibles para toda la comunidad.",
      color: "from-teal-500 to-emerald-600",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/naturaleza-sostenibilidad-verde.jpg')] opacity-10 bg-cover bg-center" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Leaf className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-balance">Sostenibilidad en UNTELS</h1>
              <p className="text-xl md:text-2xl font-semibold text-white/90">
                Comprometidos con el desarrollo sostenible y el cuidado del medio ambiente
              </p>
            </div>
          </div>
        </section>

        {/* Compromiso */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-black text-foreground mb-6">Nuestro Compromiso</h2>
              <p className="text-xl text-foreground/80 leading-relaxed mb-8">
                En UNTELS, la sostenibilidad es parte fundamental de nuestra misión educativa. Formamos profesionales
                con conciencia ambiental y promovemos prácticas que contribuyen al desarrollo sostenible de nuestra
                comunidad y el planeta.
              </p>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-3xl p-8 border-2 border-green-200 dark:border-green-800">
                <p className="text-lg font-semibold text-foreground/90 italic">
                  "La sostenibilidad no es solo una meta, es nuestra responsabilidad con las futuras generaciones"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Iniciativas */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-black text-foreground mb-12 text-center">Iniciativas Sostenibles</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {iniciativas.map((iniciativa, index) => {
                  const Icon = iniciativa.icon
                  return (
                    <div
                      key={index}
                      className="bg-background rounded-3xl p-6 shadow-lg border border-border hover:shadow-2xl hover:scale-105 transition-all group"
                    >
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iniciativa.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">{iniciativa.titulo}</h3>
                      <p className="text-foreground/70 leading-relaxed">{iniciativa.descripcion}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Objetivos de Desarrollo Sostenible */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-black text-foreground mb-8 text-center">
                Objetivos de Desarrollo Sostenible
              </h2>
              <p className="text-lg text-foreground/80 text-center mb-12">
                Alineados con los ODS de las Naciones Unidas, trabajamos activamente en:
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    numero: "7",
                    titulo: "Energía Asequible y No Contaminante",
                    desc: "Promoviendo el uso de energías limpias",
                  },
                  {
                    numero: "11",
                    titulo: "Ciudades y Comunidades Sostenibles",
                    desc: "Contribuyendo al desarrollo urbano sostenible",
                  },
                  {
                    numero: "12",
                    titulo: "Producción y Consumo Responsables",
                    desc: "Fomentando prácticas de consumo consciente",
                  },
                  { numero: "13", titulo: "Acción por el Clima", desc: "Educando sobre el cambio climático" },
                ].map((ods, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/20 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-black text-white">{ods.numero}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{ods.titulo}</h3>
                        <p className="text-sm text-foreground/70">{ods.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Recycle className="h-12 w-12 mx-auto mb-6 text-green-600" />
              <h2 className="text-4xl font-black text-foreground mb-6">Únete al Cambio</h2>
              <p className="text-xl text-foreground/70 mb-8">
                Cada acción cuenta. Participa en nuestras iniciativas sostenibles y sé parte de la solución.
              </p>
              <a
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Crear Petición Sostenible
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
