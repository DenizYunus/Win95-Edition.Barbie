/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import notepadIcon from "../assets/notepadicon.png";
import mycomputerIcon from "../assets/mycomputericon.png";
import programmerIcon from "../assets/programmericon.png";

interface IIcon {
    imgSrc: string;
    label: string;
    type: string;
    value?: string;
    id: number;
}

const GlobalIconContext = createContext<{
    icons: IIcon[];
    addIcon: (newIcon: IIcon) => void;
    removeIcon: (id: number) => void;
    updateIcon: (id: number, changedFields: Partial<IIcon>) => void;
}>({
    icons: [],
    addIcon: () => { },
    removeIcon: () => { },
    updateIcon: () => { }
});

export const useGlobalIcons = () => {
    return useContext(GlobalIconContext);
};

export const GlobalIconProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [icons, setIcons] = useState<IIcon[]>([
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

    const addIcon = (newIcon: IIcon) => {
        setIcons([...icons, newIcon]);
    };

    const removeIcon = (id: number) => {
        setIcons(icons.filter((icon) => icon.id !== id));
    };

    const updateIcon = (id: number, changedFields: Partial<IIcon>) => {
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
