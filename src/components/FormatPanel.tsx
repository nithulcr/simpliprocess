import { useState, useEffect } from 'react';
import type { Node } from 'reactflow';

const FormatPanel = ({ node, onNodeDataChange }: { node: Node | null; onNodeDataChange: (id: string, data: any) => void }) => {
    const [label, setLabel] = useState(node?.data?.label || '');

    useEffect(() => {
        setLabel(node?.data?.label || '');
    }, [node]);

    const onLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLabel = event.target.value;
        setLabel(newLabel);
        if (node) {
            onNodeDataChange(node.id, { label: newLabel });
        }
    }

    if (!node) {
        return (
            <aside className="w-72 bg-gray-100 p-4 border-l border-gray-200">
                <h2 className="text-lg font-semibold">Format</h2>
                <p className="text-sm text-gray-500 mt-4">Select a step to see its properties.</p>
            </aside>
        );
    }

    return (
        <aside className="w-72 bg-gray-100 p-4 border-l border-gray-200">
            <h2 className="text-lg font-semibold">Format</h2>
            <div className="mt-4 space-y-4">
                <details open>
                    <summary className="font-medium cursor-pointer">Text</summary>
                    <div className="mt-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Label</label>
                        <input 
                            type="text" 
                            value={label}
                            onChange={onLabelChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </details>
                <details open>
                    <summary className="font-medium cursor-pointer">Style</summary>
                    <div className="mt-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Background Color</label>
                        <input 
                            type="color"
                            value={node?.data?.color || '#ffffff'}
                            onChange={(e) => onNodeDataChange(node.id, { color: e.target.value })}
                            className="mt-1 block w-full h-10"
                        />
                        <label className="block text-sm font-medium text-gray-700">Text Color</label>
                        <input 
                            type="color"
                            value={node?.data?.textColor || '#000000'}
                            onChange={(e) => onNodeDataChange(node.id, { textColor: e.target.value })}
                            className="mt-1 block w-full h-10"
                        />
                    </div>
                </details>
            </div>
        </aside>
    );
};

export default FormatPanel;