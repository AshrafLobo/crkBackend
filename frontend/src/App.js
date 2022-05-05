import { Container } from "react-bootstrap";

import "./App.scss";
import EnrollmentForm from "./components/EnrollmentForm";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <Container className="my-4">
      <EnrollmentForm />
    </Container>
  );
}

export default App;
