import React, { useMemo, useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

// Register Layout
  cytoscape.use(dagre);


const FileGraph = ({ fileList, onNodeClick }) => {
  const cyRef = useRef(null);

  // 1. TRANSFORM DATA
  const elements = useMemo(() => {
    const nodes = [];
    const edges = [];
    const createdPaths = new Set();

    if (!fileList || fileList.length === 0) return [];

    fileList.forEach((file) => {
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

  // 2. LAYOUT CONFIG
  const layout = {
    name: 'dagre',
    rankDir: 'LR',
    ranker: 'network-simplex',
    spacingFactor: 1.2,
    nodeDimensionsIncludeLabels: true,
    animate: true,
    animationDuration: 500,
    padding: 30,
  };

  // 3. EVENT LISTENERS
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    // Remove old listeners to avoid duplicates
    cy.off('tap', 'node');

    // Add click listener
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      // Only trigger if it's a file (blue dot), not a folder
      if (node.data('type') === 'file') {
        // Send the full path (ID) back to App.jsx
        onNodeClick(node.data('id'));
      }
    });

  }, [elements, onNodeClick]); // Re-run if elements change

  // 4. STYLE
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'font-size': '11px',
        'color': '#334155',
        'background-color': '#3b82f6',
        'width': 12,
        'height': 12,
        'text-margin-y': 4
      }
    },
    {
      selector: 'node[type="folder"]',
      style: {
        'background-color': '#fbbf24',
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
        'line-color': '#cbd5e1',
        'curve-style': 'taxi',
        'taxi-direction': 'horizontal',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#cbd5e1',
        'arrow-scale': 0.8
      }
    }
  ];

  return (
    <div className="w-full h-[800px] border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-sm relative">
      <CytoscapeComponent 
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={layout}
        cy={(cy) => { 
          cyRef.current = cy;
          cy.on('add', () => cy.layout(layout).run());
        }}
      />
      
      {/* Hint Text */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs text-slate-500 border border-slate-200 pointer-events-none">
        Click a blue node to analyze code
      </div>
    </div>
  );
};

export default FileGraph;
