import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
/* reset css */
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

  body {
    //background-color: #D9E6f6;
    background-color: #D9E6f6;
    background-image: linear-gradient(0deg, #308BC5 15%, #D9E6f6  45%);



    font-family: sans-serif;
  }
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}

`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
