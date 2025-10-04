import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

interface ImageNodeData {
  src?: string;
  width?: number;
  height?: number;
  label?: string;
  fontSize?: number;
  textColor?: string;
}

const ImageNode = (props: NodeProps<ImageNodeData>) => {
  const { data, selected, isConnectable } = props;

  return (
    <div
      className="react-flow__node-custom"
      style={{
        border: selected ? '1px solid #787878' : '1px solid #2d3edaff',
        padding: 0,
        width: data.width || 100,
        height: data.height || 100,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Handle type="target" position={Position.Top} id="top" className="w-2 h-2 !bg-gray-500" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Right} id="right" className="w-2 h-2 !bg-gray-500" isConnectable={isConnectable} />
      <img src={data.src || 'dummy_image.jpg'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Node" />
      {data.label && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: data.textColor || 'black',
            padding: '2px 4px',
            fontSize: data.fontSize || 12,
            textAlign: 'center',
          }}
        >
          {data.label}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-2 h-2 !bg-gray-500" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Left} id="left" className="w-2 h-2 !bg-gray-500" isConnectable={isConnectable} />
    </div>
  );
};

export default memo(ImageNode);
