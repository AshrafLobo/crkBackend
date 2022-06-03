import React from "react";
import { Card, Table } from "react-bootstrap";

function Downloads({ downloads }) {
  return (
    <Card>
      <Card.Header>Access resources</Card.Header>
      <Card.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Name</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {downloads &&
              downloads.map((download) => {
                return (
                  <tr key={download.id}>
                    <td>{download.no}</td>
                    <td>{download.type}</td>
                    <td>{download.name}</td>
                    <td>
                      <button>Download</button>
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

export default Downloads;
