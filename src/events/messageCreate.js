import { Events } from 'discord.js';
import { logger } from '../utils/logger.js';
import { getLevelingConfig, getUserLevelData } from '../services/leveling.js';
import { addXp } from '../services/xpSystem.js';
import { checkRateLimit } from '../utils/rateLimiter.js';

const MESSAGE_XP_RATE_LIMIT_ATTEMPTS = 12;
const MESSAGE_XP_RATE_LIMIT_WINDOW_MS = 10000;

export default {
  name: Events.MessageCreate,
  async execute(message, client) {
    try {
      
      if (message.author.bot || !message.guild) return;

      await handleLeveling(message, client);
    } catch (error) {
      logger.error('Error en el evento messageCreate:', error);
    }
  }
};

async function handleLeveling(message, client) {
  try {
    const rateLimitKey = `xp-event:${message.guild.id}:${message.author.id}`;
    const canProcess = await checkRateLimit(rateLimitKey, MESSAGE_XP_RATE_LIMIT_ATTEMPTS, MESSAGE_XP_RATE_LIMIT_WINDOW_MS);
    if (!canProcess) {
      return;
    }

    const levelingConfig = await getLevelingConfig(client, message.guild.id);
    
    if (!levelingConfig?.enabled) {
      return;
    }

    // Omitir si el canal está en la lista de ignorados
    if (levelingConfig.ignoredChannels?.includes(message.channel.id)) {
      return;
    }

    // Omitir si el usuario tiene un rol ignorado
    if (levelingConfig.ignoredRoles?.length > 0) {
      const member = await message.guild.members.fetch(message.author.id).catch(() => {
        return null;
      });
      if (member && member.roles.cache.some(role => levelingConfig.ignoredRoles.includes(role.id))) {
        return;
      }
    }

    // Omitir si el usuario está en la lista negra
    if (levelingConfig.blacklistedUsers?.includes(message.author.id)) {
      return;
    }

    // Omitir si el mensaje está vacío o solo contiene espacios
    if (!message.content || message.content.trim().length === 0) {
      return;
    }

    const userData = await getUserLevelData(client, message.guild.id, message.author.id);
    
    // Verificar el tiempo de reutilización (cooldown) de XP
    const cooldownTime = levelingConfig.xpCooldown || 60;
    const now = Date.now();
    const timeSinceLastMessage = now - (userData.lastMessage || 0);
    
    if (timeSinceLastMessage < cooldownTime * 1000) {
      return;
    }

    // Obtener los rangos de XP configurados
    const minXP = levelingConfig.xpRange?.min || levelingConfig.xpPerMessage?.min || 15;
    const maxXP = levelingConfig.xpRange?.max || levelingConfig.xpPerMessage?.max || 25;

    // Asegurar que los valores numéricos sean válidos y seguros
    const safeMinXP = Math.max(1, minXP);
    const safeMaxXP = Math.max(safeMinXP, maxXP);

    // Calcular la cantidad de XP a otorgar de manera aleatoria dentro del rango
    const xpToGive = Math.floor(Math.random() * (safeMaxXP - safeMinXP + 1)) + safeMinXP;

    // Aplicar multiplicador de XP si existe y es válido
    let finalXP = xpToGive;
    if (levelingConfig.xpMultiplier && levelingConfig.xpMultiplier > 1) {
      finalXP = Math.floor(finalXP * levelingConfig.xpMultiplier);
    }

    // Otorgar los puntos de XP e identificar si subió de nivel
    const result = await addXp(client, message.guild, message.member, finalXP);
    
    if (result.success && result.leveledUp) {
      logger.info(
        `${message.author.tag} subió al nivel ${result.level} en ${message.guild.name}`
      );
    }
  } catch (error) {
    logger.error('Error al gestionar la experiencia del mensaje:', error);
  }
}
