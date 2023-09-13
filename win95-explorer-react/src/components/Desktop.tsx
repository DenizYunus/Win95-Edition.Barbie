/* eslint-disable @typescript-eslint/no-explicit-any */

import DesktopIcon from "./DesktopIcon";
// import notepadIcon from "/icons/notepadicon.png";
// import mycomputerIcon from "/icons/mycomputericon.png";
// import programmerIcon from "/icons/programmericon.png";
import { useState } from "react";
import { useGlobalIcons } from "../utils/GlobalIconContext";

// const desktopIcons = [
//     {
//         imgSrc: notepadIcon,
//         label: "Notepad",
//         type: "Notepad",
//         value: "Hello World!",
//         id: 1
//     },
//     {
//         imgSrc: mycomputerIcon,
//         label: "My Computer",
//         type: "MyComputer",
//         id: 2
//     },
//     {
//         imgSrc: programmerIcon,
//         label: "My Profile",
//         type: "Profile",
//         id: 3
//     },
// ];

const Desktop = ({ createNewWindow }: any) => {
    const [selectedIconId, setSelectedIconId] = useState<number | null>(null);
    const { icons } = useGlobalIcons();

    return (
        <div className="desktop" style={{ width: "100%", height: "100%" }}>
            {icons.map((icon: any) => (
                <DesktopIcon
                    key={icon.id}
                    imgSrc={icon.imgSrc}
                    label={icon.label}
                    onClick={() => setSelectedIconId(icon.id)}
                    onDoubleClick={() => icon.type === "Notepad" ? createNewWindow(icon.type, icon.id, icon.value) : createNewWindow(icon.type)}
                    selected={icon.id === selectedIconId ? true : false}
                />
            ))}
        </div>
    );
};

export default Desktop