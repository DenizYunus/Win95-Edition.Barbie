/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Window, WindowHeader } from 'react95';
import styled from 'styled-components';

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

const NotepadWindow = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dimensions, setDimensions] = useState({ width: 400, height: 200 });
    const [isResizing, setIsResizing] = useState(false);

    const resizeRef = useRef(null);

    const handleResizeMouseDown = useCallback((e) => {
        setIsResizing(true);
    }, []);

    const handleResizeMouseMove = (e) => {
        if (isResizing) {
            const newWidth = dimensions.width + e.movementX;
            const newHeight = dimensions.height + e.movementY;
            setDimensions({ width: newWidth, height: newHeight });
            // console.log(newWidth, newHeight);
        }
    };

    const handleResizeMouseUp = () => {
        setIsResizing(false);
        console.log("Mouse up");
    };

    useEffect(() => {
        const currentResizeRef = resizeRef.current;
        if (currentResizeRef) {
            currentResizeRef.addEventListener('mousedown', handleResizeMouseDown);
            currentResizeRef.addEventListener('mouseleave', handleResizeMouseUp);
        }

        return () => {
            if (currentResizeRef) {
                currentResizeRef.removeEventListener('mousedown', handleResizeMouseDown);
                currentResizeRef.removeEventListener('mouseleave', handleResizeMouseUp);
            }
        };
    }, [handleResizeMouseDown]);

    useEffect(() => {
        if (isResizing) {
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
    }, [handleResizeMouseMove, isResizing]);

    const handleMouseDown = (_e: any) => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: any) => {
        if (isDragging) {
            setPosition({
                x: position.x + e.movementX,
                y: position.y + e.movementY,
            });
        }
    };

    return (
        <WindowWrapper>
            <Window title="Notepad" style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px`, left: `${position.x}px`, top: `${position.y}px`, zIndex: 5 }}
                resizable={true}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                resizeRef={resizeRef} >
                <WindowHeader className='window-title'
                    onMouseDown={handleMouseDown}>
                    <span>Notepad</span>
                    <Button>
                        <span className='close-icon' />
                    </Button>
                </WindowHeader>
                <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 36px)' }}>
                    <textarea style={{
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
