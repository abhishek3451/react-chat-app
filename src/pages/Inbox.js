import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import { deleteItemById } from "../Store/Mailthunk";
import { ListGroup } from "react-bootstrap";
import { mailActions } from "../Store/Mail-slice";

export const Inbox = () => {
  const navigate = useNavigate();
  const mails = useSelector((state) => state.mail.mailList);

  const dispatch = useDispatch();
  const handleClick = (item) => {
    navigate(`/inbox/${item.id}`);
  };
  const delData = (e, id) => {
    e.stopPropagation();
    dispatch(deleteItemById(id));
    dispatch(mailActions.updateCount(0));
  };

  return (
    <>
      <h3 style={{ textAlign: "center" }}>Inbox Box</h3>
      <ListGroup as="ul" className="m-3">
        {mails.map((item) => {
          return (
            <ListGroup.Item
              key={item.id}
              className="m-1 "
              action
              onClick={() => handleClick(item)}
            >
              <ul style={item.read === true ? { listStyleType: "none" } : null}>
                <li className="d-flex justify-content-between align-items-center">
                  {item.read === false ? (
                    <span style={{ color: "blue" }}>
                      <GoPrimitiveDot />
                    </span>
                  ) : (
                    ""
                  )}
                  {console.log(item.read)}
                  <span>{item.from}</span>

                  <b>
                    <span>{item.message}</span>
                  </b>
                  <span>{item.time}</span>
                  <span onClick={(e) => delData(e, item.id)}>
                    <MdDelete />
                  </span>
                </li>
              </ul>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
};

const Container = styled.div`
  border-bottom: 1px solid lightgray;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 10px;
`;
const List = styled.div`
  flex: 11;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Mail1 = styled.div`
  flex: 4;
  color: black;
`;
const Mail2 = styled.div`
  flex: 5;
  color: black;
`;
const Mail3 = styled.div`
  flex: 2;
  color: black;
`;
const Read = styled.div`
  flex: 1;
`;
