import { fetchApi } from './apiClient';
import { DocumentLibrary, SharedDocument, DocumentVersion } from '../../shared/types';

export const getDocumentLibraries = async (workspaceId = 'ws-main'): Promise<DocumentLibrary[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: DocumentLibrary[] }>(`/collaboration/core/documents/libraries?workspaceId=${workspaceId}`);
    return res.data;
  } catch {
    return [
      {
        id: 'lib-1',
        workspaceId,
        libraryName: 'Enterprise AI Knowledge & Document Hub',
        description: 'Centralized repository for documents and versioning',
        createdBy: 'user-admin',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

export const getSharedDocuments = async (libraryId = 'lib-1'): Promise<SharedDocument[]> => {
  try {
    const res = await fetchApi<{ success: boolean; data: SharedDocument[] }>(`/collaboration/core/documents/shared?libraryId=${libraryId}`);
    return res.data;
  } catch {
    return [
      {
        id: 'doc-1',
        libraryId,
        title: 'NexoApps v8.4 Architecture Specification',
        fileType: 'pdf',
        ownerId: 'user-admin',
        currentVersionId: 'ver-1',
        permissions: 'edit',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
};

export const documentService = {
  getDocumentLibraries,
  getSharedDocuments
};
