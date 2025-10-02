import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface StartNodeData {
  label: string;
  color?: string;
  width?: number;
  height?: number;
  textColor?: string;
}

const StartNode = ({ id, data, selected, isConnectable }: NodeProps<StartNodeData>) => {
  return (
    <div className="react-flow__node-custom text-center" style={{ '--node-bg-color': data.color || '#dcfce7', '--node-text-color': data.textColor || '#065f46', border: selected ? '2px solid #787878' : '1px solid #333', padding: '10px', borderRadius: '50%', width: data.width || 100, height: data.height || 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div style={{ fontSize: data.fontSize || 12 }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
};

export default memo(StartNode);