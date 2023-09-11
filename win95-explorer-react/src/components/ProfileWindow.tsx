/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect, useCallback } from 'react';
import { Avatar, Button, GroupBox, Select, Window, WindowHeader } from 'react95';
import styled from 'styled-components';

import profilePicture from '../assets/profilePicture.jpeg';

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


const ProfileWindow = ({ id, minimized, minimizeWindow, closeWindow }: any) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 700, y: 300 });
    const [dimensions, setDimensions] = useState({ width: 400, height: 650 });
    const initialDimensions = useRef({ width: 400, height: 200 });
    const [isResizing, setIsResizing] = useState(false);

    const resizeRef = useRef<HTMLDivElement | null>(null);

    const initialMousePos = useRef({ x: 0, y: 0 });
    const initialWindowPos = useRef({ x: 0, y: 0 });

    const [phoneTextOpen, setPhoneTextOpen] = useState(false);

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
            <Window title="Profile" style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px`, left: `${position.x}px`, top: `${position.y}px`, zIndex: 5 }}
            >
                <WindowHeader className='window-title'
                    onMouseDown={handleMouseDown}>
                    <span style={{ userSelect: "none" }}>Profile</span>
                    <div>
                        <Button onClick={() => minimizeWindow(id)}>
                            <span className='minimize-icon'><p style={{ fontSize: 30, position: "absolute", marginTop: -15 }}>_</p></span>
                        </Button>
                        <Button onClick={() => closeWindow(id)}>
                            <span className='close-icon' />
                        </Button>
                    </div>
                </WindowHeader>
                <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 36px)', userSelect: "none" }}>
                    <div style={{ width: "100%", display: "flex", marginTop: 20, alignItems: "center", justifyContent: "center" }}>
                        <Avatar size={200} src={profilePicture} />
                    </div>
                    <div style={{ padding: '20px', justifyContent: "center" }}>
                        <GroupBox label='Name' style={{ width: "calc(100% - 40px)" }}>
                            Deniz Yunus Göğüş
                        </GroupBox>
                    </div>
                    <div style={{ padding: '20px', justifyContent: "center" }}>
                        <GroupBox label='Residence' style={{ width: "calc(100% - 40px)" }}>
                            Turkey (Prefer remote freelance jobs)
                            <span style={{ marginLeft: 6 }} role='img' aria-label='😍'>
                                😍
                            </span>
                        </GroupBox>
                    </div>
                    <div style={{ padding: '20px', justifyContent: "center" }}>
                        <GroupBox label='Contact?' style={{ width: "calc(100% - 40px)" }}>
                            <Select
                                defaultValue={2}
                                options={[{ "value": 1, "label": "Hit me up!" }, { "value": 2, "label": "GitHub" }, { "value": 3, "label": "LinkedIn" }, { "value": 4, "label": "Instagram" }, { "value": 7, "label": "Email" }, { "value": 8, "label": "Phone" }]}
                                menuMaxHeight={160}
                                width={"100%"}
                                style={{ backgroundColor: "white" }}
                                onChange={e => {
                                    setPhoneTextOpen(false);
                                    switch (e.label) {
                                        case "LinkedIn":
                                            window.open("https://www.linkedin.com/in/deniz-yunus-gogus/");
                                            break;
                                        case "GitHub":
                                            window.open("https://github.com/DenizYunus/");
                                            break;
                                        case "Instagram":
                                            window.open("https://www.instagram.com/deniz_yunus.gogus/");
                                            break;
                                        case "Email":
                                            window.open("mailto:denizyunusgogus@gmail.com");
                                            break;
                                        case "Phone":
                                            setPhoneTextOpen(true);
                                            break;
                                        default: break;
                                    }
                                }}
                                onOpen={e => console.log('open', e)}
                                onClose={e => console.log('close', e)}
                                onBlur={e => console.log('blur', e)}
                                onFocus={e => console.log('focus', e)}
                            />
                            {phoneTextOpen && <p style={{ marginTop: 7, color: "black", fontWeight: "bold" }}>I guess we haven't met yet :(</p>}
                        </GroupBox>
                    </div>

                </div>
            </Window>
        </WindowWrapper>
    );
};

export default ProfileWindow;
