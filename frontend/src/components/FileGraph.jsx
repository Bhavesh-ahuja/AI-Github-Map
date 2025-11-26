import React, { useMemo } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const FileGraph = ({ fileList }) => {
  
  // 1. TRANSFORM DATA: Convert paths into Nodes & Edges
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

  // 2. LAYOUT CONFIGURATION
  const layout = {
    name: 'cose',
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: true, // CRITICAL FIX: Starts nodes at random positions so they can spread out
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    animate: false 
  };

  // 3. STYLE
  const stylesheet = [
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'font-size': '10px',
        'color': '#475569',
        'background-color': '#3b82f6',
        'width': 10,
        'height': 10
      }
    },
    {
      selector: 'node[type="folder"]',
      style: {
        'background-color': '#f59e0b',
        'width': 15,
        'height': 15
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 1,
        'line-color': '#cbd5e1',
        'curve-style': 'bezier'
      }
    }
  ];

  return (
    <div className="w-full h-[800px] border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <CytoscapeComponent 
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={layout}
      />
    </div>
  );
};

export default FileGraph;