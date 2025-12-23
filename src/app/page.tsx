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
import JsonPanel from '@/components/custom/Json-panel/JsonPanel';
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
  const [showJsonPanel, setShowJsonPanel] = useState(false);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);

        if (selectedNode) {
          const nodeRemoved = changes.some(
            (change) => change.type === 'remove' && change.id === selectedNode.id
          );

          if (nodeRemoved) {
            setSelectedNode(null);
          } else {
            const positionChange = changes.find(
              (change) => change.type === 'position' && change.id === selectedNode.id && change.position
            );

            if (positionChange && positionChange.type === 'position' && positionChange.position) {
              setSelectedNode((prev: any) => ({
                ...prev,
                x: positionChange.position!.x,
                y: positionChange.position!.y,
              }));
            }
          }
        }

        return updatedNodes;
      });
    },
    [selectedNode],
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
      <div className="fixed inset-0 z-60 flex items-center justify-start pointer-events-none">
        <div className="w-16 ml-3 pointer-events-auto">
          <Sidebar
            onAddNode={onAddNode}
            onExport={onExport}
            nodeCount={nodes.length}
            setShowJsonPanel={setShowJsonPanel}
          />
        </div>
      </div>
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
          onPaneClick={() => {
            setSelectedNode(null);
            setShowJsonPanel(false);
          }}
        />
      </div>
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-end pointer-events-none">
          <div className="pointer-events-auto animate-in slide-in-from-right duration-300">
            <div className="bg-white rounded-lg shadow-2xl w-80 max-h-[calc(100vh-6rem)] mr-5">
              <AttributesPanel
                node={selectedNode}
                onUpdate={(updatedData) => {
                  setSelectedNode(updatedData);
                  setNodes((nds) =>
                    nds.map((node) => {
                      if (node.id === updatedData.id) {
                        const config = nodeConfigs[node.type || 'rect'];

                        if (config?.onNodeUpdate) {
                          const newNode = config.onNodeUpdate(node, updatedData);
                          return newNode;
                        } else {
                          return node;
                        }
                      }
                      return node;
                    })
                  );
                }}
                setSelectedNode={setSelectedNode}
              />
            </div>
          </div>
        </div>
      )}
      {
        showJsonPanel && (
          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center pointer-events-none mt-1 pb-2">
            <div className="pointer-events-auto animate-in slide-in-from-bottom duration-300">
              <JsonPanel nodes={nodes} edges={edges} setShowJsonPanel={setShowJsonPanel} />
            </div>
          </div>
        )
      }
    </div>
  )
}