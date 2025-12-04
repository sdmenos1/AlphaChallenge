export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-black text-lg text-foreground mb-3">UNTELS Participa</h3>
            <p className="text-sm text-foreground/70">
              Plataforma de participación estudiantil para la comunidad UNTELS
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm text-foreground mb-3">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/sobre-nosotros" className="hover:text-primary transition-colors">
                  Sobre UNTELS
                </a>
              </li>
              <li>
                <a href="/carreras" className="hover:text-primary transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <a href="/sostenibilidad" className="hover:text-primary transition-colors">
                  Sostenibilidad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm text-foreground mb-3">Contacto</h3>
            <p className="text-sm text-foreground/70">
              Villa El Salvador, Lima - Perú
              <br />
              <a
                href="https://www.untels.edu.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                www.untels.edu.pe
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-foreground/60">
          <p>© 2025 Universidad Nacional Tecnológica de Lima Sur. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
