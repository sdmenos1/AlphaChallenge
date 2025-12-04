import { HeaderWrapper } from "@/components/header-wrapper"
import { Footer } from "@/components/footer"
import { Building2, Target, Eye, Calendar, MapPin, Users } from "lucide-react"

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderWrapper />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/universidad-campus-moderno.jpg')] opacity-10 bg-cover bg-center" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Building2 className="h-16 w-16 mx-auto mb-6 animate-float" />
              <h1 className="text-5xl md:text-6xl font-black mb-6 text-balance">
                Universidad Nacional Tecnológica de Lima Sur
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-white/90">
                Formando profesionales con excelencia desde 2001
              </p>
            </div>
          </div>
        </section>

        {/* Historia */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-black text-foreground">Nuestra Historia</h2>
              </div>

              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p>
                  La Universidad Nacional Tecnológica de Lima Sur (UNTELS) fue creada el{" "}
                  <strong className="text-primary">10 de enero de 2001</strong> mediante la Ley N° 27431, inicialmente
                  como Universidad Nacional Tecnológica del Cono Sur.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-2xl border border-primary/20">
                    <p className="font-bold text-primary mb-2">29 de Septiembre, 2005</p>
                    <p className="text-sm">Se establece la primera comisión organizadora</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-2xl border border-primary/20">
                    <p className="font-bold text-primary mb-2">15 de Marzo, 2006</p>
                    <p className="text-sm">Recepción del terreno para el campus central</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-2xl border border-primary/20">
                    <p className="font-bold text-primary mb-2">25 de Febrero, 2007</p>
                    <p className="text-sm">Primer examen de admisión</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-2xl border border-primary/20">
                    <p className="font-bold text-primary mb-2">1 de Abril, 2007</p>
                    <p className="text-sm">Inicio del primer año académico</p>
                  </div>
                </div>

                <p>
                  El <strong className="text-primary">6 de mayo de 2014</strong>, mediante la Ley N° 30184, la
                  universidad fue renombrada como Universidad Nacional Tecnológica de Lima Sur, consolidando su
                  identidad y compromiso con el desarrollo tecnológico y científico de la región.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Misión */}
              <div className="bg-background rounded-3xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-foreground">Misión</h2>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Formar profesionales, investigadores e innovadores con fundamento humanístico, ético, social,
                  tecnológico y científico para participar en la solución de problemas de la sociedad con enfoque en el
                  desarrollo sostenible, vocación de servicio y espíritu emprendedor, a nivel local, nacional e
                  internacional.
                </p>
              </div>

              {/* Visión */}
              <div className="bg-background rounded-3xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-foreground">Visión</h2>
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Ser reconocida como una universidad socialmente responsable, con un equipo comprometido y competente
                  en la formación integral de sus estudiantes, aportando innovación a la sociedad a través de centros de
                  investigación y desarrollo, incubadoras de emprendimiento y educación continua.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ubicación */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="h-8 w-8 text-primary" />
                <h2 className="text-4xl font-black text-foreground">Ubicación</h2>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 border border-primary/20">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Villa El Salvador, Lima</h3>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      Nuestra universidad se encuentra ubicada en el distrito de Villa El Salvador, al sur de Lima,
                      Perú. Un distrito emblemático conocido por su espíritu comunitario y emprendedor, que refleja
                      perfectamente los valores de nuestra institución.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Users className="h-12 w-12 mx-auto mb-6 text-primary" />
              <h2 className="text-4xl font-black text-foreground mb-12">Nuestros Valores</h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Excelencia", desc: "Compromiso con la calidad académica" },
                  { title: "Innovación", desc: "Fomento de la creatividad y tecnología" },
                  { title: "Responsabilidad Social", desc: "Compromiso con la comunidad" },
                  { title: "Sostenibilidad", desc: "Cuidado del medio ambiente" },
                  { title: "Ética", desc: "Integridad en todas nuestras acciones" },
                  { title: "Emprendimiento", desc: "Espíritu empresarial y liderazgo" },
                ].map((valor, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl hover:scale-105 transition-all"
                  >
                    <h3 className="text-xl font-bold text-primary mb-2">{valor.title}</h3>
                    <p className="text-sm text-foreground/70">{valor.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
