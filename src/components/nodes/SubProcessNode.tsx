import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface SubProcessNodeData {
  label: string;
  color?: string;
  textColor?: string;
  fontSize?: number;
}

const SubProcessNode = (props: NodeProps<SubProcessNodeData>) => {
  const style = {
    borderColor: 'var(--node-text-color)',
    '--node-bg-color': props.data.color || '#f3e8ff',
    '--node-text-color': props.data.textColor || '#581c87',
    border: props.selected ? '1px solid #787878' : '1px solid var(--node-text-color)',
  };

  return (
    <div style={style} className="react-flow__node-custom rounded-md p-4 w-48 relative">
      <div style={{ borderColor: 'var(--node-text-color)' }} className="absolute top-0 left-1 bottom-0 w-full h-full border-l-2"></div>
      <div style={{ borderColor: 'var(--node-text-color)' }} className="absolute top-0 right-1 bottom-0 w-full h-full border-r-2"></div>
      <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-gray-500" isConnectable={props.isConnectable} />
      <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-gray-500" isConnectable={props.isConnectable} />
      <div style={{ position: 'relative', zIndex: 1, fontSize: props.data.fontSize || 12 }}>{props.data.label || 'Sub-process'}</div>
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-gray-500" isConnectable={props.isConnectable} />
      <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-gray-500" isConnectable={props.isConnectable} />
    </div>
  );
};

export default memo(SubProcessNode);