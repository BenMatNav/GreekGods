import { logger } from '../utils/logger.js';


export const botConfig = {
  // =========================
  // PRESENCIA DEL BOT (lo que los usuarios ven debajo del nombre del bot)
  // =========================
  // Opciones de `status`:
  // - "online"    = punto verde
  // - "idle"      = luna amarilla
  // - "dnd"       = no molestar rojo
  // - "invisible" = aparece desconectado
  presence: {
    // Estado en línea actual mostrado en Discord.
    status: "online",

    // Líneas de actividad mostradas debajo del nombre del bot.
    // Mapeo de números de `type` desde Discord:
    // 0 = Jugando
    // 1 = Transmitiendo
    // 2 = Escuchando
    // 3 = Viendo
    // 4 = Personalizado
    // 5 = Compitiendo
    activities: [
      {
        // Texto que verán los usuarios (ejemplo: "Jugando /help | SolariasMc").
        name: "Hecho con ❤️",
        // Número de tipo de actividad (0 = Jugando).
        type: 0, 
      },
    ],
  },

  // =========================
  // COMPORTAMIENTO DE COMANDOS
  // =========================
  commands: {
    // IDs de usuario de los dueños del bot (separados por comas en la var de entorno OWNER_IDS).
    // Los dueños pueden acceder a comandos de nivel de dueño/administrador.
    owners: process.env.OWNER_IDS?.split(",") || [],

    // Tiempo de espera por defecto entre usos de comandos (en segundos).
    defaultCooldown: 3, 

    // Si es verdadero, los comandos antiguos se eliminan antes de volver a registrarlos.
    deleteCommands: false,

    // ID de servidor opcional utilizado para probar comandos de barra rápidamente.
    testGuildId: process.env.TEST_GUILD_ID,
  },

  // =========================
  // SITEMA DE POSTULACIONES
  // =========================
  applications: {
    // Preguntas por defecto que se muestran cuando alguien completa una postulación.
    defaultQuestions: [
      { question: "¿Cuál es tu nombre?", required: true },
      { question: "¿Cuántos años tienes?", required: true },
      { question: "¿Por qué quieres unirte?", required: true },
    ],

    // Colores de los embeds según el estado de la postulación.
    statusColors: {
      pending: "#FFA500",
      approved: "#00FF00",
      denied: "#FF0000",
    },

    // Cuánto tiempo deben esperar los usuarios antes de enviar otra postulación (horas).
    applicationCooldown: 24, 

    // Eliminar automáticamente las postulaciones rechazadas después de estos días.
    deleteDeniedAfter: 7, 

    // Eliminar automáticamente las postulaciones aprobadas después de estos días.
    deleteApprovedAfter: 30, 

    // IDs de roles permitidos para gestionar postulaciones.
    managerRoles: [], // Se poblará desde el entorno o la base de datos
  },

  // =========================
  // COLORES DE EMBEDS Y MARCA
  // =========================
  // IMPORTANTE: Esta es la FUENTE ÚNICA DE VERDAD para todos los colores del bot
  embeds: {
    colors: {
      // Colores principales de la marca.
      primary: "#336699", 
      secondary: "#2F3136", 

      // Colores de estado estándar para mensajes de éxito/error/advertencia/información.
      success: "#57F287", 
      error: "#ED4245", 
      warning: "#FEE75C", 
      info: "#3498DB", 

      // Colores de utilidad neutros.
      light: "#FFFFFF",
      dark: "#202225",
      gray: "#99AAB5",

      // Atajos de paleta estilo Discord.
      blurple: "#5865F2",
      green: "#57F287",
      yellow: "#FEE75C",
      fuchsia: "#EB459E",
      red: "#ED4245",
      black: "#000000",

      // Colores específicos de funciones.
      giveaway: {
        active: "#57F287",
        ended: "#ED4245",
      },
      ticket: {
        open: "#57F287",
        claimed: "#FAA61A",
        closed: "#ED4245",
        pending: "#99AAB5",
      },
      economy: "#F1C40F",
      birthday: "#E91E63",
      moderation: "#9B59B6",

      // Mapeo de colores por prioridad de ticket.
      priority: {
        none: "#95A5A6",
        low: "#3498db",
        medium: "#2ecc71",
        high: "#f1c40f",
        urgent: "#e74c3c",
      },
    },
    footer: {
      // Texto de pie de página por defecto utilizado en los embeds del bot.
      text: "SolariasMc",
      // URL del icono del pie de página (null = sin icono).
      icon: null,
    },
    // URL de miniatura por defecto para los embeds (null = sin miniatura).
    thumbnail: null,
    author: {
      // Bloque de autor de embed por defecto opcional.
      name: null,
      icon: null,
      url: null,
    },
  },

  // =========================
  // CONFIGURACIÓN DE ECONOMÍA
  // =========================
  economy: {
    currency: {
      // Nombre para mostrar de la moneda.
      name: "monedas",
      // Nombre en plural para mostrar.
      namePlural: "monedas",
      // Símbolo de la moneda que se muestra en los saldos.
      symbol: "$",
    },

    // Saldo inicial para nuevos usuarios.
    startingBalance: 0,

    // Capacidad máxima del banco antes de las mejoras (si se usan mejoras).
    baseBankCapacity: 100000,

    // Cantidad de recompensa diaria.
    dailyAmount: 100,

    // Rango de pago aleatorio del comando trabajar (work).
    workMin: 10,
    workMax: 100,

    // Rango de pago aleatorio del comando pedir (beg).
    begMin: 5,
    begMax: 50,

    // Probabilidad de éxito al robar (0.4 = 40%).
    robSuccessRate: 0.4,

    // Tiempo de cárcel después de un robo fallido (milisegundos).
    // 3600000 = 1 hora.
    robFailJailTime: 3600000, 
  },

  // =========================
  // CONFIGURACIÓN DE LA TIENDA
  // =========================
  // Añadir valores por defecto de la tienda aquí cuando sea necesario.
  shop: {
    
  },

  // =========================
  // SISTEMA DE TICKETS
  // =========================
  tickets: {
    // ID de la categoría donde se crean los nuevos tickets (null = sin categoría forzada).
    defaultCategory: null,

    // IDs de roles permitidos para gestionar/dar soporte en los tickets.
    supportRoles: [],

    // Opciones de prioridad que los usuarios/personal pueden asignar.
    priorities: {
      none: {
        emoji: "⚪",
        color: "#95A5A6",
        label: "Ninguna",
      },
      low: {
        emoji: "🟢",
        color: "#2ECC71",
        label: "Baja",
      },
      medium: {
        emoji: "🟡",
        color: "#F1C40F",
        label: "Media",
      },
      high: {
        emoji: "🔴",
        color: "#E74C3C",
        label: "Alta",
      },
      urgent: {
        emoji: "🚨",
        color: "#E91E63",
        label: "Urgente",
      },
    },

    // Prioridad por defecto para los nuevos tickets.
    defaultPriority: "none",

    // ID de la categoría donde se archivan los tickets cerrados.
    archiveCategory: null,

    // ID del canal donde se envían los registros (logs) de los tickets.
    logChannel: null,
  },

  // =========================
  // CONFIGURACIÓN DE SORTEOS (GIVEAWAYS)
  // =========================
  giveaways: {
    // Duración por defecto de los sorteos en milisegundos.
    // 86400000 = 24 horas.
    defaultDuration: 86400000, 

    // Rango permitido de cantidad de ganadores.
    minimumWinners: 1,
    maximumWinners: 10,

    // Rango permitido de duración de sorteos en milisegundos.
    // 300000 = 5 minutos.
    minimumDuration: 300000, 
    // 2592000000 = 30 días.
    maximumDuration: 2592000000, 

    // IDs de roles permitidos para organizar sorteos.
    allowedRoles: [],

    // IDs de roles que eluden las restricciones de los sorteos.
    bypassRoles: [],
  },

  // =========================
  // CONFIGURACIÓN DE CUMPLEAÑOS
  // =========================
  birthday: {
    // ID del rol otorgado a los usuarios en su cumpleaños.
    defaultRole: null,

    // ID del canal donde se publican los anuncios de cumpleaños.
    announcementChannel: null,

    // Zona horaria utilizada para calcular las fechas de cumpleaños.
    timezone: "UTC",
  },

  // =========================
  // CONFIGURACIÓN DE VERIFICACIÓN
  // =========================
  verification: {
    // Mensaje mostrado al publicar el panel de verificación.
    defaultMessage: "¡Haz clic en el botón de abajo para verificarte y obtener acceso al servidor!",

    // Texto en el botón de verificación.
    defaultButtonText: "Verificar",

    // Comportamiento de la verificación automática.
    autoVerify: {
      // Cómo decide la verificación automática quién se aprueba automáticamente:
      // - "none"        = todos se verifican automáticamente de inmediato
      // - "account_age" = la cuenta debe ser más antigua que los días establecidos
      // - "server_size" = verificar automáticamente a todos solo en servidores más pequeños
      defaultCriteria: "none",

      // Días utilizados cuando `defaultCriteria` es `account_age`.
      defaultAccountAgeDays: 7,

      // Umbral de cantidad de miembros utilizado cuando `defaultCriteria` es `server_size`.
      // Ejemplo: 1000 significa verificar automáticamente si el servidor tiene menos de 1000 miembros.
      serverSizeThreshold: 1000,

      // Límites de seguridad permitidos para los requisitos de antigüedad de la cuenta.
      // 1 = día mínimo, 365 = días máximos.
      minAccountAge: 1,      
      maxAccountAge: 365,    

      // Si es verdadero, el usuario recibe un MD después de la verificación.
      sendDMNotification: true,

      // Descripciones legibles para cada modo de criterio.
      criteria: {
        account_age: "La cuenta debe ser más antigua que los días especificados",
        server_size: "Todos los usuarios si el servidor tiene menos de 1000 miembros",
        none: "Todos los usuarios inmediatamente"
      }
    },

    // Tiempo mínimo entre intentos de verificación (milisegundos).
    // 5000 = 5 segundos.
    verificationCooldown: 5000,  

    // Cantidad máxima de intentos fallidos permitidos dentro de la ventana de tiempo de abajo.
    maxVerificationAttempts: 3,   

    // Ventana de tiempo para contar los intentos (milisegundos).
    // 60000 = 1 minuto.
    attemptWindow: 60000,          

    // Límites de seguridad en memoria (ayuda a evitar el crecimiento ilimitado de la memoria).
    maxCooldownEntries: 10000,
    maxAttemptEntries: 10000,
    // Frecuencia de limpieza para los mapas de enfriamiento/intentos (milisegundos).
    // 300000 = 5 minutos.
    cooldownCleanupInterval: 300000, 
    // Tamaño máximo de la carga útil de metadatos para las entradas de auditoría (bytes).
    maxAuditMetadataBytes: 4096,
    // Número máximo de entradas de auditoría guardadas en memoria.
    maxInMemoryAuditEntries: 1000,
    // Si es verdadero, registra cada acción de verificación.
    logAllVerifications: true,
    // Si es verdadero, conserva el historial del rastro de auditoría de verificación.
    keepAuditTrail: true,
  },

  // =========================
  // MENSAJES DE BIENVENIDA / DESPEDIDA
  // =========================
  welcome: {
    // Plantilla de bienvenida publicada cuando un usuario se une.
    // Marcadores de posición: {user}, {server}, {memberCount}
    defaultWelcomeMessage:
      "¡Bienvenido/a {user} a {server}! ¡Ahora somos {memberCount} miembros!",
    // Plantilla de despedida publicada cuando un usuario se va.
    // Marcadores de posición: {user}, {memberCount}
    defaultGoodbyeMessage:
      "{user} ha dejado el servidor. Ahora somos {memberCount} miembros.",
    // ID del canal para los mensajes de bienvenida.
    defaultWelcomeChannel: null,
    // ID del canal para los mensajes de despedida.
    defaultGoodbyeChannel: null,
  },

  // =========================
  // CANALES DE CONTADORES
  // =========================
  counters: {
    defaults: {
      // Plantillas de nomenclatura/descripción por defecto para las entradas del contador.
      name: "Contador de {name}",
      description: "Contador del servidor para {name}",
      // Tipo de canal utilizado para los contadores (normalmente "voice").
      type: "voice",
      // Formato del nombre del canal. `{count}` se reemplaza automáticamente.
      channelName: "{name}-{count}",
    },
    permissions: {
      // Permisos denegados por defecto para el canal del contador.
      deny: ["VIEW_CHANNEL"],
      // Permisos permitidos por defecto para el canal del contador.
      allow: ["VIEW_CHANNEL", "CONNECT", "SPEAK"],
    },
    messages: {
      // Mensajes de respuesta por defecto para las acciones del contador.
      created: "✅ Contador creado **{name}**",
      deleted: "🗑️ Contador eliminado **{name}**",
      updated: "🔄 Contador actualizado **{name}**",
    },
    types: {
      // Tipos de contadores integrados y cómo se calcula cada conteo.
      members: {
        name: "👥 Miembros",
        description: "Miembros totales en el servidor",
        getCount: (guild) => guild.memberCount.toString(),
      },
      bots: {
        name: "🤖 Bots",
        description: "Cuentas de bots totales en el servidor",
        getCount: (guild) =>
          guild.members.cache.filter((m) => m.user.bot).size.toString(),
      },
      members_only: {
        name: "👤 Humanos",
        description: "Miembros humanos totales (no bots)",
        getCount: (guild) =>
          guild.members.cache.filter((m) => !m.user.bot).size.toString(),
      },
    },
  },

  // =========================
  // MENSAJES GENÉRICOS DEL BOT
  // =========================
  messages: {
    noPermission: "No tienes permiso para usar este comando.",
    cooldownActive: "Por favor espera {time} antes de usar este comando de nuevo.",
    errorOccurred: "Ocurrió un error al ejecutar este comando.",
    missingPermissions:
      "Me faltan los permisos requeridos para realizar esta acción.",
    commandDisabled: "Este comando ha sido desactivado.",
    maintenanceMode: "El bot se encuentra actualmente en modo de mantenimiento.",
  },

  // =========================
  // ACTIVACIÓN DE FUNCIONES
  // =========================
  // Establece cualquier función en `false` para desactivarla globalmente.
  features: {
    // Sistemas centrales.
    economy: true,
    leveling: true,
    moderation: true,
    logging: true,
    welcome: true,

    // Sistemas de participación comunitaria.
    tickets: true,
    giveaways: true,
    birthday: true,
    counter: true,

    // Sistemas de seguridad y autoservicio.
    verification: true,
    reactionRoles: true,
    joinToCreate: true,

    // Módulos de utilidad/calidad de vida.
    voice: true,
    search: true,
    tools: true,
    utility: true,
    community: true,
    fun: true,
  },
};


