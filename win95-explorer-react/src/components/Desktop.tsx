/* eslint-disable @typescript-eslint/no-explicit-any */
import DesktopIcon from "./DesktopIcon";
import notepadIcon from "../assets/notepadicon.png";

const desktopIcons = [
    {
        imgSrc: notepadIcon,
        label: "Notepad",
        id: 1
    },
    {
        imgSrc: notepadIcon,
        label: "Notepad",
        id: 2
    },
];


const Desktop = ({ createNewWindow }: any) => {
    return (
        <div className="desktop" style={{ width: "100%", height: "100%" }}>
            {desktopIcons.map((icon) => (
                <DesktopIcon
                    key={icon.id}
                    imgSrc={icon.imgSrc}
                    label={icon.label}
                    onClick={() => createNewWindow('Notepad')}
                />
            ))}
        </div>
    );
};

export default Desktop