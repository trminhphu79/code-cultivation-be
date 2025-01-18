import { Injectable } from '@nestjs/common';
import { Role } from './role.enum';

interface IsAuthorizedParams {
  currentRole: Role;
  requiredRole: Role;
  guildId?: string;
  userGuildRoles?: UserGuildRoles;
}

type RoleHierarchy = Map<Role, number>;

// Define structure for user's roles in different guilds
interface UserGuildRoles {
  [guildId: string]: Role;
}

@Injectable()
export class AccessControlService {
  private readonly hierarchies: RoleHierarchy[] = [];
  private priority = 1;

  constructor() {
    // Define user-related role hierarchy
    this.buildRoles([
      Role.USER,         // Base user
      Role.GUILD_MEMBER, // Member of a guild
      Role.GUILD_OWNER,  // Owner of a guild
    ]);

    // Define admin role hierarchy (separate track)
    this.buildRoles([Role.ADMIN]); // Administrative role
  }

  /**
   * Builds a role hierarchy with increasing privileges
   * @param roles Array of roles from least to most privileged
   */
  private buildRoles(roles: Role[]): void {
    const hierarchy: RoleHierarchy = new Map();
    
    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });

    this.hierarchies.push(hierarchy);
  }

  /**
   * Checks if the user has sufficient privileges
   * @param params Object containing roles and guild context
   * @returns boolean indicating if access is authorized
   */
  public isAuthorized({
    currentRole,
    requiredRole,
    guildId,
    userGuildRoles,
  }: IsAuthorizedParams): boolean {
    // If it's a guild-specific check
    if (guildId && userGuildRoles) {
      const userGuildRole = userGuildRoles[guildId];
      
      // If user has a specific role in this guild, use that
      if (userGuildRole) {
        return this.checkRoleHierarchy(userGuildRole, requiredRole);
      }
    }

    // Fallback to global role check
    return this.checkRoleHierarchy(currentRole, requiredRole);
  }

  /**
   * Checks if the role has sufficient privileges in the hierarchy
   */
  private checkRoleHierarchy(currentRole: Role, requiredRole: Role): boolean {
    // Admin always has access
    if (currentRole === Role.ADMIN) return true;

    for (const hierarchy of this.hierarchies) {
      const currentPriority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);

      if (currentPriority && requiredPriority && currentPriority >= requiredPriority) {
        return true;
      }
    }

    return false;
  }
}
