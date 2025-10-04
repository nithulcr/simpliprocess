

import { Button, Navbar, Image } from 'react-bootstrap';
import { ArrowCounterclockwise, ArrowClockwise } from 'react-bootstrap-icons';

const Toolbar = ({ onUndo, onRedo, canUndo, canRedo }: { onUndo: () => void; onRedo: () => void; canUndo: boolean; canRedo: boolean }) => {
  return (
    <Navbar bg="light" expand="lg" className="p-2 border-bottom justify-content-between">
      <Navbar.Brand href="#">
        <Image src="/logo.png" height="45" className="d-inline-block align-top" alt="SimpliProcess Logo" />
      </Navbar.Brand>
      <div>
        <Button variant="secondary" onClick={onUndo} disabled={!canUndo} className="me-2">
          <ArrowCounterclockwise />
        </Button>
        <Button variant="secondary" onClick={onRedo} disabled={!canRedo}>
          <ArrowClockwise />
        </Button>
      </div>
    </Navbar>
  );
};

export default Toolbar;


