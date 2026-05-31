/* eslint-disable no-undef */

// i18n — Spanish translation for the Reality Tunnel site.
//
// Architecture: the markup is authored in English. Rather than thread a t()
// helper through every component, a live DOM translator (further down) walks
// the rendered page and swaps English text / placeholders / aria-labels for
// their Spanish equivalents from DICT_ES, then keeps them translated as React
// re-renders via a MutationObserver. Lookups are quote- and whitespace-
// insensitive (see `norm`), so dictionary keys can use straight or curly
// punctuation interchangeably.
//
// Public API on `window`:
//   setLang('es' | 'en')  — switch language (persisted in localStorage)
//   getLang()             — current language
//   useLang()             — React hook → [lang, setLang, t]; used by LangToggle
//   t(text)               — translate a single string (English → Spanish)

(function () {
  const DICT_ES = {
    // ── Nav links ─────────────────────────────────────────────────────
    'Work':                                                 'Trabajo',
    'Services':                                             'Servicios',
    'Approach':                                             'Enfoque',
    'Contact':                                              'Contacto',
    'Start a project':                                      'Iniciar un proyecto',
    'Start a project →':                                    'Iniciar un proyecto →',
    'Book a call →':                                        'Agendar una llamada →',
    'Watch the showreel':                                   'Ver el showreel',
    'Open menu':                                            'Abrir menú',
    'Close menu':                                           'Cerrar menú',
    'Reality Tunnel · Menu':                                'Reality Tunnel · Menú',
    'Reach us':                                             'Contáctanos',
    'Reach us directly':                                    'Contáctanos directamente',
    'Follow':                                               'Síguenos',
    'Studio':                                               'Estudio',
    'Site menu':                                            'Menú del sitio',
    'Primary':                                              'Principal',

    // ── Hero ──────────────────────────────────────────────────────────
    'Creating alternate realities since 2014':              'Creando realidades alternas desde 2014',
    'Unforgettable':                                        'Inolvidables',
    'experiences that':                                     'experiencias que',
    'move the needle.':                                     'mueven la aguja.',
    "We design, build, and integrate brand experiences that customers remember — and act upon — with a senior team that's shipped together for a decade.":
      'Diseñamos, construimos e integramos experiencias de marca que los clientes recuerdan — y sobre las que actúan — con un equipo senior que ha trabajado en conjunto durante una década.',
    'Trusted by':                                           'Con la confianza de',

    // ── Clients section ───────────────────────────────────────────────
    '46 brands · 100+ projects':                            '46 marcas · 100+ proyectos',
    'Trusted by the brands that':                           'Con la confianza de marcas que',
    "can't afford to be ignored.":                          'no pueden permitirse pasar desapercibidas.',

    // ── Services / Capabilities ───────────────────────────────────────
    'Capabilities':                                         'Capacidades',
    'Six practices.':                                       'Seis disciplinas.',
    'One delivery team.':                                   'Un equipo de entrega.',
    'No pyramid. The people pitching are the people prototyping, building, and pushing pixels at 3am the night before launch.':
      'Sin pirámides. Quienes te presentan el proyecto son los mismos que prototipan, construyen y publican píxeles a las 3 a.m. la noche antes del lanzamiento.',

    // Service names
    'Augmented reality':                                    'Realidad aumentada',
    'Virtual reality & 360°':                               'Realidad virtual y 360°',
    '3D visualization':                                     'Visualización 3D',
    'AI & computer vision':                                 'IA y visión por computadora',
    'Event activations':                                    'Activaciones de eventos',
    'Integration':                                          'Integración',
    // Service blurbs
    'Face filters, product try-on, on-set markers — web, iOS, Android, in-store.':
      'Filtros faciales, prueba de producto, marcadores en set — web, iOS, Android, en tienda.',
    'Standalone VR builds and 360° tours of venues, branches, factories.':
      'Desarrollos VR independientes y tours 360° de locales, sucursales y fábricas.',
    'Real-time configurators and product viewers in Unity, Three.js, WebGL.':
      'Configuradores y visualizadores de producto en tiempo real con Unity, Three.js y WebGL.',
    'Detection, tracking, and generative layers that make immersive UX feel intelligent.':
      'Detección, seguimiento y capas generativas que dan inteligencia a la experiencia inmersiva.',
    'Stand-out interactive booths and keynote demos — designed, built, operated.':
      'Stands interactivos y demos de keynote que destacan — diseñados, construidos y operados por nosotros.',
    'Wire immersive products into your CRM, e-commerce, analytics — never a silo.':
      'Integramos los productos inmersivos con tu CRM, e-commerce y analítica — nunca en silos.',

    // ── Approach ──────────────────────────────────────────────────────
    'How we work':                                          'Cómo trabajamos',
    'Process':                                              'Proceso',
    'Four phases. No surprises.':                           'Cuatro fases. Sin sorpresas.',
    'Discover':                                             'Descubrir',
    'Prototype':                                            'Prototipar',
    'Build':                                                'Construir',
    'Operate':                                              'Operar',
    'We start by identifying project objectives and end with a scope, budget, and delivery schedule.':
      'Empezamos identificando los objetivos del proyecto y terminamos con un alcance, presupuesto y calendario de entrega.',
    'A working prototype on real hardware in four to six weeks — never a slide deck.':
      'Un prototipo funcional en hardware real en cuatro a seis semanas — nunca una presentación.',
    'Senior team, fixed-price sprints, constant updates and production-grade code from day one.':
      'Equipo senior, sprints a precio cerrado, actualizaciones constantes y código de producción desde el día uno.',
    'On-site operators for events, tier-1 SLA for retail, analytics piped into your stack.':
      'Operadores en sitio para eventos, SLA tier-1 para retail y analítica integrada a tu stack.',

    // ── Selected work ─────────────────────────────────────────────────
    'Selected work · 2022–2025':                            'Trabajo seleccionado · 2022–2025',
    'Built with brands that':                               'Construido con marcas que',
    'need to move metrics.':                                'necesitan mover métricas.',
    'Selected work presented in partnership with our sister company,':
      'Trabajo seleccionado presentado en colaboración con nuestra empresa hermana,',
    'Featured · Virtual reality':                           'Destacado · Realidad virtual',
    'Client':                                               'Cliente',
    'Outcome':                                              'Resultado',
    'Practice':                                             'Disciplina',
    'Platform':                                             'Plataforma',
    'Market':                                               'Mercado',
    'Year':                                                 'Año',
    'Audience':                                             'Audiencia',

    // ── Stats ─────────────────────────────────────────────────────────
    'projects shipped':                                     'proyectos entregados',
    'years in AR / VR development':                         'años en desarrollo de AR / VR',
    'average KPI lift':                                     'aumento promedio de KPI',

    // ── Contact section ───────────────────────────────────────────────
    'Tell us what you want':                                'Cuéntanos qué quieres',
    'to build':                                             'construir',
    'next.':                                                'a continuación.',
    "Give us a call or fill out a brief— whichever is easiest. We'll come back to you with a scope that meets your budget.":
      'Llámanos o completa un brief — lo que te resulte más fácil. Volveremos contigo con un alcance que se ajuste a tu presupuesto.',
    'Name':                                                 'Nombre',
    'Company':                                              'Empresa',
    'Email':                                                'Correo electrónico',
    'Brand or studio':                                      'Marca o estudio',
    'work@yourcompany.com':                                 'tucorreo@empresa.com',
    'Brief - Tell us all about it':                         'Brief — cuéntanos todo',
    'What do you want to build? Audience, surface (web / iOS / event / headset), rough deadline.':
      '¿Qué quieres construir? Audiencia, plataforma (web / iOS / evento / headset), fecha objetivo.',
    'Send brief':                                           'Enviar resumen',
    'By submitting, you consent to be contacted by Reality Tunnel.':
      'Al enviar, aceptas ser contactado por Reality Tunnel.',
    "We'll reply within one business day.":                 'Responderemos en un día hábil.',
    'Brief received.':                                      'Resumen recibido.',
    "We'll reply within one business day with a shaped scope. In the meantime, your default mail client should have opened with the message — review and hit send.":
      'Te responderemos en un día hábil con un alcance definido. Mientras tanto, tu cliente de correo se debió abrir con el mensaje — revísalo y envíalo.',

    // ── About the name ────────────────────────────────────────────────
    'About the name':                                       'Sobre el nombre',
    "Why we're called Reality Tunnel.":                     'Por qué nos llamamos Reality Tunnel.',

    // ── Testimonials ──────────────────────────────────────────────────
    'What our clients say':                                 'Lo que dicen nuestros clientes',
    'Previous testimonial':                                 'Testimonio anterior',
    'Next testimonial':                                     'Siguiente testimonio',

    // ── Footer ────────────────────────────────────────────────────────
    'Providing US & LATAM markets with immersive experiences since 2014.':
      'Ofreciendo a los mercados de EE.UU. y Latinoamérica experiencias inmersivas desde 2014.',
    'Lima · LATAM & US':                                    'Lima · Latam y EE.UU.',
    'Immersive Experiences Studio':                         'Estudio de Experiencias Inmersivas',

    // ── About Us (homepage capabilities column) ───────────────────────
    'About Us':                                             'Sobre nosotros',
    'Reality Tunnel is the US headquarters of NextLATAM.com, founded in Lima, Peru in 2014 to serve Latin America. The work featured here was produced by NextLATAM.':
      'Reality Tunnel es la sede en EE.UU. de NextLATAM.com, fundada en Lima, Perú, en 2014 para servir a América Latina. El trabajo presentado aquí fue producido por NextLATAM.',
    // Fragments — the sentence is split around the live NextLATAM.com link
    'Reality Tunnel is the US headquarters of':             'Reality Tunnel es la sede en EE.UU. de',
    ', founded in Lima, Peru in 2014 to serve Latin America. The work featured here was produced by NextLATAM.':
      ', fundada en Lima, Perú, en 2014 para servir a América Latina. El trabajo presentado aquí fue producido por NextLATAM.',

    // ── Split headline fragments ──────────────────────────────────────
    'Four phases.':                                         'Cuatro fases.',
    'No surprises.':                                        'Sin sorpresas.',
    "Why we're called":                                     'Por qué nos llamamos',
    'The phrase':                                            'La frase',

    // ── Stats band ────────────────────────────────────────────────────
    'concept to deployment':                                'de concepto a despliegue',
    'weeks':                                                'semanas',

    // ── Featured project + work tiles ─────────────────────────────────
    'An Old Trafford experience that brought 14M global fans into the stadium without leaving home.':
      'Una experiencia de Old Trafford que llevó a 14M de aficionados de todo el mundo al estadio sin salir de casa.',
    'An Old Trafford experience for global fans.':          'Una experiencia de Old Trafford para aficionados de todo el mundo.',
    // tags / categories
    'Virtual reality':                                      'Realidad virtual',
    '360° photography':                                     'Fotografía 360°',
    'AR · e-commerce':                                      'RA · e-commerce',
    'AR · computer vision':                                 'RA · visión por computadora',
    'Educational VR':                                       'RV educativa',
    'VR training':                                          'Capacitación en RV',
    // tile descriptions
    'Walk every branch from a single web link.':            'Recorre cada sucursal desde un solo enlace web.',
    'Try the laptop on your desk before you buy.':          'Prueba la laptop en tu escritorio antes de comprar.',
    "Character recognition for kids' learning.":            'Reconocimiento de personajes para el aprendizaje infantil.',
    'A VR science investigation that turns students into detectives.':
      'Una investigación científica en RV que convierte a los estudiantes en detectives.',
    'Cybersecurity training that employees actually remember.':
      'Capacitación en ciberseguridad que los empleados realmente recuerdan.',
    'A year of BCP innovation — each product given its own moment.':
      'Un año de innovación de BCP — cada producto con su propio momento.',
    // outcomes / clients
    '14M views':                                            '14M vistas',
    '92k installs':                                         '92k instalaciones',
    '18 products':                                          '18 productos',
    'K-12 classrooms':                                      'Aulas K-12',
    '4.8/5 retention':                                      '4.8/5 retención',
    'Students · US':                                        'Estudiantes · EE.UU.',

    // ── About the name (long body copy) ───────────────────────────────
    "was coined by writer and futurist Robert Anton Wilson in the 1980s, building on Timothy Leary's earlier work on the eight-circuit model of consciousness. Wilson's idea is deceptively simple: every person inhabits a unique perceptual reality shaped by their language, beliefs, conditioning, and senses — a \"tunnel\" of interpretation through which the world reaches them. No two people see the same world; we all navigate slightly different versions of it. The metaphor stuck because it captures something true about human experience: reality is not received, it's constructed.":
      'fue acuñada por el escritor y futurista Robert Anton Wilson en los años 80, partiendo del trabajo previo de Timothy Leary sobre el modelo de los ocho circuitos de la consciencia. La idea de Wilson es engañosamente simple: cada persona habita una realidad perceptual única, moldeada por su lenguaje, creencias, condicionamiento y sentidos — un "túnel" de interpretación a través del cual el mundo le llega. No hay dos personas que vean el mismo mundo; todos navegamos versiones ligeramente distintas de él. La metáfora perduró porque captura algo cierto sobre la experiencia humana: la realidad no se recibe, se construye.',
    "That premise sits at the heart of what we do. When we build augmented reality, virtual reality, and 3D experiences, we're designing new tunnels — deliberate, crafted environments that change how people perceive a product, a place, a story, or each other. Our work is the practical application of Wilson's insight: if perception can be reshaped, then experience can be designed. Every project we ship is a tunnel built with intention, taking customers somewhere their default reality doesn't reach, and leaving them with something they'll remember and act on.":
      'Esa premisa está en el corazón de lo que hacemos. Cuando construimos experiencias de realidad aumentada, realidad virtual y 3D, diseñamos nuevos túneles — entornos deliberados y cuidados que cambian la forma en que las personas perciben un producto, un lugar, una historia o a los demás. Nuestro trabajo es la aplicación práctica de la idea de Wilson: si la percepción puede reformarse, entonces la experiencia puede diseñarse. Cada proyecto que entregamos es un túnel construido con intención, que lleva a los clientes a un lugar que su realidad por defecto no alcanza, y los deja con algo que recordarán y sobre lo que actuarán.',

    // ── Contact: response time + offices ──────────────────────────────
    'Response time':                                        'Tiempo de respuesta',
    "One business day. We'll come back with a written scope, a budget range, and a delivery schedule.":
      'Un día hábil. Te responderemos con un alcance por escrito, un rango de presupuesto y un calendario de entrega.',
    'US Office':                                             'Oficina en EE.UU.',
    'Los Angeles, California':                              'Los Ángeles, California',
    'Lima, Peru':                                           'Lima, Perú',
    'Serving US & LATAM':                                   'Sirviendo a EE.UU. y LATAM',

    // ── Contact form extras ───────────────────────────────────────────
    'What are you exploring?':                              '¿Qué estás explorando?',
    'Select a service':                                     'Selecciona un servicio',
    'Event activation':                                     'Activación de eventos',
    'Not sure yet':                                         'Aún no estoy seguro',
    'Budget range':                                         'Rango de presupuesto',
    'Select a range':                                       'Selecciona un rango',
    'Under $25k':                                           'Menos de $25k',
    "Let's discuss":                                        'Hablémoslo',

    // ── Footer ────────────────────────────────────────────────────────
    'Privacy Policy':                                       'Política de privacidad',
    'All rights reserved':                                  'Todos los derechos reservados',

    // ── Testimonials ──────────────────────────────────────────────────
    'I have worked with Carlos and his team for over a decade. From full-stack Web development, AR/VR work and apps, you could not be in better hands. They deliver on time and on budget and have never let me down.':
      'He trabajado con Carlos y su equipo por más de una década. Desde desarrollo web full-stack hasta trabajo de AR/VR y aplicaciones, no podrías estar en mejores manos. Entregan a tiempo y dentro del presupuesto, y nunca me han fallado.',
    "The final product met the end client's expectations and effectively boosted their customer engagement. They were a collaborative partner, utilizing various tools to communicate with the client and track their tasks. They were flexible and understanding of scope changes.":
      'El producto final cumplió las expectativas del cliente final e impulsó eficazmente la interacción con sus clientes. Fueron un socio colaborativo, utilizando diversas herramientas para comunicarse con el cliente y dar seguimiento a sus tareas. Fueron flexibles y comprensivos ante los cambios de alcance.',
    "Very methodical about their work and operates in sprints. They communicate with the client about upcoming deadlines and expected delays. They're committed to excellence and their team often proposes new approaches to ongoing processes to improve the final product.":
      'Muy metódicos en su trabajo y operan en sprints. Se comunican con el cliente sobre los próximos plazos y los posibles retrasos. Están comprometidos con la excelencia y su equipo a menudo propone nuevos enfoques para los procesos en curso a fin de mejorar el producto final.',
    'Carlos and his firm are the utmost professionals. They are responsive, hard working, solution driven and cost effective. We have worked with many IT firms and his stands out as a true gem.':
      'Carlos y su firma son profesionales de primer nivel. Son receptivos, trabajadores, orientados a soluciones y eficientes en costos. Hemos trabajado con muchas firmas de TI y la suya destaca como una verdadera joya.',
    'President, Crier PR':                                  'Presidente, Crier PR',

    // ── Project detail pages ──────────────────────────────────────────
    // Section labels & nav
    '← All work':                                           '← Todo el trabajo',
    'The brief':                                            'El brief',
    'What we built':                                        'Lo que construimos',
    'More work':                                            'Más trabajo',
    'Other projects from the studio':                       'Otros proyectos del estudio',
    'Project not found.':                                   'Proyecto no encontrado.',
    'Back to selected work →':                              'Volver al trabajo seleccionado →',
    // Meta values
    'Standalone VR · Web':                                  'RV autónoma · Web',
    'Standalone VR':                                        'RV autónoma',
    'Web · Any device':                                     'Web · Cualquier dispositivo',
    'Global':                                               'Global',
    'Peru':                                                 'Perú',
    'United States':                                        'Estados Unidos',
    'Students':                                             'Estudiantes',

    // Manchester United VR
    'Putting fans inside Old Trafford — without a match ticket.':
      'Llevar a los aficionados dentro de Old Trafford — sin una entrada al partido.',
    "Manchester United wanted to give their global fanbase — many of whom will never visit Old Trafford — a visceral sense of belonging to the world's most watched club. The experience needed to feel worthy of the badge and work at scale, across devices.":
      'Manchester United quería dar a su afición global — muchos de los cuales nunca visitarán Old Trafford — una sensación visceral de pertenencia al club más visto del mundo. La experiencia debía sentirse digna del escudo y funcionar a escala, en todos los dispositivos.',
    "We built a fully immersive VR experience placing fans on the pitch, inside the dressing rooms, and in the stands at Old Trafford. Deployed on standalone VR headsets and web, it extended the club's emotional reach to millions of supporters who will never hold a match ticket — deepening loyalty without a single seat.":
      'Construimos una experiencia de RV totalmente inmersiva que coloca a los aficionados en el campo, dentro de los vestuarios y en las gradas de Old Trafford. Desplegada en visores de RV autónomos y en la web, extendió el alcance emocional del club a millones de seguidores que nunca tendrán una entrada — profundizando la lealtad sin un solo asiento.',

    // Interbank 360°
    'Every branch, navigable from anywhere.':
      'Cada sucursal, navegable desde cualquier lugar.',
    'Interbank operates branches across Peru and needed a way for customers to explore their spaces remotely — reducing friction for new clients deciding which branch to visit and extending reach during periods of reduced in-person traffic.':
      'Interbank opera sucursales en todo el Perú y necesitaba una forma de que los clientes exploraran sus espacios de forma remota — reduciendo la fricción para los nuevos clientes que deciden qué sucursal visitar y ampliando el alcance en periodos de menor tráfico presencial.',
    'We photographed every branch in high-resolution 360° and built a single web platform letting any customer walk any location from any device — no app required. It runs in the browser, requires no download, and scales as the branch network grows.':
      'Fotografiamos cada sucursal en 360° de alta resolución y construimos una única plataforma web que permite a cualquier cliente recorrer cualquier local desde cualquier dispositivo — sin necesidad de una app. Funciona en el navegador, no requiere descarga y escala a medida que crece la red de sucursales.',

    // Hewlett Packard AR
    'Try the laptop on your desk before you click add-to-cart.':
      'Prueba la laptop en tu escritorio antes de hacer clic en añadir al carrito.',
    'HP wanted online buyers to feel confident about the fit, weight, and footprint of a new laptop before committing — turning a flat product page into something closer to a showroom visit, without sending customers to a physical store.':
      'HP quería que los compradores en línea se sintieran seguros sobre el tamaño, el peso y el espacio que ocupa una nueva laptop antes de decidirse — convirtiendo una página de producto plana en algo más parecido a una visita a una sala de exhibición, sin enviar a los clientes a una tienda física.',
    'We built a web-based AR product viewer that drops a true-to-scale 3D model of the laptop onto any flat surface, viewable through a phone camera. Rotate it, lift it, place it on the desk where it will live — then return to the spec page already knowing the device.':
      'Construimos un visor de producto en RA basado en la web que coloca un modelo 3D a escala real de la laptop sobre cualquier superficie plana, visible a través de la cámara del teléfono. Gírala, levántala, colócala en el escritorio donde vivirá — y vuelve a la página de especificaciones conociendo ya el dispositivo.',

    // Talentolandia
    'AR-powered learning that makes kids reach for the product again.':
      'Aprendizaje con RA que hace que los niños vuelvan a buscar el producto.',
    "Artesco, Peru's leading school supplies brand, wanted to transform their Talentolandia character IP into an interactive experience — turning everyday stationery packaging into a reason for kids to engage with the brand well beyond the store shelf.":
      'Artesco, la marca líder de útiles escolares del Perú, quería transformar la propiedad intelectual de sus personajes Talentolandia en una experiencia interactiva — convirtiendo el empaque cotidiano de la papelería en una razón para que los niños interactúen con la marca mucho más allá del estante de la tienda.',
    'We built an AR app using computer vision to recognise Talentolandia characters printed on Artesco products. Point the camera at the packaging and the characters come alive — animations, games, and educational activities that give kids a reason to reach for the product again.':
      'Construimos una app de RA con visión por computadora para reconocer a los personajes de Talentolandia impresos en los productos de Artesco. Apunta la cámara al empaque y los personajes cobran vida — animaciones, juegos y actividades educativas que dan a los niños una razón para volver a buscar el producto.',

    // Millie the Robot
    'The challenge was making science genuinely engaging for students — not through videos or textbooks, but through direct participation. The experience needed to teach real investigative techniques while keeping students invested in the outcome from start to finish.':
      'El reto era hacer que la ciencia fuera genuinamente atractiva para los estudiantes — no a través de videos o libros de texto, sino mediante la participación directa. La experiencia debía enseñar técnicas de investigación reales manteniendo a los estudiantes interesados en el resultado de principio a fin.',
    'We built a VR mystery investigation guided by Millie, an intelligent robot, set on a "bring your robot to school" day. Students apply biometrics, DNA barcoding, and colorimetry to identify which robot ate a jelly donut — every technique has a purpose, every clue has a consequence, and the answer only emerges when all the science is applied correctly.':
      'Construimos una investigación de misterio en RV guiada por Millie, un robot inteligente, ambientada en un día de "trae tu robot a la escuela". Los estudiantes aplican biometría, códigos de barras de ADN y colorimetría para identificar qué robot se comió una dona — cada técnica tiene un propósito, cada pista tiene una consecuencia, y la respuesta solo surge cuando toda la ciencia se aplica correctamente.',

    // Hacker's Worst Nightmare
    "HP's cybersecurity division needed to train enterprise employees across the US on recognising and responding to attacks. The existing approach — slides, videos, compliance checkboxes — produced no lasting behaviour change. People clicked through and forgot everything by the following week.":
      'La división de ciberseguridad de HP necesitaba capacitar a empleados de empresas en todo EE.UU. para reconocer y responder a ataques. El enfoque existente — diapositivas, videos, casillas de cumplimiento — no producía ningún cambio de comportamiento duradero. La gente avanzaba a clics y lo olvidaba todo a la semana siguiente.',
    'We built a standalone VR simulation that puts employees inside an active cyber-attack as it unfolds. Alerts fire, systems lock down, and every decision has a consequence — all within a safe environment where real pressure drives real learning. When the stakes feel genuine, the training sticks.':
      'Construimos una simulación de RV autónoma que coloca a los empleados dentro de un ciberataque activo mientras se desarrolla. Saltan las alertas, los sistemas se bloquean y cada decisión tiene una consecuencia — todo en un entorno seguro donde la presión real impulsa el aprendizaje real. Cuando lo que está en juego se siente genuino, la capacitación perdura.',

    // RA Link — BCP
    "A year's worth of BCP innovation — each product given its own moment to land.":
      'Todo un año de innovación de BCP — cada producto con su propio momento para destacar.',
    'Banco de Crédito del Perú needed a way to present eighteen new products at a single event — from mobile payment apps to AI-powered assistants — without the reveal feeling like a catalogue. The challenge was making each product feel distinct and worth discovering, not just announced.':
      'El Banco de Crédito del Perú necesitaba una forma de presentar dieciocho nuevos productos en un solo evento — desde apps de pago móvil hasta asistentes con IA — sin que la presentación se sintiera como un catálogo. El reto era hacer que cada producto se sintiera distinto y digno de descubrir, no solo anunciado.',
    'We built RA Link, a custom augmented reality mobile app paired with physical tokens placed throughout a darkened room. Each token, when scanned, unlocked an AR experience revealing one of the eighteen products BCP launched that year — including Yape, their peer-to-peer payment app, and Arturito BCP, their AI assistant. Visitors moved through the space at their own pace, discovering the full range of innovation one token at a time.':
      'Construimos RA Link, una app móvil de realidad aumentada a medida combinada con tokens físicos colocados por toda una sala a oscuras. Cada token, al escanearse, desbloqueaba una experiencia de RA que revelaba uno de los dieciocho productos que BCP lanzó ese año — incluyendo Yape, su app de pagos entre personas, y Arturito BCP, su asistente con IA. Los visitantes recorrían el espacio a su propio ritmo, descubriendo toda la gama de innovación un token a la vez.',
  };

  // ──────────────────────────────────────────────────────────────────────
  // Language state — single global value, persisted in localStorage,
  // broadcast to listeners so React components can re-render.
  // ──────────────────────────────────────────────────────────────────────
  const KEY = 'rt-lang';
  const listeners = new Set();

  // Quote-insensitive lookup: source markup mixes straight (') and curly (’)
  // apostrophes plus curly quotes, so we normalize both the dictionary keys
  // and the runtime text before matching. Keys can be authored either way.
  function norm(s) {
    return s
      .replace(/[\u2018\u2019\u02BC]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }
  const NDICT = {};
  for (const k in DICT_ES) NDICT[norm(k)] = DICT_ES[k];
  function lookup(text) {
    if (DICT_ES[text]) return DICT_ES[text];     // fast exact path
    return NDICT[norm(text)];                      // normalized fallback
  }

  function getLang() {
    try { return localStorage.getItem(KEY) === 'es' ? 'es' : 'en'; }
    catch { return 'en'; }
  }
  function setLang(next) {
    const v = next === 'es' ? 'es' : 'en';
    try { localStorage.setItem(KEY, v); } catch {}
    listeners.forEach((fn) => fn(v));
  }
  function t(text) {
    if (getLang() !== 'es') return text;
    return lookup(text) || text;
  }

  // React hook: returns [lang, setLang, t]. The component re-renders on
  // language change so every `t()` call inside re-evaluates.
  function useLang() {
    const [lang, setLocalLang] = React.useState(getLang());
    React.useEffect(() => {
      const fn = (v) => setLocalLang(v);
      listeners.add(fn);
      return () => listeners.delete(fn);
    }, []);
    return [lang, setLang, t];
  }

  // ──────────────────────────────────────────────────────────────────────
  // Live DOM translator. The page markup is authored in English; rather than
  // thread t() through every node, we translate the rendered DOM in place
  // using DICT_ES, and keep it translated as React re-renders (carousels,
  // steppers, menus) via a MutationObserver. Switching back to 'en' restores
  // the original English from a per-node cache.
  // ──────────────────────────────────────────────────────────────────────
  const ORIG = new WeakMap();          // node -> original text/attr-value cache
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  let current = getLang();
  let observer = null;

  // Replace only the trimmed core, preserving any surrounding whitespace so
  // JSX-formatted text nodes don't lose their spacing.
  function translateString(value) {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const tr = lookup(trimmed);
    if (!tr || tr === trimmed) return null;
    return value.replace(trimmed, tr);
  }

  function applyTextNode(node) {
    const val = node.nodeValue;
    if (val == null) return;
    if (current === 'es') {
      const out = translateString(val);
      if (out != null) {
        if (!ORIG.has(node)) ORIG.set(node, val);
        if (node.nodeValue !== out) node.nodeValue = out;
      }
    } else if (ORIG.has(node)) {
      node.nodeValue = ORIG.get(node);
      ORIG.delete(node);
    }
  }

  function applyElementAttrs(el) {
    for (const attr of ATTRS) {
      const dataAttr = 'data-rt-orig-' + attr;
      if (current === 'es') {
        if (!el.hasAttribute(attr)) continue;
        const val = el.getAttribute(attr);
        const out = translateString(val);
        if (out != null) {
          if (!el.hasAttribute(dataAttr)) el.setAttribute(dataAttr, val);
          if (el.getAttribute(attr) !== out) el.setAttribute(attr, out);
        }
      } else if (el.hasAttribute(dataAttr)) {
        el.setAttribute(attr, el.getAttribute(dataAttr));
        el.removeAttribute(dataAttr);
      }
    }
  }

  function walk(root) {
    if (!root) return;
    // Element attributes
    if (root.nodeType === 1) {
      applyElementAttrs(root);
      const els = root.querySelectorAll('[placeholder],[aria-label],[title],[alt]');
      for (const el of els) applyElementAttrs(el);
    }
    // Text nodes
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = tw.nextNode())) applyTextNode(n);
    if (root.nodeType === 3) applyTextNode(root);
  }

  function retranslate() {
    if (!document.body) return;
    if (observer) observer.disconnect();
    walk(document.body);
    if (observer) observer.observe(document.body, {
      childList: true, subtree: true, characterData: true, attributes: false,
    });
  }

  function startObserver() {
    if (observer || !document.body) return;
    observer = new MutationObserver((mutations) => {
      if (current !== 'es') return;       // nothing to maintain in English
      observer.disconnect();
      for (const m of mutations) {
        if (m.type === 'characterData') applyTextNode(m.target);
        else for (const node of m.addedNodes) walk(node);
      }
      observer.observe(document.body, {
        childList: true, subtree: true, characterData: true, attributes: false,
      });
    });
    observer.observe(document.body, {
      childList: true, subtree: true, characterData: true, attributes: false,
    });
  }

  // Keep `current` in sync and re-run the translator on every language change.
  listeners.add((v) => {
    current = v;
    document.documentElement.setAttribute('lang', v);
    retranslate();
  });

  function boot() {
    current = getLang();
    document.documentElement.setAttribute('lang', current);
    startObserver();
    // Defer the first pass so the React tree has mounted.
    setTimeout(retranslate, 60);
    setTimeout(retranslate, 400);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  Object.assign(window, { useLang, getLang, setLang, t, RT_DICT_ES: DICT_ES });
})();
