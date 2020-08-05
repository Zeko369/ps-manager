import { ThemeProvider, CSSReset } from '@chakra-ui/core';

const ChakraWrapper: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      {children}
    </ThemeProvider>
  );
};

export default ChakraWrapper;
