/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';
import notepadIcon from "../assets/notepadicon.png";
import mycomputerIcon from "../assets/mycomputericon.png";
import programmerIcon from "../assets/programmericon.png";

const GlobalIconContext = createContext();

export const useGlobalIcons = () => {
    return useContext(GlobalIconContext);
};

export const GlobalIconProvider = ({ children }) => {
    const [icons, setIcons] = useState([
        {
            imgSrc: notepadIcon,
            label: "Notepad",
            type: "Notepad",
            value: "Hello World!",
            id: 1
        },
        {
            imgSrc: mycomputerIcon,
            label: "My Computer",
            type: "MyComputer",
            id: 2
        },
        {
            imgSrc: programmerIcon,
            label: "My Profile",
            type: "Profile",
            id: 3
        },
    ]);

    const addIcon = (newIcon: any) => {
        setIcons([...icons, newIcon]);
    };

    const removeIcon = (id: number) => {
        setIcons(icons.filter((icon) => icon.id !== id));
    };

    const updateIcon = (id: number, changedFields: any) => {
        const newIcons = icons.map(icon => (icon.id === id ? { ...icon, ...changedFields } : icon));
        setIcons(newIcons);
        console.log(icons);
    };

    return (
        <GlobalIconContext.Provider value={{ icons, addIcon, removeIcon, updateIcon }}>
            {children}
        </GlobalIconContext.Provider>
    );
};
