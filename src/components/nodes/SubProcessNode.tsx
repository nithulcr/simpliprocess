import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface SubProcessNodeData {
  label: string;
  color?: string;
  textColor?: string;
}

const SubProcessNode = ({ id, data, selected, isConnectable }: NodeProps<SubProcessNodeData>) => { // @ts-ignore
  const style = {
    borderColor: data.color || '#64748b', // default slate-500
    '--node-bg-color': data.color || '#f3e8ff',
    '--node-text-color': data.textColor || '#581c87',
  };

  return (
    <div style={style} className="react-flow__node-custom border-2 rounded-md p-4 w-48 relative">
      <div style={{ borderColor: data.color || '#64748b' }} className="absolute top-0 left-1 bottom-0 w-full h-full border-l-2"></div>
      <div style={{ borderColor: data.color || '#64748b' }} className="absolute top-0 right-1 bottom-0 w-full h-full border-r-2"></div>
      <div>{data.label || 'Sub-process'}</div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-500" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-500" isConnectable={isConnectable} />
    </div>
  );
};

export default memo(SubProcessNode);