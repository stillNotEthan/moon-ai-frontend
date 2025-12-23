import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Node, Edge } from "@xyflow/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function exportToJSON(nodes: Node[], edges: Edge[]) {
  return {
    nodes,
    edges,
  };
}