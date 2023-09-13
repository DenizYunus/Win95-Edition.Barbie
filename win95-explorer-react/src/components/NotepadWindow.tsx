/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Window, WindowHeader } from 'react95';
import styled from 'styled-components';
import { useGlobalIcons } from '../utils/GlobalIconContext';

const WindowWrapper = styled.div`
  .window-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .minimize-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .save-icon {
    display: inline-block;
    width: 100%;
    height: 16px;
    position: relative;
    align-items: center;
    &:before,
    &:after {
      content: '';
      position: absolute;
    }
    &:before {
      height: 100%;
      width: 3px;
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
    }
  }
  .window {
    width: 400px;
    min-height: 200px;
    position: absolute;
  }
  .window:nth-child(2) {
    margin: 2rem;
  }
  .footer {
    display: block;
    margin: 0.25rem;
    height: 31px;
    line-height: 31px;
    padding-left: 0.25rem;
  }
`;


const NotepadWindow = ({ id, desktopIconId, minimized, minimizeWindow, closeWindow, initialText }: any) => {
    const { updateIcon } = useGlobalIcons();

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 200, y: 200 });
    const [dimensions, setDimensions] = useState({ width: 400, height: 200 });
    const initialDimensions = useRef({ width: 400, height: 200 });
    const [isResizing, setIsResizing] = useState(false);

    const resizeRef = useRef<HTMLDivElement | null>(null);

    const initialMousePos = useRef({ x: 0, y: 0 });
    const initialWindowPos = useRef({ x: 0, y: 0 });

    const [textAreaContent, setTextAreaContent] = useState('');

    const handleResizeMouseDown = useCallback((e: any) => {
        if (!minimized) {
            setIsResizing(true);
            initialMousePos.current = { x: e.clientX, y: e.clientY };
            initialDimensions.current = { ...dimensions };
        }
    }, [dimensions, minimized]);

    const handleResizeMouseMove = (e: any) => {
        if (isResizing) {
            const dx = e.clientX - initialMousePos.current.x;
            const dy = e.clientY - initialMousePos.current.y;

            const newWidth = initialDimensions.current.width + dx;
            const newHeight = initialDimensions.current.height + dy;

            setDimensions({ width: newWidth, height: newHeight });
        }
    };

    const handleResizeMouseUp = () => {
        if (!minimized) {
            setIsResizing(false);
        }
    };

    useEffect(() => {
        const currentResizeRef = resizeRef.current;
        if (currentResizeRef) {
            currentResizeRef?.addEventListener('mousedown', handleResizeMouseDown);
            // currentResizeRef.addEventListener('mouseleave', handleResizeMouseUp);
        }

        return () => {
            if (currentResizeRef) {
                currentResizeRef?.removeEventListener('mousedown', handleResizeMouseDown);
                // currentResizeRef.removeEventListener('mouseleave', handleResizeMouseUp);
            }
        };
    }, [handleResizeMouseDown]);

    useEffect(() => {
        if (!minimized && isResizing) {
            window.addEventListener('mousemove', handleResizeMouseMove);
            window.addEventListener('mouseup', handleResizeMouseUp);
        } else {
            window.removeEventListener('mousemove', handleResizeMouseMove);
            window.removeEventListener('mouseup', handleResizeMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleResizeMouseMove);
            window.removeEventListener('mouseup', handleResizeMouseUp);
        };
    }, [handleResizeMouseMove, isResizing, minimized]);

    const handleMouseDown = useCallback((e: any) => {
        if (!minimized) {
            setIsDragging(true);
            initialMousePos.current = { x: e.clientX, y: e.clientY };
            initialWindowPos.current = { ...position };
        }
    }, [position, minimized]);

    const handleMouseUp = () => {
        if (!minimized) {
            setIsDragging(false);
        }
    };

    const handleMouseMove = (e: any) => {
        if (isDragging) {
            const dx = e.clientX - initialMousePos.current.x;
            const dy = e.clientY - initialMousePos.current.y;

            const newX = initialWindowPos.current.x + dx;
            const newY = initialWindowPos.current.y + dy;

            setPosition({ x: newX, y: newY });
        }
    };

    useEffect(() => {
        if (!minimized && isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, isDragging, minimized]);

    useEffect(() => {
        setTextAreaContent(initialText);
    }, [initialText]);

    if (minimized) {
        return null;
    }

    return (
        <WindowWrapper>
            <Window title="Notepad" style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px`, left: `${position.x}px`, top: `${position.y}px`, zIndex: 5 }}
                resizable={true}
                // onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
                resizeRef={resizeRef} >
                <WindowHeader className='window-title'
                    onMouseDown={handleMouseDown}>
                    <span style={{ userSelect: "none" }}>Notepad</span>
                    <div>
                        <Button style={{width: 60}} onClick={() => updateIcon(desktopIconId, { value: textAreaContent })}>
                            <span className='save-icon' style={{alignItems: "center", justifyContent: "center" }}><p style={{ fontSize: 16, fontWeight: "bold", position: "absolute", textAlign: "center", width: "100%" }}>Save</p></span>
                        </Button>
                        <Button onClick={() => minimizeWindow(id)}>
                            <span className='minimize-icon'><p style={{ fontSize: 30, position: "absolute", marginTop: -15 }}>_</p></span>
                        </Button>
                        <Button onClick={() => closeWindow(id, desktopIconId, textAreaContent)}>
                            <span className='close-icon' />
                        </Button>
                    </div>
                </WindowHeader>
                <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 36px)' }}>
                    <textarea
                        value={textAreaContent}
                        onChange={(e) => setTextAreaContent(e.target.value)}
                        style={{
                            flex: 1,
                            resize: 'none',
                            border: 'none',
                            padding: '0.5rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }} />
                </div>

            </Window>
        </WindowWrapper>
    );
};

export default NotepadWindow;
