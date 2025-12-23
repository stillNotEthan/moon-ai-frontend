import {
    Handle,
    Position,
    NodeProps,
} from '@xyflow/react';
import { CustomNode } from '../../custom/Canvas/types';

const RectNode = ({ data, selected }: NodeProps<CustomNode>) => {
    return (
        <div
            className={`px-4 py-2 shadow-md bg-white border-2 ${selected ? 'border-blue-500' : 'border-gray-200'}`}
            style={{
                width: data.width,
                height: data.height,
                backgroundColor: data.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Handle
                type="target"
                position={Position.Right}
                className="w-2 h-2 bg-blue-400!"
            />
            <span className="text-xs font-bold">{data.label || '矩形节点'}</span>
            <Handle
                type="source"
                position={Position.Left}
                className="w-2 h-2 bg-blue-400!"
            />
        </div>
    )
}

export default RectNode;