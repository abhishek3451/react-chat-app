import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMailHandler } from "../Store/Mailthunk";
import { Inbox } from "./Inbox";

const InboxPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const refresh = setInterval(() => {
      dispatch(getMailHandler());
    }, 1000);

    return () => {
      clearInterval(refresh);
    };
  }, []);
  return (
    <div>
      <Inbox />
    </div>
  );
};

export default InboxPage;
