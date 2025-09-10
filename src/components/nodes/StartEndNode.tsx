
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const StartEndNode = ({ data, selected }: { data: { label: string; color?: string; width?: number; height?: number }; selected: boolean; }) => {
  return (
    <div className="react-flow__node-custom" style={{ background: data.color || '#ffffff', border: selected ? '2px solid #787878' : '1px solid #333', padding: '10px', borderRadius: '50%', width: data.width || 100, height: data.height || 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* <NodeResizer isVisible={selected} onResize={(_event, params) => onNodeDataChange(id, { width: params.width, height: params.height })} /> */}
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(StartEndNode);
