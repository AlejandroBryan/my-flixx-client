import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container'
import "./index.scss";


const App = () => {
  return (
    <StrictMode>
      <MainView/>
    </StrictMode>
     
  ) 
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);