import { Container } from "react-bootstrap";

import "./App.scss";
import FormikContainer from "./components/FormikContainer";

function App() {
  return (
    <Container className="my-4">
      <FormikContainer />
    </Container>
  );
}

export default App;
