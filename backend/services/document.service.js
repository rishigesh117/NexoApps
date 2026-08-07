/**
 * Document Service — NexoApps Phase 11D (v8.4)
 * Handles document libraries, document versions, and shared documents.
 */

class DocumentService {
  constructor() {
    this.libraries = [
      {
        id: 'lib-1',
        workspaceId: 'ws-main',
        libraryName: 'Enterprise AI Architecture Specs',
        description: 'Core design documents and architectural blueprints for NexoApps',
        createdBy: 'user-admin',
        createdAt: new Date().toISOString()
      }
    ];

    this.documents = [
      {
        id: 'doc-1',
        libraryId: 'lib-1',
        title: 'Version 8.4 AI Collaboration Platform Architecture',
        fileType: 'pdf',
        ownerId: 'user-admin',
        currentVersionId: 'ver-1',
        permissions: 'write',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    this.versions = [
      {
        id: 'ver-1',
        documentId: 'doc-1',
        versionNumber: 1,
        filePath: '/storage/docs/v8.4-collaboration-arch-v1.pdf',
        fileSize: 1048576,
        uploadedBy: 'user-admin',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async getDocumentLibraries(workspaceId) {
    return this.libraries.filter(l => l.workspaceId === workspaceId || !workspaceId);
  }

  async createDocumentLibrary(data) {
    const lib = {
      id: `lib-${Date.now()}`,
      workspaceId: data.workspaceId || 'ws-main',
      libraryName: data.libraryName || 'New Library',
      description: data.description || '',
      createdBy: data.createdBy || 'user-admin',
      createdAt: new Date().toISOString()
    };
    this.libraries.push(lib);
    return lib;
  }

  async getSharedDocuments(libraryId) {
    return this.documents.filter(d => d.libraryId === libraryId || !libraryId);
  }

  async createSharedDocument(data) {
    const docId = `doc-${Date.now()}`;
    const verId = `ver-${Date.now()}`;

    const doc = {
      id: docId,
      libraryId: data.libraryId || 'lib-1',
      title: data.title || 'Untitled Document',
      fileType: data.fileType || 'docx',
      ownerId: data.ownerId || 'user-admin',
      currentVersionId: verId,
      permissions: data.permissions || 'view',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const ver = {
      id: verId,
      documentId: docId,
      versionNumber: 1,
      filePath: data.filePath || `/storage/docs/${docId}-v1.${data.fileType || 'docx'}`,
      fileSize: data.fileSize || 512000,
      uploadedBy: data.ownerId || 'user-admin',
      createdAt: new Date().toISOString()
    };

    this.documents.push(doc);
    this.versions.push(ver);
    return doc;
  }

  async getDocumentVersions(documentId) {
    return this.versions.filter(v => v.documentId === documentId);
  }
}

module.exports = new DocumentService();
