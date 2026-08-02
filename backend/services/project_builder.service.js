/**
 * Project Scaffolding Service
 * NexoApps Platform - Phase 6A (Version 2.1)
 */

class ProjectBuilderService {
  getProjectFiles(projectId) {
    return [
      {
        id: 'f-1',
        projectId,
        filePath: 'src/pages/index.tsx',
        fileType: 'typescript',
        content: `import React from 'react';\n\nexport default function Home() { return <div className="p-8">AI Generated App</div>; }`,
        sizeBytes: 120,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'f-2',
        projectId,
        filePath: 'src/components/Scorecard.tsx',
        fileType: 'typescript',
        content: `import React from 'react';\n\nexport const Scorecard = () => <div>Live Score: 184/3 (18.2 ov)</div>;`,
        sizeBytes: 95,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'f-3',
        projectId,
        filePath: 'database/schema.sql',
        fileType: 'sql',
        content: `CREATE TABLE matches (id UUID PRIMARY KEY, team_a VARCHAR(100), team_b VARCHAR(100));`,
        sizeBytes: 80,
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

module.exports = new ProjectBuilderService();
