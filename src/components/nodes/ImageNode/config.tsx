import { Node } from '@xyflow/react';
import { NodeConfig, NodeData } from '../../custom/Panel/types';

export const imageConfig: NodeConfig = {
    type: 'image',
    label: '图片节点',
    initialData: {
        label: '图片节点',
        width: 150,
        height: 100,
        color: '#ffffff',
        imageUrl: '',
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
                imageUrl: newData.imageUrl,
            }
        };
    }
};
