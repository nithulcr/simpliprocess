import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import type {
  NodeChange,
  EdgeChange,
  Connection,
  Node,
  Edge,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useHistory } from './hooks/useHistory';
import TaskNode from './components/nodes/TaskNode';
import DecisionNode from './components/nodes/DecisionNode';
import SubProcessNode from './components/nodes/SubProcessNode';
import StartNode from './components/nodes/StartNode';
import EndNode from './components/nodes/EndNode';
import Toolbar from './components/Toolbar';
import ShapesPanel from './components/ShapesPanel';
import FormatPanel from './components/FormatPanel';

const initialNodes = [
  {
    id: '1',
    type: 'start',
    data: { label: 'Start' },
    position: { x: 450, y: 50 },
  },
];

const initialEdges: Edge[] = [];

let id = 2;
const getId = () => `${id++}`;

const App = () => {
  const flowWrapper = useRef(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const { state, setState, undo, redo, canUndo, canRedo } = useHistory({ nodes: initialNodes, edges: initialEdges });
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const [edgeType, setEdgeType] = useState('default');

  const setReactFlowInstance = useCallback((instance: ReactFlowInstance) => {
    reactFlowInstance.current = instance;
  }, []);

  const nodeTypes = useMemo(() => ({ 
      task: TaskNode, 
      decision: DecisionNode, 
      start: StartNode, // Changed from startEnd
      end: EndNode,     // Added new EndNode
      subProcess: SubProcessNode,
  }), []); // Removed document and database

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setState((current: { nodes: Node[]; edges: Edge[] }) => ({ ...current, nodes: applyNodeChanges(changes, current.nodes) }));
  }, [setState]);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setState((current: { nodes: Node[]; edges: Edge[] }) => ({ ...current, edges: applyEdgeChanges(changes, current.edges) }));
  }, [setState]);

  const onConnect = useCallback((connection: Connection) => {
    const newEdge = { ...connection, type: edgeType, id: getId() };
    setState((current: { nodes: Node[]; edges: Edge[] }) => ({ ...current, edges: addEdge(newEdge, current.edges) }));
  }, [setState, edgeType]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      let position = { x: 0, y: 0 };
      if (reactFlowInstance.current) {
        position = reactFlowInstance.current.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      }
      
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)}` },
      };

      setState((current: { nodes: Node[]; edges: Edge[] }) => ({ ...current, nodes: current.nodes.concat(newNode) }));
    },
    [reactFlowInstance, setState],
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((_event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const onPaneClick = useCallback(() => {
      setSelectedNode(null);
      setSelectedEdge(null);
  }, []);

  const onNodeDataChange = (id: string, data: any) => {
    setState((current: { nodes: Node[]; edges: Edge[] }) => ({
        ...current,
        nodes: current.nodes.map(node => node.id === id ? { ...node, data: { ...node.data, ...data } } : node)
    }));
  }

  const onEdgeDataChange = (id: string, data: any) => {
    setState((current: { nodes: Node[]; edges: Edge[] }) => ({
        ...current,
        edges: current.edges.map(edge => edge.id === id ? { ...edge, ...data } : edge)
    }));
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey) {
            if (event.key === 'z') {
                event.preventDefault();
                undo();
            }
            if (event.key === 'y') {
                event.preventDefault();
                redo();
            }
        }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="d-flex flex-column vh-100 vw-100 text-dark">
        <Toolbar onUndo={undo} onRedo={redo} canUndo={canUndo} canRedo={canRedo} />
        <div className="d-flex flex-grow-1 overflow-hidden">
            <ShapesPanel edgeType={edgeType} setEdgeType={setEdgeType} />
            <main className="flex-grow-1 h-100" ref={flowWrapper} style={{ pointerEvents: 'all' }}>
                <ReactFlow
                    nodes={state.nodes}
                    edges={state.edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeClick={onNodeClick}
                    onEdgeClick={onEdgeClick}
                    onPaneClick={onPaneClick}
                    nodeTypes={nodeTypes}
                    fitView
                    deleteKeyCode={['Backspace', 'Delete']}
                >
                    <Controls showInteractive={false} />
                    <Background />
                </ReactFlow>
            </main>
            <FormatPanel node={selectedNode} edge={selectedEdge} onNodeDataChange={onNodeDataChange} onEdgeDataChange={onEdgeDataChange} />
        </div>
    </div>
  );
};

export default App;
