import { ThemeProvider } from 'styled-components';
import GlobalStyle from './utils/globalStyle';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './utils/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from './utils/Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <Router/>
        <ReactQueryDevtools initialIsOpen panelProps={{style:{height:250}}}/>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
