import { HeaderWrapper } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { Newspaper, Calendar, TrendingUp, Award, Users, Rocket } from "lucide-react"

export default function NoticiasPage() {
  const noticias = [
    {
      categoria: "Académico",
      icon: Award,
      titulo: "UNTELS obtiene licenciamiento institucional renovado",
      fecha: "Marzo 2024",
      descripcion:
        "La universidad ha renovado su licenciamiento institucional otorgado por SUNEDU, reafirmando su compromiso con la calidad educativa y el cumplimiento de condiciones básicas de calidad.",
      imagen: "/universidad-certificacion-excelencia.jpg",
      color: "from-blue-500 to-cyan-600",
    },
    {
      categoria: "Investigación",
      icon: Rocket,
      titulo: "Estudiantes desarrollan proyecto de energía solar",
      fecha: "Febrero 2024",
      descripcion:
        "Alumnos de Ingeniería Ambiental presentan innovador sistema de paneles solares para comunidades rurales, destacando en concurso nacional de innovación tecnológica.",
      imagen: "/paneles-solares-estudiantes-proyecto.jpg",
      color: "from-yellow-500 to-orange-600",
    },
    {
      categoria: "Comunidad",
      icon: Users,
      titulo: "Feria de emprendimiento UNTELS 2024",
      fecha: "Enero 2024",
      descripcion:
        "Más de 50 proyectos emprendedores fueron presentados por estudiantes de todas las carreras, promoviendo el espíritu empresarial y la innovación en la comunidad universitaria.",
      imagen: "/feria-emprendimiento-universitario.jpg",
      color: "from-purple-500 to-pink-600",
    },
    {
      categoria: "Tecnología",
      icon: TrendingUp,
      titulo: "Nuevo laboratorio de inteligencia artificial",
      fecha: "Diciembre 2023",
      descripcion:
        "UNTELS inaugura moderno laboratorio equipado con tecnología de punta para investigación en IA y machine learning, fortaleciendo la formación en tecnologías emergentes.",
      imagen: "/laboratorio-computadoras-tecnologia-moderna.jpg",
      color: "from-green-500 to-teal-600",
    },
    {
      categoria: "Sostenibilidad",
      icon: TrendingUp,
      titulo: "Campaña de reciclaje alcanza 5 toneladas",
      fecha: "Noviembre 2023",
      descripcion:
        "El programa de gestión de residuos de UNTELS logra reciclar 5 toneladas de materiales en el último semestre, demostrando el compromiso ambiental de la comunidad universitaria.",
      imagen: "/reciclaje-universidad-sostenibilidad.jpg",
      color: "from-emerald-500 to-green-600",
    },
    {
      categoria: "Internacional",
      icon: Award,
      titulo: "Convenio con universidad europea",
      fecha: "Octubre 2023",
      descripcion:
        "UNTELS firma convenio de cooperación académica con universidad española, abriendo oportunidades de intercambio estudiantil y proyectos de investigación conjuntos.",
      imagen: "/convenio-internacional-universidad.jpg",
      color: "from-red-500 to-rose-600",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/periodico-noticias-universidad.jpg')] opacity-10 bg-cover bg-center" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Newspaper className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-balance">Noticias UNTELS</h1>
              <p className="text-xl md:text-2xl font-semibold text-white/90">
                Mantente informado sobre los últimos acontecimientos de nuestra comunidad universitaria
              </p>
            </div>
          </div>
        </section>

        {/* Noticias Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {noticias.map((noticia, index) => {
                const Icon = noticia.icon
                const isEven = index % 2 === 0

                return (
                  <article
                    key={index}
                    className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 bg-background rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all group`}
                  >
                    <div className="lg:w-1/2 relative overflow-hidden">
                      <img
                        src={noticia.imagen || "/placeholder.svg"}
                        alt={noticia.titulo}
                        className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${noticia.color} text-white font-bold text-sm flex items-center gap-2 shadow-lg`}
                      >
                        <Icon className="h-4 w-4" />
                        {noticia.categoria}
                      </div>
                    </div>

                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{noticia.fecha}</span>
                      </div>

                      <h2 className="text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                        {noticia.titulo}
                      </h2>

                      <p className="text-lg text-foreground/80 leading-relaxed mb-6">{noticia.descripcion}</p>

                      <button className="self-start px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105">
                        Leer más
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Newspaper className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-4xl font-black text-foreground mb-6">Mantente Informado</h2>
              <p className="text-xl text-foreground/70 mb-8">
                No te pierdas las últimas noticias y eventos de UNTELS. Síguenos en nuestras redes sociales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
