import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { StartIcon, TaskIcon, DecisionIcon, SubProcessIcon, EndIcon, DefaultEdgeIcon, StraightEdgeIcon, StepEdgeIcon, SmoothStepEdgeIcon } from './icons';

const shapes = [
    { value: 'start', label: 'Start', icon: <StartIcon strokeWidth={1} /> },
    { value: 'task', label: 'Task', icon: <TaskIcon strokeWidth={1} /> },
    { value: 'decision', label: 'Decision', icon: <DecisionIcon strokeWidth={1} /> },
    { value: 'subProcess', label: 'Sub-process', icon: <SubProcessIcon strokeWidth={1} /> },
    { value: 'end', label: 'End', icon: <EndIcon strokeWidth={1} /> },
];

const edgeTypes = [
    { value: 'default', label: 'Default', icon: <DefaultEdgeIcon strokeWidth={1} /> },
    { value: 'straight', label: 'Straight', icon: <StraightEdgeIcon strokeWidth={1} /> },
    { value: 'step', label: 'Step', icon: <StepEdgeIcon strokeWidth={1} /> },
    { value: 'smoothstep', label: 'Smooth Step', icon: <SmoothStepEdgeIcon strokeWidth={1} /> },
];

const ShapesPanel = ({ edgeType, setEdgeType }: { edgeType: string; setEdgeType: (type: string) => void }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className={`bg-light border-end d-flex flex-column p-3 overflow-auto ${isCollapsed ? 'align-items-center' : ''}`} style={{ width: isCollapsed ? '80px' : '250px', transition: 'width 0.3s' }}>
            <div className={`d-flex ${isCollapsed ? 'flex-column' : 'justify-content-between'} align-items-center mb-4 w-100`}>
                {!isCollapsed && <h2 className="h5">Welcome Back</h2>}
                <Button onClick={() => setIsCollapsed(!isCollapsed)} variant="light">
                    {isCollapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    )}
                </Button>
            </div>
            
            {!isCollapsed && <h6 className="text-muted">Flowchart</h6>}
            <div className="d-grid gap-2 w-100">
                {shapes.map((shape) => (
                    <Card 
                        key={shape.value} 
                        className={`p-2 d-flex flex-row align-items-center ${isCollapsed ? 'justify-content-center' : ''}`}
                        onDragStart={(event) => onDragStart(event, shape.value)} 
                        draggable
                    >
                        {shape.icon}
                        {!isCollapsed && <span className="ms-2">{shape.label}</span>}
                    </Card>
                ))}
            </div>

            {!isCollapsed && <h6 className="text-muted mt-4">Edge Type</h6>}
           {isCollapsed && <span className="bg-primary mt-3" style={{ height: '0.06rem', display: 'block', width: '100%' }}></span>}


            <div className="d-grid gap-2 w-100 mt-3">
                {edgeTypes.map((type) => (
                    <Card 
                        key={type.value} 
                        className={`p-2 d-flex flex-row align-items-center ${isCollapsed ? 'justify-content-center' : ''} ${edgeType === type.value ? 'border-primary' : ''}`}
                        onClick={() => setEdgeType(type.value)}
                    >
                        {type.icon}
                        {!isCollapsed && <span className="ms-2">{type.label}</span>}
                    </Card>
                ))}
            </div>
      </aside>
    );
}

export default ShapesPanel;