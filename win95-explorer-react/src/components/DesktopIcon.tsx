/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';

const DesktopIcon = ({ imgSrc, label, onClick, onDoubleClick, selected }: any) => {
    const backgroundColor = selected ? 'blue' : 'transparent';
    const [clickCount, setClickCount] = useState(0);
    const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        if (clickCount === 0) {
            // First click, execute single-click action immediately
            onClick();
        }

        setClickCount(prevCount => prevCount + 1);

        // Clear existing timer if any
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }

        const newTimeout = setTimeout(() => {
            // Reset click count
            setClickCount(0);
        }, 250); // 250ms to wait for double click

        setClickTimeout(newTimeout);
    };

    if (clickCount >= 2) {
        // Double click detected, execute double-click action
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }
        setClickCount(0); // Reset click count
        onDoubleClick();
    }

    return (
        <div
            className="desktop-icon"
            onClick={handleClick}
            style={{
                userSelect: 'none',
                width: 74,
                height: 74,
                textAlign: 'center',
                marginTop: 6,
                marginBottom: 10,
                backgroundColor: backgroundColor,
                paddingTop: 10
            }}
        >
            <img src={imgSrc} alt={label} style={{ width: 48, height: 48 }} />
            <p style={{ marginTop: -4, fontSize: 12 }}>{label}</p>
        </div>
    );
};

export default DesktopIcon;