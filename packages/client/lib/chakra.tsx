import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core';

const ChakraWrapper: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      {children}
    </ThemeProvider>
  );
};

export default ChakraWrapper;
