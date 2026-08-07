/**
 * Access Control Service — NexoApps Phase 10D
 * Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).
 */

class AccessControlService {
  constructor() {
    this.roles = [
      { id: 'role-admin', roleName: 'Global Security Admin', description: 'Full administrative access across security platform', isSystemRole: true, createdAt: new Date().toISOString() },
      { id: 'role-auditor', roleName: 'Compliance Auditor', description: 'Read-only access to audit logs and compliance controls', isSystemRole: true, createdAt: new Date().toISOString() }
    ];
  }

  async getRoles() {
    return this.roles;
  }
}

module.exports = new AccessControlService();
