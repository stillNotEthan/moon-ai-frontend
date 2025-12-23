import { useRef, DragEvent } from "react";
import {
    Square,
    Circle,
    Image,
    Braces,
} from "lucide-react";

interface NodeSidebarProps {
    onAddNode: (type: 'rect' | 'circle' | 'image', data?: any) => void;
    onExport: () => void;
}

const acceptImageTypes = ['.jpg', '.jpeg', '.png']

const NodeSidebar = ({ onAddNode, onExport }: NodeSidebarProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDragStart = (event: DragEvent, nodeType: string) => {
        event.dataTransfer?.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    }

    return (
        <div className="flex flex-col gap-3 p-2 w-16 border-r h-full items-center justify-center z-50 relative bg-transparent">
            <div>3 个</div>
            <div
                draggable
                className="p-1 hover:bg-slate-100 rounded cursor-pointer"
                onDragStart={(e) => onDragStart(e, 'rect')}
                onClick={() => onAddNode('rect')}
            >
                <Square
                    className="cursor-pointer hover:bg-slate-100 rounded-md pointer-events-none"
                />
            </div>
            <div
                draggable
                className="p-1 rounded hover:bg-slate-100 cursor-pointer"
                onDragStart={(e) => onDragStart(e, 'circle')}
                onClick={() => onAddNode('circle')}
            >
                <Circle
                    className="cursor-pointer hover:bg-slate-100 rounded-md pointer-events-none"
                />
            </div>
            <div
                draggable
                className="p-1 rounded hover:bg-slate-100 cursor-pointer"
                onDragStart={(e) => onDragStart(e, 'image')}
                onClick={() => fileInputRef.current?.click()}
            >
                <Image className="pointer-events-none" />
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
                            // Reset value so the same file can be selected again
                            e.target.value = '';
                        }
                    }}
                />
            </div>
            <div className="p-1 rounded hover:bg-slate-100 cursor-pointer">
                <Braces
                    className="cursor-pointer"
                    onClick={() => {
                        onExport();
                    }}
                />
            </div>
        </div>
    )
}

export default NodeSidebar;