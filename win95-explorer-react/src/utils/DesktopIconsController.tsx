// /* eslint-disable @typescript-eslint/no-explicit-any */
// // IconStore.tsx

// import notepadIcon from "../assets/notepadicon.png";
// import mycomputerIcon from "../assets/mycomputericon.png";
// import programmerIcon from "../assets/programmericon.png";
// import { useState } from "react";

// let desktopIcons = [
//   {
//     imgSrc: notepadIcon,
//     label: "Notepad",
//     type: "Notepad",
//     initialText: "Hello World!",
//     id: 1
//   },
//   {
//     imgSrc: mycomputerIcon,
//     label: "My Computer",
//     type: "MyComputer",
//     id: 2
//   },
//   {
//     imgSrc: programmerIcon,
//     label: "My Profile",
//     type: "Profile",
//     id: 3
//   },
// ];

// export const useGlobalIcons = () => {
//   const [icons, setIcons] = useState(desktopIcons);

//   const removeIcon = (id: number) => {
//     const newIcons = icons.filter(icon => icon.id !== id);
//     desktopIcons = newIcons;
//     setIcons(newIcons);
//     console.log(icons)
//   };

//   const addIcon = (icon: any) => {
//     desktopIcons = [...desktopIcons, icon];
//     setIcons(desktopIcons);
//   };

//   const updateIcon = (id: number, newIcon: any) => {
//     const newIcons = icons.map(icon => (icon.id === id ? newIcon : icon));
//     desktopIcons = newIcons;
//     setIcons(newIcons);
//   };

//   return { icons, addIcon, removeIcon, updateIcon };
// };




// // export const getIcons = () => {
// //   return [...desktopIcons];
// // };

// // export const updateIcon = (id: number, newIconData: any) => {
// //   const iconIndex = desktopIcons.findIndex(icon => icon.id === id);
// //   if (iconIndex >= 0) {
// //     desktopIcons[iconIndex] = { ...desktopIcons[iconIndex], ...newIconData };
// //   }
// // };

// // export const removeIcon = (id: number) => {
// //   desktopIcons = desktopIcons.filter(icon => icon.id !== id);
// //   console.log(id);
// // };
