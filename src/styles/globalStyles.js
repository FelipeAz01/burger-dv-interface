import { createGlobalStyle } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';

const globalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-family: "Poppins", serif;
    font-weight: 400;
    font-style: normal;
  }

  button, a {
    cursor: pointer;
  }
`;

export default globalStyles;
