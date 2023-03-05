import { createRoot } from 'react-dom/client';
import MainView from './components/main-view/main-view';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container'
import "./index.scss";

const App = () => {
  return (
    <Container style={{border: "1px solid black"}}>
      <MainView/>
    </Container>
  ) 
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);