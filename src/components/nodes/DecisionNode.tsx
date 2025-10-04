import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface DecisionNodeData {
  label: string;
  color?: string;
  width?: number;
  height?: number;
  textColor?: string;
  fontSize?: number;
}

const DecisionNode = (props: NodeProps<DecisionNodeData>) => {
  return (
    <div className="react-flow__node-custom text-center" style={{ '--node-bg-color': props.data.color || '#fffbe0', '--node-text-color': props.data.textColor || '#854d0e', borderRadius: 4, border: props.selected ? '1px solid #787878' : '1px solid var(--node-text-color)', padding: '10px', transform: 'rotate(45deg)', width: props.data.width || 80, height: props.data.height || 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Handle type="target" position={Position.Top} id="top" isConnectable={props.isConnectable} />
      <Handle type="target" position={Position.Right} id="right" isConnectable={props.isConnectable} />
      <div className='text-center' style={{   transform: 'rotate(-45deg)', fontSize: props.data.fontSize || 12  }}>{props.data.label}</div>
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={props.isConnectable} />
      <Handle type="source" position={Position.Left} id="left" isConnectable={props.isConnectable} />
    </div>
  );
};

export default memo(DecisionNode);
