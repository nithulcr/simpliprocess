

const Toolbar = ({ onUndo, onRedo, canUndo, canRedo }: { onUndo: () => void; onRedo: () => void; canUndo: boolean; canRedo: boolean }) => {
  return (
    <div className="w-full bg-gray-100 border-b border-gray-200 p-2 flex items-center space-x-2">
        <button onClick={onUndo} disabled={!canUndo} className="px-3 py-1 bg-gray-200 rounded-md font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Undo
        </button>
        <button onClick={onRedo} disabled={!canRedo} className="px-3 py-1 bg-gray-200 rounded-md font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Redo
        </button>
    </div>
  );
};

export default Toolbar;
