import axios from "axios";
import { mailActions } from "./Mail-slice";

export const sendMailHandler = (mail) => {
  return async (dispatch) => {
    let emailId = await mail.to.replace(/[&@.]/g, "");
    let userId = mail.from.replace(/[&@.]/g, "");

    const postMail = async () => {
      const response = await fetch(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/mail${emailId}.json`,
        {
          method: "POST",
          body: JSON.stringify(mail),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const resp2 = await axios.post(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/sentmail${userId}.json`,
        mail
      );
      if (resp2.status) {
        alert("mail sent");
      }
      if (data.error) {
        throw new Error("failed");
      }
      return data;
    };
    try {
      await postMail();
      dispatch(mailActions.sendmail());
      dispatch(getMailHandler());
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getMailHandler = () => {
  return async (dispatch) => {
    let emailId = localStorage.getItem("userId").replace(/[&@.]/g, "");

    const getMail = async () => {
      const response = await fetch(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/mail${emailId}.json`
      );
      const data = await response.json();
      if (response.status) {
        return data;
      }
    };

    const getSentMail = async () => {
      const res = await fetch(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/sentmail${emailId}.json`
      );
      const data1 = await res.json();
      if (res.status) {
        return data1;
      }
    };

    try {
      const data = await getMail();
      const mailList = [];
      for (const key in data) {
        const Obj = {
          id: key,
          ...data[key],
        };
        mailList.push(Obj);
      }

      const sentMail = await getSentMail();
      const sentMailList = [];
      for (const key in sentMail) {
        const Obj = {
          id: key,
          ...sentMail[key],
        };
        sentMailList.push(Obj);
      }
      dispatch(mailActions.updateCount(mailList));
      dispatch(mailActions.inboxMail(mailList));
      dispatch(mailActions.mailSent(sentMailList));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteItemById = (id) => {
  return async (dispatch) => {
    let emailId = localStorage.getItem("userId").replace(/[&@.]/g, "");

    const deleteEmail = async () => {
      const response = await axios.delete(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/mail${emailId}/${id}.json`
      );
      if (response.status) {
        return;
      }
    };
    try {
      await deleteEmail();
      dispatch(getMailHandler());
    } catch (error) {
      console.log(error);
    }
  };
};
export const getMailByIdHandler = (id) => {
  return async (disptach) => {
    let emailId = localStorage.getItem("userId").replace(/[&@.]/g, "");

    const getMail = async () => {
      const response = await fetch(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/mail${emailId}/${id}.json`
      );
      const data = await response.json();

      if (response.ok) {
        return data;
      }
    };
    try {
      const data = await getMail();

      disptach(updateItemById(data, id));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateItemById = (item, id) => {
  return async (dispatch) => {
    let emailId = localStorage.getItem("userId").replace(/[&@.]/g, "");

    const UpdateEmailList = async () => {
      const response = await fetch(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/mail${emailId}/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            from: item.from,
            subject: item.subject,
            message: item.message,
            time: item.time,
            to: item.to,
            read: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        return data;
      }
    };
    try {
      await UpdateEmailList();
      dispatch(getMailHandler());
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteSentItemById = (id) => {
  return async (dispatch) => {
    let emailId = localStorage.getItem("userId").replace(/[&@.]/g, "");

    const deleteEmail = async () => {
      const response = await axios.delete(
        `https://mail-client-88f7e-default-rtdb.firebaseio.com/sentmail${emailId}/${id}.json`
      );
      if (response.status) {
        return;
      }
    };
    try {
      await deleteEmail();
      dispatch(getMailHandler());
    } catch (error) {
      console.log(error);
    }
  };
};
