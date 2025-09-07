
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const SubProcessNode = ({ data }: { data: { label: string; color?: string } }) => {
  const style = {
    borderColor: data.color || '#64748b', // default slate-500
    backgroundColor: 'white',
  };

  return (
    <div style={style} className="border-2 rounded-md p-4 w-48 bg-white relative">
      <div style={{ borderColor: data.color || '#64748b' }} className="absolute top-0 left-1 bottom-0 w-full h-full border-l-2"></div>
      <div style={{ borderColor: data.color || '#64748b' }} className="absolute top-0 right-1 bottom-0 w-full h-full border-r-2"></div>
      <div>{data.label || 'Sub-process'}</div>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-500" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-500" />
    </div>
  );
};

export default memo(SubProcessNode);
