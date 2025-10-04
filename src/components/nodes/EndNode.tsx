import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface EndNodeData {
  label: string;
  color?: string;
  width?: number;
  height?: number;
  textColor?: string;
  fontSize?: number;
}

const EndNode = (props: NodeProps<EndNodeData>) => {
  return (
        <div className="react-flow__node-custom text-center" style={{ '--node-bg-color': props.data.color || '#fee2e2', '--node-text-color': props.data.textColor || '#991b1b', border: props.selected ? '1px solid #787878' : '1px solid var(--node-text-color)', padding: '10px', borderRadius: '50%', width: props.data.width || 100, height: props.data.height || 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Handle type="target" position={Position.Top} id="top" isConnectable={props.isConnectable} />
      <Handle type="target" position={Position.Right} id="right" isConnectable={props.isConnectable} />
      <div style={{ fontSize: props.data.fontSize || 12 }}>{props.data.label}</div>
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={props.isConnectable} />
      <Handle type="source" position={Position.Left} id="left" isConnectable={props.isConnectable} />
    </div>
  );
};

export default memo(EndNode);
