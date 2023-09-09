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
  const [windows, setWindows] = useState([
    { id: '1', type: 'Notepad', minimized: false, closed: false },
    { id: '2', type: 'Notepad', minimized: false, closed: false },
    // add more windows here
  ]);

  const closeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, closed: true } : w));
  };

  const toggleMinimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w));
  };

  const createNewWindow = (type: string) => {
    const newWindow = {
      id: `${Date.now()}`,  // You could use any unique identifier
      type: type,
      minimized: false,
      closed: false
    };

    setWindows([...windows, newWindow]);
  };

  const theme = candy;
  return (
    <div style={{ backgroundColor: "#018281", width: "100vw", height: "100vh" }}>
      <GlobalStyles />
      <ThemeProvider theme={candy}>
        <div style={{ position: "absolute", width: "100vw", height: "100vh", zIndex: 5, overflow: "hidden" }}>
          <Desktop createNewWindow={createNewWindow} />
        </div>
        <div style={{ backgroundColor: theme.desktopBackground, width: "100vw", height: "100vh", position: "absolute" }}>
          {windows.map((window) => (
            !window.closed &&
            <div key={window.id} style={{ position: "absolute" }}>
              <NotepadWindow id={window.id} minimized={window.minimized} minimizeWindow={toggleMinimizeWindow} closeWindow={closeWindow} />
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: "#0f0", width: "100vw", height: 36, position: "absolute", bottom: 12 }}>
          <TaskBar windows={windows} toggleMinimizeWindow={toggleMinimizeWindow} closeWindow={closeWindow} />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
