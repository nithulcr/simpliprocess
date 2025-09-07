
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DatabaseNode = ({ data }: { data: { label: string; color?: string } }) => {
  const style = {
    borderColor: data.color || '#8b5cf6', // default violet-500
    backgroundColor: 'white',
  };

  return (
    <div style={style} className="border-2 rounded-md w-36 bg-white relative pb-2">
        <div style={{ borderBottom: `2px solid ${data.color || '#8b5cf6'}`}} className="w-full h-4 rounded-t-md"></div>
        <div className="p-4 text-center">
            {data.label || 'Database'}
        </div>
        <div style={{ top: '0.75rem' }} className="absolute w-full h-4 rounded-t-md bg-white"></div>
        <div style={{ borderTop: `2px solid ${data.color || '#8b5cf6'}`}} className="absolute top-0 left-0 right-0 w-full h-4 rounded-t-md"></div>

      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-500" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-500" />
    </div>
  );
};

export default memo(DatabaseNode);
