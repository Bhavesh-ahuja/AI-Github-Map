import React, { useMemo } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

// 1. REGISTER THE LAYOUT
cytoscape.use(dagre);

const FileGraph = ({ fileList }) => {
  
  // 2. TRANSFORM DATA
  const elements = useMemo(() => {
    const nodes = [];
    const edges = [];
    const createdPaths = new Set();

    if (!fileList || fileList.length === 0) return [];

    fileList.forEach((file) => {
      // Fix Windows paths just in case
      const normalizedPath = file.path.replace(/\\/g, '/');
      const parts = normalizedPath.split('/');
      let parentPath = "";
      
      parts.forEach((part, index) => {
        const currentPath = parentPath ? `${parentPath}/${part}` : part;
        
        if (!createdPaths.has(currentPath)) {
          const isFile = index === parts.length - 1;
          nodes.push({
            data: {
              id: currentPath,
              label: part,
              type: isFile ? 'file' : 'folder'
            }
          });
          createdPaths.add(currentPath);
        }

        if (parentPath) {
          edges.push({
            data: { source: parentPath, target: currentPath }
          });
        }

        parentPath = currentPath;
      });
    });

    return [...nodes, ...edges];
  }, [fileList]);

  // 3. HIERARCHICAL LAYOUT CONFIG (The "GitDiagram" Look)
  const layout = {
    name: 'dagre',
    rankDir: 'LR',      // 'LR' = Left-to-Right. Change to 'TB' for Top-to-Bottom.
    ranker: 'network-simplex',
    spacingFactor: 1.2, // Spread things out a bit
    nodeDimensionsIncludeLabels: true, // Calculate space for text
    animate: true,
    animationDuration: 500,
    padding: 30,
  };

  // 4. STYLE
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'font-size': '11px',
        'color': '#334155', // slate-700
        'background-color': '#3b82f6', // blue-500
        'width': 12,
        'height': 12,
        'text-margin-y': 4
      }
    },
    {
      selector: 'node[type="folder"]',
      style: {
        'background-color': '#fbbf24', // amber-400
        'shape': 'round-rectangle',
        'width': 16,
        'height': 16,
        'border-width': 0
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 1.5,
        'line-color': '#cbd5e1', // slate-300
        'curve-style': 'taxi',   // 'taxi' makes right-angled lines (very neat!)
        'taxi-direction': 'horizontal',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#cbd5e1',
        'arrow-scale': 0.8
      }
    }
  ];

  return (
    <div className="w-full h-[800px] border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
      <CytoscapeComponent 
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={layout}
        cy={(cy) => { 
          // Center nicely on load
          cy.on('add', () => cy.layout(layout).run());
        }}
      />
    </div>
  );
};

export default FileGraph;
