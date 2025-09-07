
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DocumentNode = ({ data }: { data: { label: string; color?: string } }) => {
  const style = {
    borderColor: data.color || '#f59e0b', // default amber-500
    backgroundColor: 'white',
  };

  return (
    <div style={style} className="border-2 rounded-md w-40 bg-white">
        <div className="p-4">
            {data.label || 'Document'}
        </div>
        <svg width="100%" height="10" viewBox="0 0 160 10" preserveAspectRatio="none">
            <path d="M 0 5 C 40 15, 120 -5, 160 5" stroke={data.color || '#f59e0b'} strokeWidth="2" fill="none" />
        </svg>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-500" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-500" />
    </div>
  );
};

export default memo(DocumentNode);
