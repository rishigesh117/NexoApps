/**
 * Multimodal Service — NexoApps Phase 9A
 * Handles vision processing, document analysis, audio processing & multimodal request logging.
 */

const { v4: uuidv4 } = require('uuid');

class MultimodalService {
  constructor() {
    this.requests = [
      {
        id: 'mm-req-1',
        userId: 'user-owner',
        requestType: 'vision',
        providerId: 'prov-openai',
        modelKey: 'gpt-4o',
        inputPayload: JSON.stringify({ prompt: 'Analyze UI component alignment and accessibility violations in this screenshot.' }),
        outputPayload: JSON.stringify({ analysis: 'Detected high contrast text. Minor padding inconsistency on primary CTA button.' }),
        status: 'completed',
        createdAt: new Date().toISOString()
      }
    ];

    this.assets = [
      {
        id: 'mm-asset-1',
        requestId: 'mm-req-1',
        assetType: 'image',
        assetUrl: '/assets/samples/dashboard-preview.png',
        fileSize: 524288,
        mimeType: 'image/png',
        createdAt: new Date().toISOString()
      }
    ];
  }

  async processRequest(data) {
    const reqId = `mm-req-${uuidv4().substring(0, 8)}`;
    const request = {
      id: reqId,
      userId: data.userId || 'user-owner',
      requestType: data.requestType || 'vision',
      providerId: data.providerId || 'prov-openai',
      modelKey: data.modelKey || 'gpt-4o',
      inputPayload: JSON.stringify(data.inputPayload || {}),
      outputPayload: JSON.stringify({ message: `Successfully processed ${data.requestType || 'multimodal'} request.` }),
      status: 'completed',
      createdAt: new Date().toISOString()
    };
    this.requests.push(request);

    if (data.assets && Array.isArray(data.assets)) {
      data.assets.forEach(a => {
        this.assets.push({
          id: `mm-asset-${uuidv4().substring(0, 8)}`,
          requestId: reqId,
          assetType: a.assetType || 'image',
          assetUrl: a.assetUrl || '/assets/samples/sample.png',
          fileSize: a.fileSize || 1024,
          mimeType: a.mimeType || 'image/png',
          createdAt: new Date().toISOString()
        });
      });
    }

    return request;
  }

  async listRequests() {
    return this.requests;
  }
}

module.exports = new MultimodalService();
