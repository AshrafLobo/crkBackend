import React, { useState } from "react";
import fileDownload from "js-file-download";
import { Card, Table } from "react-bootstrap";

import { DataProvider, useAuth } from "../../utilities";
import { Modal } from "./";

function Resources({ resources }) {
  const provider = new DataProvider();
  const auth = useAuth();

  const handleDownload = async (id, file_name) => {
    const { data } = await provider.get(
      `resources/${id}/download`,
      {
        "x-auth-token": auth.token,
      },
      "blob"
    );

    fileDownload(data, file_name);
  };

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleGetText = async (name, id) => {
    const { data } = await provider.get(`resources/${id}`, {
      "x-auth-token": auth.token,
    });

    const { file_name } = data[0];
    setTitle(name);
    setText(file_name);
    setShow(true);
  };

  return (
    <>
      <Card>
        <Card.Header>Access resources</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Name</th>
                <th>Resource</th>
              </tr>
            </thead>
            <tbody>
              {resources &&
                resources.map(({ id, no, type, name, file_name }) => {
                  let button = null;
                  if (type === "live_link") button = <button>Get Link</button>;
                  if (type === "text")
                    button = (
                      <button onClick={() => handleGetText(name, id)}>
                        Get Text
                      </button>
                    );
                  if (type === "document")
                    button = (
                      <button onClick={() => handleDownload(id, file_name)}>
                        Download
                      </button>
                    );

                  return (
                    <tr key={id}>
                      <td>{no}</td>
                      <td>{type}</td>
                      <td>{name}</td>
                      <td>{button}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={show} setShow={setShow} title={title}>
        {text}
      </Modal>
    </>
  );
}

export default Resources;
