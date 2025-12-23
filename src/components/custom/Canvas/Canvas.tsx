'use client';

import React, { useCallback, DragEvent, useState, useMemo } from 'react';
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    Controls,
    Edge,
    Node,
    OnConnect,
    OnNodesChange,
    OnEdgesChange,
    ReactFlowProvider,
    NodeTypes,
    ReactFlowInstance,
    MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import RectNode from '@/components/nodes/RectNode/RectNode';
import CircleNode from '@/components/nodes/CircleNode/CircleNode';
import ImageNode from '@/components/nodes/ImageNode/ImageNode';

interface Props {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onNodeSelect: (node: any) => void;
    onAddNode: (type: string, position: { x: number; y: number }) => void;
    onPaneClick?: () => void;
}

const Canvas = ({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeSelect,
    onAddNode,
    onPaneClick
}: Props) => {
    const nodeTypes = useMemo(() => ({
        rect: RectNode,
        circle: CircleNode,
        image: ImageNode,
    }), []);

    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event: DragEvent) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');
        console.log('type', type)

        if (!type || !reactFlowInstance) return;

        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        onAddNode(type, position);
    }, [reactFlowInstance, onAddNode]);

    const onNodeClick = (_: React.MouseEvent, node: any) => {
        onNodeSelect?.(node);
    }

    return (
        <ReactFlowProvider>
            <div
                className="w-full h-full bg-slate-50"
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    onPaneClick={onPaneClick}
                    nodeTypes={nodeTypes as unknown as NodeTypes}
                    onInit={setReactFlowInstance}
                    fitView
                    nodesDraggable={true}
                    panOnDrag={true}
                    elementsSelectable={true}
                >
                    <Background variant={BackgroundVariant.Dots} color="#e5e5e5" gap={15} size={1} />
                    <Controls position="bottom-right" />
                    <MiniMap position="bottom-left" />
                </ReactFlow>
            </div>
        </ReactFlowProvider>
    )
}

export default Canvas;