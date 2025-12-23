import {
    Handle,
    Position,
    NodeProps
} from '@xyflow/react';
import { CustomNode } from '../../custom/Canvas/types';

const CircleNode = ({data, selected}: NodeProps<CustomNode>) => {
    return (
        <div
            className={`rounded-full bg-white border-2 flex items-center justify-center ${selected ? 'border-blue-500' : 'border-gray-200'}`}
            style={{
                width: data.width,
                height: data.height,
                backgroundColor: data.color,
            }}
        >
            <Handle
                type="target"
                position={Position.Top}
                className="w-2 h-2 bg-blue-400!"
            />
            <span className="text-xs font-bold">{data.label || '圆形节点'}</span>
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-2 h-2 bg-blue-400!"
            />
        </div>
    )
}

export default CircleNode;