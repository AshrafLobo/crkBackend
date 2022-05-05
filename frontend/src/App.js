import { Container } from "react-bootstrap";

import "./App.scss";
import LoginForm from "./components/forms/LoginForm";

function App() {
  return (
    <Container className="my-4">
      <LoginForm />
    </Container>
  );
}

export default App;
