import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { deleteSentItemById } from "../Store/Mailthunk";
import { MdDelete } from "react-icons/md";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const Sentinbox = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sentmails = useSelector((state) => state.mail.mailsSent);

  const delData = async (e, id) => {
    e.stopPropagation();
    dispatch(deleteSentItemById(id));
  };

  const handleClick = (item) => {
    navigate(`/sent/${item.id}`);
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Sent Box</h3>
      <ListGroup as="ul" className="m-3">
        {sentmails.map((item) => {
          return (
            <ListGroup.Item
              key={item.id}
              className="m-1 "
              action
              onClick={() => handleClick(item)}
            >
              <ul style={item.read === true ? { listStyleType: "none" } : null}>
                <li className="d-flex justify-content-between align-items-center">
                  {console.log(item.read)}
                  <span>{item.to}</span>

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
    </div>
  );
};