export function validateConfig(config) {
  const errors = [];

  
  if (process.env.NODE_ENV !== 'production') {
    logger.debug('Comprobación de variables de entorno:');
    logger.debug('Existe DISCORD_TOKEN:', !!process.env.DISCORD_TOKEN);
    logger.debug('Existe TOKEN:', !!process.env.TOKEN);
    logger.debug('Existe CLIENT_ID:', !!process.env.CLIENT_ID);
    logger.debug('Existe GUILD_ID:', !!process.env.GUILD_ID);
    logger.debug('Existe POSTGRES_HOST:', !!process.env.POSTGRES_HOST);
    logger.debug('NODE_ENV:', process.env.NODE_ENV);
  }

  if (!process.env.DISCORD_TOKEN && !process.env.TOKEN) {
    errors.push("El token del bot es requerido (variable de entorno DISCORD_TOKEN o TOKEN)");
  }

  if (!process.env.CLIENT_ID) {
    errors.push("El ID del cliente es requerido (variable de entorno CLIENT_ID)");
  }

  
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.POSTGRES_HOST) {
      errors.push("El host de PostgreSQL es requerido en producción (variable de entorno POSTGRES_HOST)");
    }
    if (!process.env.POSTGRES_USER) {
      errors.push("El usuario de PostgreSQL es requerido en producción (variable de entorno POSTGRES_USER)");
    }
    if (!process.env.POSTGRES_PASSWORD) {
      errors.push("La contraseña de PostgreSQL es requerida en producción (variable de entorno POSTGRES_PASSWORD)");
    }
  }

  return errors;
}


const configErrors = validateConfig(botConfig);
if (configErrors.length > 0) {
  logger.error("Errores de configuración del bot:", configErrors.join("\n"));
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}


export const BotConfig = botConfig;

export function getColor(path, fallback = "#99AAB5") {
  
  if (typeof path === "number") return path;
  if (typeof path === "string" && path.startsWith("#")) {
    
    return parseInt(path.replace("#", ""), 16);
  }
  const result = path
    .split(".")
    .reduce(
      (obj, key) => (obj && obj[key] !== undefined ? obj[key] : fallback),
      botConfig.embeds.colors,
    );
  
  // Convierte el resultado a un entero si es una cadena hexadecimal
  if (typeof result === "string" && result.startsWith("#")) {
    return parseInt(result.replace("#", ""), 16);
  }
  return result;
}

export function getRandomColor() {
  const colors = Object.values(botConfig.embeds.colors).flatMap((color) =>
    typeof color === "string" ? color : Object.values(color),
  );
  return colors[Math.floor(Math.random() * colors.length)];
}

export default botConfig;
