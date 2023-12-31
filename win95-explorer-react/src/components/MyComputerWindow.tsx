/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Window, WindowHeader } from 'react95';
import styled from 'styled-components';

import barbieWindowsLogo from '../assets/BarbieWindowsLogoTransparent.png';

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


const MyComputerWindow = ({ id, minimized, minimizeWindow, closeWindow }: any) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 700, y: 300 });
    const [dimensions, setDimensions] = useState({ width: 550, height: 450 });
    const initialDimensions = useRef({ width: 400, height: 200 });
    const [isResizing, setIsResizing] = useState(false);

    const resizeRef = useRef<HTMLDivElement | null>(null);

    const initialMousePos = useRef({ x: 0, y: 0 });
    const initialWindowPos = useRef({ x: 0, y: 0 });

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
        }

        return () => {
            if (currentResizeRef) {
                currentResizeRef?.removeEventListener('mousedown', handleResizeMouseDown);
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


    if (minimized) {
        return null;
    }
    return (
        <WindowWrapper>
            <Window title="My Computer" style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px`, left: `${position.x}px`, top: `${position.y}px`, zIndex: 5 }}
            // resizable={true}
            // resizeRef={resizeRef} 
            >
                <WindowHeader className='window-title'
                    onMouseDown={handleMouseDown}>
                    <span style={{ userSelect: "none" }}>My Computer</span>
                    <div>
                        <Button onClick={() => minimizeWindow(id)}>
                            <span className='minimize-icon'><p style={{ fontSize: 30, position: "absolute", marginTop: -15 }}>_</p></span>
                        </Button>
                        <Button onClick={() => closeWindow(id)}>
                            <span className='close-icon' />
                        </Button>
                    </div>
                </WindowHeader>
                <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100% - 36px)', userSelect: "none" }}>
                    {/* <p style={{ userSelect: "none" }}>
                        Hardware Specs Here as Dummy Data
                    </p> */}
                    <div style={{ width: "50%", display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        <img src={barbieWindowsLogo} alt={"WinLogo"} style={{ width: 220, aspectRatio: 1 }} />
                    </div>
                    <div style={{ width: "50%", padding: '20px' }}>
                        {/* borderBottom: '1px solid black', marginTop: 10 */}
                        <h2>System:</h2>
                        <ul style={{ paddingLeft: 20 }}>
                            <li>Microsoft Windows 95</li>
                            <li>Edition: Barbie</li>
                            <li>Version: 4.00.950</li>
                            <li>Registered to: DeNyx</li>
                        </ul>

                        <h2 style={{ marginTop: 15 }}>Computer:</h2>
                        <ul style={{ paddingLeft: 20 }}>
                            <li>Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz</li>
                            <li>32.0 GB (RAM)</li>
                            <li>64-bit Operating System</li>
                        </ul>

                        <h2 style={{ marginTop: 15 }}>Computer Name</h2>
                        <ul style={{ paddingLeft: 20 }}>
                            <li>DESKTOP-123XYZ</li>
                            <li>WORKGROUP</li>
                        </ul>
                    </div>
                </div>
            </Window>
        </WindowWrapper>
    );
};

export default MyComputerWindow;
