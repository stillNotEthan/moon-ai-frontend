import { Node, Edge } from '@xyflow/react';

interface JsonPanelProps {
    nodes: Node[];
    edges: Edge[];
    setShowJsonPanel: (show: boolean) => void;
}

const JsonPanel = ({ nodes, edges, setShowJsonPanel }: JsonPanelProps) => {
    return (
        <div className="flex flex-col border bg-white border-gray-200 rounded-lg p-4 shadow-lg gap-2 h-[300px] w-[calc(100vw-2rem)]">
            <div className="flex items-center justify-between">
                <div className="text-md font-bold">当前配置</div>
                <button 
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-md text-[14px]"
                    aria-label="关闭"
                    onClick={() => setShowJsonPanel(false)}
                >
                    关闭
                </button>
            </div>
            <div className="bg-gray-100 rounded-lg p-2 overflow-y-auto max-h-[calc(100vh-10rem)]">
                <pre>{JSON.stringify({ nodes, edges }, null, 2)}</pre>
            </div>
        </div>
    );
};

export default JsonPanel;