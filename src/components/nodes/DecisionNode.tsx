import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface DecisionNodeData {
  label: string;
  color?: string;
  width?: number;
  height?: number;
  textColor?: string;
}

const DecisionNode = ({ id, data, selected, isConnectable }: NodeProps<DecisionNodeData>) => {
  return (
    <div className="react-flow__node-custom text-center" style={{ '--node-bg-color': data.color || '#fffbe0', '--node-text-color': data.textColor || '#854d0e', borderRadius: 4, border: selected ? '2px solid #787878' : '1px solid #333', padding: '10px', transform: 'rotate(45deg)', width: data.width || 80, height: data.height || 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className='text-center' style={{   transform: 'rotate(-45deg)', fontSize: data.fontSize || 12  }}>{data.label}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
};

export default memo(DecisionNode);