
import { memo } from 'react';
import { Handle, Position } from 'reactflow';

const TaskNode = ({ data }: { data: { label: string; color?: string } }) => {
  const style = {
    borderColor: data.color || '#3b82f6', // default blue-500
    backgroundColor: 'white',
  };

  return (
    <div style={style} className="border-2 rounded-md p-4 w-48">
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-gray-500" />
      <div>{data.label || 'Task'}</div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-gray-500" />
    </div>
  );
};

export default memo(TaskNode);
