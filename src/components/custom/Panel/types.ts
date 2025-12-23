// Define the node types and data interface
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
