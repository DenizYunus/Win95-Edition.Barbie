import NotepadWindow from './components/NotepadWindow'
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { styleReset } from 'react95';

import candy from 'react95/dist/themes/candy';
// original Windows95 font (optionally)
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import TaskBar from './components/TaskBar';


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
  const theme = candy;
  return (
    <div style={{ backgroundColor: "#018281", width: "100vw", height: "100vh" }}>
      <GlobalStyles />
      <ThemeProvider theme={candy}>
        <div style={{ backgroundColor: theme.desktopBackground, width: "100vw", height: "100vh", position: "absolute" }}>
          <div style={{ position: "absolute" }}>
            <NotepadWindow />
          </div>
          <div style={{ position: "absolute" }}>
            <NotepadWindow />
          </div>
        </div>
        <div style={{ backgroundColor: "#0f0", width: "100vw", height: 36, position: "absolute", bottom: 12 }}>
          <TaskBar />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
