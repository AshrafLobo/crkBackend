import React, { useState } from "react";
import { Card, Table } from "react-bootstrap";
import jwt_decode from "jwt-decode";

import { ClosedVotingForm, OpenVotingForm } from "../forms";
import { DataProvider, useAuth } from "../../utilities";

import Modal from "./Modal";

function Agendas({ agendas }) {
  const provider = new DataProvider();
  const auth = useAuth();
  const { phoneNo: PhoneNumber } = jwt_decode(auth.token);

  const [show, setShow] = useState(false);
  const [votingForm, setVotingForm] = useState(null);

  const getOptions = async (agenda_no) => {
    const { data } = await provider.get(
      "answers",
      {
        "x-auth-token": auth.token,
      },
      agenda_no
    );

    const options = [];

    if (data && data.length > 0) {
      data.forEach((option) => {
        options.push({
          key: option.answer,
          value: option.answer,
        });
      });
    }

    return options;
  };

  const handleVoteClick = async (agenda) => {
    const { agenda_no, type, question } = agenda;

    if (type === "Open") {
      setVotingForm(
        <OpenVotingForm
          question={question}
          handleVoting={(values) => handleVoting(values, agenda)}
        />
      );
    } else {
      const options = await getOptions(agenda_no);

      setVotingForm(
        <ClosedVotingForm
          question={question}
          handleVoting={(values) => handleVoting(values, agenda)}
          options={options}
        />
      );
    }
    setShow(true);
  };

  const handleVoting = async (values, agenda) => {
    setShow(false);

    /** Destructure and fill in payload values */
    const {
      id: agenda_id,
      agenda_no,
      name: agenda_name,
      question: agenda_question,
    } = agenda;
    const { answer: vote } = values;

    /** Get user data */
    const {
      data: { MemberNo: voter_MemberNo, full_name, phoneNo, shares },
    } = await provider.get(
      "user",
      {
        "x-auth-token": auth.token,
      },
      PhoneNumber
    );

    /** Create payload */
    const payload = {
      agenda_id,
      agenda_no,
      agenda_name,
      agenda_question,
      voter_MemberNo,
      full_name,
      phoneNo,
      vote,
      shares,
    };

    await provider.post("votes", payload, {
      "x-auth-token": auth.token,
    });
  };

  return (
    <>
      <Card>
        <Card.Header>Agendas</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
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
                        <button onClick={() => handleVoteClick(agenda)}>
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
        {votingForm}
      </Modal>
    </>
  );
}

export default Agendas;
