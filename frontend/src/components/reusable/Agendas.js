import React from "react";
import { Card, Table } from "react-bootstrap";

function Agendas({ agendas }) {
  return (
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
                      <button>Vote</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Agendas;
