import React, { useState } from "react";
import { Card, Table } from "react-bootstrap";

import OpenVotingForm from "../forms/OpenVotingForm";
import Modal from "./Modal";

function Agendas({ agendas }) {
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState("");

  const handleVoteClick = (question) => {
    setQuestion(question);
    setShow(true);
  };

  const handleVoting = (values) => {
    console.log("Voting", values);
  };

  return (
    <>
      <Card>
        <Card.Header>Agendas</Card.Header>
        <Card.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Agenda</th>
                <th>Question</th>
                <th>Type</th>
                <th>Vote</th>
              </tr>
            </thead>
            <tbody>
              {agendas &&
                agendas.map((agenda) => {
                  return (
                    <tr key={agenda.id}>
                      <td>{agenda.agenda_no}</td>
                      <td>{agenda.name}</td>
                      <td>{agenda.question}</td>
                      <td>{agenda.type}</td>
                      <td>
                        <button
                          onClick={() => handleVoteClick(agenda.question)}
                        >
                          Vote
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={show} setShow={setShow} title="Vote">
        <OpenVotingForm question={question} handleVoting={handleVoting} />
      </Modal>
    </>
  );
}

export default Agendas;
