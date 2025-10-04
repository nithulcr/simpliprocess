import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface TaskNodeData {
  label: string;
  color?: string;
  width?: number;
  height?: number;
  textColor?: string;
  fontSize?: number;
}

const TaskNode = (props: NodeProps<TaskNodeData>) => {
  return (
    <div
      className="react-flow__node-custom text-center"
      style={{
        '--node-bg-color': props.data.color || '#e0f2fe',
        '--node-text-color': props.data.textColor || '#0c4a6e',
        border: props.selected ? '1px solid #787878' : '1px solid var(--node-text-color)',
        padding: 10,
        width: props.data.width || 100,
        height: props.data.height || 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        borderRadius: 4,
      }}
    >
      <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-gray-500" isConnectable={props.isConnectable} />
      <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-gray-500" isConnectable={props.isConnectable} />
      <div className="text-center" style={{ width: '100%', fontSize: props.data.fontSize || 12 }}>
        {props.data.label || 'Task'}
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-gray-500" isConnectable={props.isConnectable} />
      <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-gray-500" isConnectable={props.isConnectable} />
    </div>
  );
};

export default memo(TaskNode);
