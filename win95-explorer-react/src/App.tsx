import NotepadWindow from './components/NotepadWindow'
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { styleReset } from 'react95';

import candy from 'react95/dist/themes/candy';
// original Windows95 font (optionally)
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import TaskBar from './components/TaskBar';
import { useState } from 'react';
import Desktop from './components/Desktop';
import MyComputerWindow from './components/MyComputerWindow';
import ProfileWindow from './components/ProfileWindow';
import { GlobalIconProvider } from './utils/GlobalIconContext';


const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
`;

function App() {
  interface IWindow {
    id: string,
    type: string,
    minimized: boolean,
    value?: string,
    desktopIconId?: number
  }

  const [windows, setWindows] = useState<IWindow[]>([
    // { id: '1', type: 'Notepad', minimized: false, closed: false, value: "ahadsgdashgdas" },
    // { id: '2', type: 'MyComputer', minimized: false, closed: false },
    // { id: '3', type: 'Profile', minimized: false, closed: false },
    // add more windows here
  ]);

  const closeWindow = (id: string) => {
    // setWindows(windows.map(w => w.id === id ? { ...w, closed: true } : w));
    setWindows(windows.filter(w => w.id !== id));
  };

  const toggleMinimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w));
  };

  const createNewWindow = (type: string, desktopIconId: number | undefined = undefined, initialValue: string | undefined = "") => {
    const newWindow = {
      id: `${Date.now()}`,  // You could use any unique identifier
      type: type,
      minimized: false,
      value: initialValue,
      desktopIconId: desktopIconId,
      closed: false
    };

    setWindows([...windows, newWindow]);
  };

  const saveTextContent = (id: string, content: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, value: content } : w));
  };

  const theme = candy;
  return (
    <GlobalIconProvider>
      <div style={{ backgroundColor: "#018281", width: "100vw", height: "100vh" }}>
        <GlobalStyles />
        <ThemeProvider theme={candy}>
          <div style={{ position: "absolute", width: "100vw", height: "100vh", zIndex: 1, overflow: "hidden" }}>
            <Desktop createNewWindow={createNewWindow} />
          </div>
          <div style={{ backgroundColor: theme.desktopBackground, width: "100vw", height: "100vh", position: "absolute" }}>
            {windows.map((window) => (
              <div key={window.id} style={{ position: "absolute" }}>
                {window.type === 'Notepad' && <NotepadWindow id={window.id} desktopIconId={window.desktopIconId} minimized={window.minimized} minimizeWindow={toggleMinimizeWindow} closeWindow={closeWindow} saveTextContent={saveTextContent} initialText={window.value} />}
                {window.type === 'MyComputer' && <MyComputerWindow id={window.id} minimized={window.minimized} minimizeWindow={toggleMinimizeWindow} closeWindow={closeWindow} />}
                {window.type === 'Profile' && <ProfileWindow id={window.id} minimized={window.minimized} minimizeWindow={toggleMinimizeWindow} closeWindow={closeWindow} />}
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: "#0f0", width: "100vw", height: 36, position: "absolute", bottom: 12, zIndex: 2 }}>
            <TaskBar windows={windows} toggleMinimizeWindow={toggleMinimizeWindow} createProfileWindow={() => { createNewWindow("Profile"); }} />
          </div>
        </ThemeProvider>
      </div>
    </GlobalIconProvider>
  )
}

export default App;