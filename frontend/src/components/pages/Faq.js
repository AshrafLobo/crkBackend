import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useAuth, DataProvider } from "../../utilities";

function Faq(props) {
  const provider = new DataProvider();
  const auth = useAuth();

  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await provider.get("faq", {
        "x-auth-token": auth.token,
      });

      setFaqs(data);
    })();
  }, []);

  return (
    <div className="m-2">
      <Accordion defaultActiveKey="1">
        {faqs.map(({ id, question, answer }) => (
          <Accordion.Item eventKey={id} key={id}>
            <Accordion.Header>
              <div className="fw-bold">{question}</div>
            </Accordion.Header>
            <Accordion.Body className="text-muted">{answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default Faq;
