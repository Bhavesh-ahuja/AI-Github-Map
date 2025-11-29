import React, { useMemo, useEffect, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { getIcon } from '../utils/FileIcons';


cytoscape.use(dagre);


const FileGraph = ({ fileList, onNodeClick }) => {
  const cyRef = useRef(null);

  const elements = useMemo(() => {
    const nodes = [];
    const createdPaths = new Set();

    if (!fileList || fileList.length === 0) return [];

    fileList.forEach((file) => {
      const normalizedPath = file.path.replace(/\\/g, '/');
      const parts = normalizedPath.split('/');
      let parentPath = "";
      
      parts.forEach((part, index) => {
        const currentPath = parentPath ? `${parentPath}/${part}` : part;
        const isFile = index === parts.length - 1;
        
        if (!createdPaths.has(currentPath)) {
          // Get Icon URL
          const iconUrl = isFile ? getIcon(part) : null;

          const node = {
            data: {
              id: currentPath,
              label: part,
              type: isFile ? 'file' : 'folder',
              icon: iconUrl
            }
          };

          if (parentPath) {
            node.data.parent = parentPath;
          }

          nodes.push(node);
          createdPaths.add(currentPath);
        }
        parentPath = currentPath;
      });
    });

    return nodes;
  }, [fileList]);

  const layout = {
    name: 'dagre',
    rankDir: 'TB',
    ranker: 'network-simplex',
    nodeDimensionsIncludeLabels: true,
    padding: 30,
    spacingFactor: 1.2,
    animate: true,
    animationDuration: 500,
  };

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) return;

    cy.off('tap', 'node');
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      if (node.data('type') === 'file') {
        onNodeClick(node.data('id'));
      }
    });

  }, [elements, onNodeClick]);

  const stylesheet = [
    // --- FILES (ICONS) ---
    {
      selector: 'node[type="file"]',
      style: {
        'label': 'data(label)',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'font-size': '10px',
        'color': '#1e293b',
        
        // CRITICAL FIX FOR ICONS:
        // 1. Make the node background transparent (so no white circle behind it)
        'background-color': 'transparent', 
        'background-opacity': 0, // Ensure transparency
        
        // 2. Set image to the icon
        'background-image': 'data(icon)',
        
        // 3. Use 'contain' to force the image to scale WITH the node zoom
        'background-fit': 'contain',
        
        // 4. Remove any clipping/dimensions forcing
        'background-clip': 'none', 

        'width': 24,
        'height': 24,
        'border-width': 0,
        'text-margin-y': 4
      }
    },
    // --- FOLDERS ---
    {
      selector: 'node[type="folder"]',
      style: {
        'label': 'data(label)',
        'text-valign': 'top',
        'text-halign': 'center',
        'font-size': '11px',
        'font-weight': 'bold',
        'color': '#64748b',
        'background-color': '#f1f5f9',
        'border-color': '#cbd5e1',
        'border-width': 1,
        'shape': 'round-rectangle',
        'padding': 12,
        'text-margin-y': -8
      }
    },
    {
      selector: ':selected',
      style: {
        'border-width': 2,
        'border-color': '#2563eb',
        'background-color': '#bfdbfe'
      }
    }
  ];

  return (
    <div className="w-full h-[800px] border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm relative">
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
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs text-slate-500 border border-slate-200 pointer-events-none shadow-sm z-10">
        Boxes = Folders • Icons = Files
      </div>
    </div>
  );
};

export default FileGraph;