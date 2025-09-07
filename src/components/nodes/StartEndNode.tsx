
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const StartEndNode = ({ data }: { data: { label: string; color?: string } }) => {
  const style = {
    borderColor: data.color || '#ef4444', // default red-500
    backgroundColor: 'white',
  };

  return (
    <div style={style} className="border-2 rounded-full p-4 w-32 text-center">
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-500" />
      <div>{data.label || 'Start/End'}</div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-500" />
    </div>
  );
};

export default memo(StartEndNode);
