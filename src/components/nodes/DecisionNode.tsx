
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const DecisionNode = ({ data }: { data: { label: string; color?: string } }) => {
  const style = {
    borderColor: data.color || '#22c55e', // default green-500
    backgroundColor: 'white',
  };

  return (
    <div style={style} className="border-2 w-36 h-36 flex items-center justify-center transform rotate-45">
        <div className="transform -rotate-45 text-center">
            {data.label || 'Decision'}
        </div>
      <Handle type="target" position={Position.Top} id="a" className="!top-[-5px] w-2 h-2 !bg-gray-500" />
      <Handle type="source" position={Position.Right} id="b" className="!right-[-5px] w-2 h-2 !bg-gray-500" />
      <Handle type="source" position={Position.Bottom} id="c" className="!bottom-[-5px] w-2 h-2 !bg-gray-500" />
      <Handle type="target" position={Position.Left} id="d" className="!left-[-5px] w-2 h-2 !bg-gray-500" />
    </div>
  );
};

export default memo(DecisionNode);
