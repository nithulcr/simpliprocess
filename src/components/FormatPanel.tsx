import { useState, useEffect } from 'react';
import type { Node, Edge } from 'reactflow';
import { Card, Form, Accordion } from 'react-bootstrap';

const defaultColors = ['#ffffff', '#f3f4f6', '#fee2e2', '#dcfce7', '#e0f2fe'];

const FormatPanel = ({ node, edge, onNodeDataChange, onEdgeDataChange }: { node: Node | null; edge: Edge | null; onNodeDataChange: (id: string, data: any) => void; onEdgeDataChange: (id: string, data: any) => void }) => {
    const [label, setLabel] = useState(node?.data?.label || edge?.label || '');
    const [fontSize, setFontSize] = useState(node?.data?.fontSize || edge?.style?.fontSize || 12);
    const [colorTarget, setColorTarget] = useState('background');
    const [animated, setAnimated] = useState(edge?.animated || false);

    useEffect(() => {
        setLabel(node?.data?.label || edge?.label || '');
        setFontSize(node?.data?.fontSize || edge?.style?.fontSize || 12);
        setAnimated(edge?.animated || false);
    }, [node, edge]);

    const onLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newLabel = event.target.value;
        setLabel(newLabel);
        if (node) {
            onNodeDataChange(node.id, { label: newLabel });
        } else if (edge) {
            onEdgeDataChange(edge.id, { label: newLabel });
        }
    }

    const onFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFontSize = parseInt(event.target.value, 10);
        setFontSize(newFontSize);
        if (node) {
            onNodeDataChange(node.id, { fontSize: newFontSize });
        } else if (edge) {
            onEdgeDataChange(edge.id, { style: { fontSize: newFontSize } });
        }
    }

    const onColorChange = (color: string) => {
        if (node) {
            if (colorTarget === 'background') {
                onNodeDataChange(node.id, { color });
            } else {
                onNodeDataChange(node.id, { textColor: color });
            }
        }
    }

    const onAnimatedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnimated = event.target.checked;
        setAnimated(newAnimated);
        if (edge) {
            onEdgeDataChange(edge.id, { animated: newAnimated });
        }
    }

    if (!node && !edge) {
        return (
            <aside className="bg-light p-3 border-start" style={{width: '300px'}}>
                <h2 className="h5">Format</h2>
                <p className="small text-muted mt-4">Select a step to see its properties.</p>
            </aside>
        );
    }

    return (
        <aside className="bg-light p-3 border-start" style={{width: '300px'}}>
            <h2 className="h5">Format</h2>
            <Accordion defaultActiveKey="0" alwaysOpen className="mt-4">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Text</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group>
                            <Form.Label>Label</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={label}
                                onChange={onLabelChange}
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Label>Font Size</Form.Label>
                            <Form.Control 
                                type="number"
                                value={fontSize}
                                onChange={onFontSizeChange}
                            />
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>
                {node && (
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Style</Accordion.Header>
                        <Accordion.Body>
                            <Form.Group>
                                <Form.Check 
                                    type="radio" 
                                    name="colorTarget"
                                    value="background"
                                    label="Background"
                                    checked={colorTarget === 'background'}
                                    onChange={() => setColorTarget('background')}
                                />
                                <Form.Check 
                                    type="radio" 
                                    name="colorTarget"
                                    value="text"
                                    label="Text"
                                    checked={colorTarget === 'text'}
                                    onChange={() => setColorTarget('text')}
                                />
                            </Form.Group>
                            <div className="d-flex align-items-center mt-2">
                                <Form.Control 
                                    type="color"
                                    value={colorTarget === 'background' ? node?.data?.color || '#ffffff' : node?.data?.textColor || '#000000'}
                                    onChange={(e) => onColorChange(e.target.value)}
                                    style={{width: '50px', height: '50px'}}
                                />
                                <div className="d-flex ms-2">
                                    {defaultColors.map((color) => (
                                        <div 
                                            key={color}
                                            onClick={() => onColorChange(color)}
                                            className="rounded-circle cursor-pointer border me-1"
                                            style={{ backgroundColor: color, width: '30px', height: '30px' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
                {edge && (
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Style</Accordion.Header>
                        <Accordion.Body>
                            <Form.Group>
                                <Form.Check 
                                    type="switch"
                                    label="Animated"
                                    checked={animated}
                                    onChange={onAnimatedChange}
                                />
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
        </aside>
    );
};

export default FormatPanel;
