import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface TaskNodeData {
  label: string;
  color?: string;
  width?: number;
  height?: number;
  textColor?: string;
}

const TaskNode = ({ id, data, selected, isConnectable }: NodeProps<TaskNodeData>) => {
  return (
    <div
      className="react-flow__node-custom text-center"
      style={{
        '--node-bg-color': data.color || '#e0f2fe',
        '--node-text-color': data.textColor || '#0c4a6e',
        border: selected ? '2px solid #787878' : '1px solid #333',
        padding: 10,
        width: data.width || 100,
        height: data.height || 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        borderRadius: 4,
      }}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-500" isConnectable={isConnectable} />
      <div className="text-center" style={{ width: '100%' }}>
        {data.label || 'Task'}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-500" isConnectable={isConnectable} />
    </div>
  );
};

export default memo(TaskNode);
