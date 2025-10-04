import { useState, useEffect } from 'react';
import type { Node, Edge } from 'reactflow';
import { Card, Form, Accordion, Button } from 'react-bootstrap';

const defaultColors = ['#ffffff', '#f3f4f6', '#fee2e2', '#dcfce7', '#e0f2fe'];

const FormatPanel = ({ node, edge, onNodeDataChange, onEdgeDataChange }: { node: Node | null; edge: Edge | null; onNodeDataChange: (id: string, data: any) => void; onEdgeDataChange: (id: string, data: any) => void }) => {
    const [label, setLabel] = useState(node?.data?.label || edge?.label || '');
    const [fontSize, setFontSize] = useState(node?.data?.fontSize || edge?.style?.fontSize || 12);
    const [imageSrc, setImageSrc] = useState(node?.data?.src || '');
    const [colorTarget, setColorTarget] = useState('background');
    const [animated, setAnimated] = useState(edge?.animated || false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        setLabel(node?.data?.label || edge?.label || '');
        setFontSize(node?.data?.fontSize || edge?.style?.fontSize || 12);
        setImageSrc(node?.data?.src || '');
        setAnimated(edge?.animated || false);
        if (node?.type === 'image') {
            setColorTarget('text');
        }
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

    const onImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newSrc = e.target?.result as string;
                setImageSrc(newSrc);
                if (node) {
                    onNodeDataChange(node.id, { src: newSrc });
                }
            };
            reader.readAsDataURL(file);
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

    if (isCollapsed) {
        return (
            <aside className="bg-light p-3 border-start">
                <Button onClick={() => setIsCollapsed(false)} variant="light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </Button>
            </aside>
        );
    }

    return (
        <aside className="bg-light p-3 border-start" style={{width: '300px'}}>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="h5">Format</h2>
                <Button onClick={() => setIsCollapsed(true)} variant="light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </Button>
            </div>
            
            {(!node && !edge) ? (
                <p className="small text-muted mt-4">Select a step to see its properties.</p>
            ) : (
                <Accordion defaultActiveKey="0" alwaysOpen className="mt-4">
                    {node && node.type === 'image' && (
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Image</Accordion.Header>
                            <Accordion.Body>
                                <Form.Group>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        accept="image/*"
                                        onChange={onImageFileChange}
                                    />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
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
                                                                    {node.type !== 'image' && (
                                                                        <Form.Check 
                                                                            type="radio" 
                                                                            name="colorTarget"
                                                                            value="background"
                                                                            label="Background"
                                                                            checked={colorTarget === 'background'}
                                                                            onChange={() => setColorTarget('background')}
                                                                        />
                                                                    )}                                    <Form.Check 
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
            )}
        </aside>
    );
};

export default FormatPanel;
