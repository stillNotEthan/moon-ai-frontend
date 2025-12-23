import {
    Handle,
    Position,
    NodeProps,
} from '@xyflow/react';
import { CustomNode } from '../../custom/Canvas/types';

const ImageNode = ({ data, selected }: NodeProps<CustomNode>) => {
    return (
        <div
            className={`shadow-lg bg-white border-2 overflow-hidden ${selected ? 'border-blue-500' : 'border-gray-200'}`}
            style={{
                width: data.width,
                height: data.height,
            }}
        >
            <Handle
                type="target"
                position={Position.Right}
            />
            {
                data.imageUrl ? (
                    <img
                        src={data.imageUrl}
                        alt="node"
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="p-4 text-xs text-gray-400">无图片展示</div>
                )
            }
            <Handle
                type="source"
                position={Position.Left}
            />
        </div>
    )
}

export default ImageNode;