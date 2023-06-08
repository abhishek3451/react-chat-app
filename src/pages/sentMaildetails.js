import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getMailByIdHandler } from "../Store/Mailthunk";
import Home from "../Header/Home";

const Sentmaildetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mail, setMail] = useState({});

  const retrieveData = async () => {
    try {
      let emailId = localStorage.getItem("userId").replace(/[&@.]/g, "");

      const res = await axios.get(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/sentmail${emailId}/${id}.json`
      );
      if (res.status) {
        setMail(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      dispatch(getMailByIdHandler(id));
      retrieveData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <Card className="mt-3">
        <Card.Header>
          <label>
            <h5>Subject</h5>
          </label>
          <p>{mail.subject}</p>
        </Card.Header>
        <Card.Body>
          <h6>Message</h6>
          <p className="mb-5">{mail.message}</p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Sentmaildetails;
