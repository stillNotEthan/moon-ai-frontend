import { Node } from '@xyflow/react';
import { NodeConfig, NodeData } from '../../custom/Panel/types';

export const circleConfig: NodeConfig = {
    type: 'circle',
    label: '圆形节点',
    initialData: {
        label: '圆形节点',
        width: 100,
        height: 100,
        color: '#ffffff',
    },
    onNodeUpdate: (oldNode: Node, newData: NodeData) => {
        return {
            ...oldNode,
            position: {
                x: newData.x,
                y: newData.y,
            },
            data: {
                ...oldNode.data,
                label: newData.label,
                width: newData.width,
                height: newData.height,
                color: newData.color,
            }
        };
    }
};