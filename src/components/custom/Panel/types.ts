// Define the node types and data interface
import { Node } from '@xyflow/react';

export type NodeType = "Circle" | "Image" | "Rect";

export interface NodeData {
    id: string;
    type: string;
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color?: string;
    imageUrl?: string;
}

export interface NodeConfig {
    type: string;
    label: string;
    initialData: Record<string, any>;
    onNodeUpdate?: (oldNode: Node, newData: NodeData) => Node;
}
