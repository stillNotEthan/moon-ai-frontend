'use client';

import { useState, useCallback } from 'react';
import { 
  OnConnect, 
  addEdge, 
  Node, 
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  Edge
} from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import Canvas from '@/components/custom/Canvas/Canvas';
import Sidebar from '@/components/custom/Sidebar/Sidebar';
import AttributesPanel from '@/components/custom/Panel/Panel';

import { rectConfig } from '@/components/nodes/RectNode/config';
import { circleConfig } from '@/components/nodes/CircleNode/config';
import { imageConfig } from '@/components/nodes/ImageNode/config';
import { NodeConfig } from '@/components/custom/Panel/types';

const nodeConfigs: Record<string, NodeConfig> = {
  rect: rectConfig,
  circle: circleConfig,
  image: imageConfig,
};

export default function Home() {
// ...
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      console.log('Nodes changed:', changes);
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [],
  );

  const onAddNode = (type: string, data?: any) => {
    let initialData;
    switch (type) {
      case 'rect':
        initialData = { ...rectConfig.initialData };
        break;
      case 'circle':
        initialData = { ...circleConfig.initialData };
        break;
      case 'image':
        initialData = { ...imageConfig.initialData, imageUrl: data || '' };
        break;
      default:
        initialData = { ...rectConfig.initialData };
    }

    const newNode = {
      id: `${type}-${uuidv4()}`,
      type,
      position: { x: 100, y: 100 },
      data: initialData,
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const onAddNodeFromDrop = (type: string, position: { x: number; y: number }) => {
    let initialData;
    switch (type) {
      case 'rect':
        initialData = { ...rectConfig.initialData };
        break;
      case 'circle':
        initialData = { ...circleConfig.initialData };
        break;
      case 'image':
        initialData = { ...imageConfig.initialData };
        break;
      default:
        initialData = { ...rectConfig.initialData };
    }

    const newNode = {
      id: `${type}-${uuidv4()}`,
      type,
      position,
      data: initialData,
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onExport = () => {
    console.log('export');
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Sidebar
        onAddNode={onAddNode}
        onExport={onExport}
        nodeCount={nodes.length}
      />
      <div className="flex-1 relative">
        <Canvas 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeSelect={(node) => {
            setSelectedNode({
              id: node.id,
              type: node.type,
              x: node.position.x,
              y: node.position.y,
              ...node.data
            });
          }} 
          onAddNode={onAddNodeFromDrop}
        />
      </div>
      <AttributesPanel 
        node={selectedNode} 
        onUpdate={(updatedData) => {
          console.log('[Page] onUpdate received:', updatedData);
          setSelectedNode(updatedData);
          setNodes((nds) => 
            nds.map((node) => {
              if (node.id === updatedData.id) {
                const config = nodeConfigs[node.type || 'rect'];
                console.log('[Page] Processing node:', node.id, 'Type:', node.type, 'Config:', !!config);
                
                if (config?.onNodeUpdate) {
                  const newNode = config.onNodeUpdate(node, updatedData);
                  console.log('[Page] Node updated via config:', newNode);
                  return newNode;
                } else {
                   // Fallback for types without specific update logic
                   console.warn('[Page] No update logic for type:', node.type);
                   return node;
                }
              }
              return node;
            })
          );
        }} 
      />
    </div>
  )
}