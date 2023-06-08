import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMailHandler } from "../Store/Mailthunk";
import { Sentinbox } from "./sentInbox";

const Sentboxpage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMailHandler());
  }, []);

  return (
    <div>
      <Sentinbox />
    </div>
  );
};

export default Sentboxpage;
