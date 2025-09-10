import { useState } from 'react';

const ShapesPanel = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    if (isCollapsed) {
        return (
            <div className="bg-gray-100 border-r border-gray-200">
                <button onClick={() => setIsCollapsed(false)} className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        )
    }

    return (
        <aside className="w-64 bg-gray-100 p-4 border-r border-gray-200 flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Shapes</h2>
                <button onClick={() => setIsCollapsed(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
            </div>
            
            <h3 className="font-medium text-gray-600 text-sm mb-2">Flowchart</h3>
            <div className="space-y-2">
                <div 
                    className="p-3 border border-gray-300 bg-white rounded-md cursor-grab text-center font-medium" 
                    onDragStart={(event) => onDragStart(event, 'start')} 
                    draggable
                >
                    Start
                </div>
                <div 
                    className="p-3 border border-gray-300 bg-white rounded-md cursor-grab text-center font-medium" 
                    onDragStart={(event) => onDragStart(event, 'task')} 
                    draggable
                >
                    Task
                </div>
                <div 
                    className="p-3 border border-gray-300 bg-white rounded-md cursor-grab text-center font-medium" 
                    onDragStart={(event) => onDragStart(event, 'decision')} 
                    draggable
                >
                    Decision
                </div>
                
                
                <div 
                    className="p-3 border border-gray-300 bg-white rounded-md cursor-grab text-center font-medium" 
                    onDragStart={(event) => onDragStart(event, 'subProcess')} 
                    draggable
                >
                    Sub-process
                </div>
                <div 
                    className="p-3 border border-gray-300 bg-white rounded-md cursor-grab text-center font-medium" 
                    onDragStart={(event) => onDragStart(event, 'end')} 
                    draggable
                >
                    End
                </div>
            </div>
      </aside>
    );
}

export default ShapesPanel;