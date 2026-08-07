/**
 * Extension Service — NexoApps Phase 9C
 * Enterprise Extension SDK packages, manifests, versions & dependency management.
 */

const { v4: uuidv4 } = require('uuid');

class ExtensionService {
  constructor() {
    this.extensions = [
      { id: 'ext-1', name: 'NexoApps Platform Enterprise Analytics SDK Extension', packageId: '@nexo/extension-analytics-sdk', sdkVersion: '6.2.0', author: 'Nexo Core Team', manifestJson: { name: 'Analytics Extension', version: '6.2.0' }, isVerified: true, createdAt: new Date().toISOString() }
    ];
  }

  async listExtensions() {
    return this.extensions;
  }

  async registerExtension(data) {
    const ext = {
      id: `ext-${uuidv4().substring(0, 8)}`,
      name: data.name,
      packageId: data.packageId || `@nexo/${data.name.toLowerCase().replace(/\s+/g, '-')}`,
      sdkVersion: data.sdkVersion || '6.2.0',
      author: data.author || 'Nexo Partner',
      manifestJson: data.manifestJson || {},
      isVerified: true,
      createdAt: new Date().toISOString()
    };
    this.extensions.push(ext);
    return ext;
  }
}

module.exports = new ExtensionService();
