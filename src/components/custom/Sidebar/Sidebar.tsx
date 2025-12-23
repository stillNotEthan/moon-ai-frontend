import { useRef, DragEvent } from "react";
import {
    Square,
    Circle,
    Image,
} from "lucide-react";

interface NodeSidebarProps {
    nodeCount: number;
    onAddNode: (type: 'rect' | 'circle' | 'image', data?: any) => void;
    onExport: () => void;
    setShowJsonPanel: (show: boolean) => void;
}

const acceptImageTypes = ['.jpg', '.jpeg', '.png']

const NodeSidebar = ({ onAddNode, onExport, nodeCount, setShowJsonPanel }: NodeSidebarProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer?.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    }

    return (
        <div className="flex flex-col gap-3 p-2 w-16 border-r h-full items-center justify-center z-50 relative bg-[#ffffff] rounded-lg shadow-2xl">
            <div className="text-[14px]">{nodeCount} 个</div>
            <div
                draggable
                className="flex items-center justify-center w-8 h-8 p-1 bg-[#0c7fda] rounded-[5px] cursor-pointer"
                onDragStart={(e) => onDragStart(e, 'rect')}
                onClick={() => onAddNode('rect')}
            >
                <Square
                    size={16}
                    className="cursor-pointer text-white rounded-md pointer-events-none"
                />
            </div>
            <div
                draggable
                className="flex items-center justify-center w-8 h-8 p-1 bg-green-500 rounded-[5px] cursor-pointer"
                onDragStart={(e) => onDragStart(e, 'circle')}
                onClick={() => onAddNode('circle')}
            >
                <Circle
                    size={16}
                    className="cursor-pointer text-white rounded-md pointer-events-none"
                />
            </div>
            <div
                draggable
                className="flex items-center justify-center w-8 h-8 p-1 bg-black rounded-[5px] cursor-pointer"
                onDragStart={(e) => onDragStart(e, 'image')}
                onClick={() => fileInputRef.current?.click()}
            >
                <Image
                    size={16}
                    className="cursor-pointer text-white rounded-md pointer-events-none"
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept={acceptImageTypes.join(',')}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (i) => onAddNode('image', i.target?.result as string);
                            reader.readAsDataURL(file);
                            e.target.value = '';
                        }
                    }}
                />
            </div>
            <div className="p-1 rounded hover:bg-slate-100 cursor-pointer">
                <div
                    className="w-8 h-8 flex items-center justify-center cursor-pointer text-[11px] border border-gray-300 rounded-[5px] px-2 py-1"
                    onClick={() => {
                        setShowJsonPanel(true);
                    }}
                >
                    JSON
                </div>
            </div>
        </div>
    )
}

export default NodeSidebar;