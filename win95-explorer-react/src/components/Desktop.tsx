/* eslint-disable @typescript-eslint/no-explicit-any */

import DesktopIcon from "./DesktopIcon";
import notepadIcon from "../assets/notepadicon.png";
import mycomputerIcon from "../assets/mycomputericon.png";
import programmerIcon from "../assets/programmericon.png";
import { useState } from "react";

const desktopIcons = [
    {
        imgSrc: notepadIcon,
        label: "Notepad",
        type: "Notepad",
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
];

const Desktop = ({ createNewWindow }: any) => {
    const [selectedIconId, setSelectedIconId] = useState<number | null>(null);

    return (
        <div className="desktop" style={{ width: "100%", height: "100%" }}>
            {desktopIcons.map((icon) => (
                <DesktopIcon
                    key={icon.id}
                    imgSrc={icon.imgSrc}
                    label={icon.label}
                    onClick={() => setSelectedIconId(icon.id)}
                    onDoubleClick={() => createNewWindow(icon.type)}
                    selected={icon.id === selectedIconId ? true : false}
                />
            ))}
        </div>
    );
};

export default Desktop