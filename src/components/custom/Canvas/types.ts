import { Node } from '@xyflow/react';

export interface CustomNodeData extends Record<string, unknown> {
    label?: string;
    width?: number;
    height?: number;
    color?: string;
    imageUrl?: string;
}

export type CustomNode = Node<CustomNodeData>;
