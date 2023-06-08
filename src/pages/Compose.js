import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

import { useDispatch } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { sendMailHandler, updateItemById } from "../Store/Mailthunk";
import { useParams } from "react-router-dom";

const Compose = () => {
  const emailref = useRef();
  const { mailId } = useParams();
  const sub = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const dispatch = useDispatch();
  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    const mail = {
      to: emailref.current.value,
      subject: sub.current.value,
      from: localStorage.getItem("userId"),
      message: editorState.getCurrentContent().getPlainText(),
      time: new Date().toLocaleString(),
      read: false,
    };

    dispatch(sendMailHandler(mail));
  };
  useEffect(() => {
    dispatch(updateItemById());
    if (mailId) {
      emailref.current.value = mailId;
    } else return;
  }, []);

  return (
    <>
      <Container className="m-3 bg-default">
        <Row className="d-flex">
          <Col className="compose-header">
            <h5>New Message</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailref}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subject"
                  ref={sub}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEditor">
                <Form.Label>Message</Form.Label>
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  editorStyle={{
                    height: "10rem",
                  }}
                  onEditorStateChange={handleEditorChange}
                />
              </Form.Group>
              <Col className="compose-footer">
                <Button
                  variant="dark"
                  type="submit"
                  style={{ marginTop: "0.5rem" }}
                >
                  Send
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Compose;
