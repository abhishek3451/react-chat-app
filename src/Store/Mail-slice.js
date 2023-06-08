import { createSlice } from "@reduxjs/toolkit";
const initialval = {
  sendMail: false,
  sentMail: [],
  mailList: [],
  count: 0,
  mailsSent: [],
};
const mailSlice = createSlice({
  name: "mail",
  initialState: initialval,
  reducers: {
    sendmail: (state, action) => {
      state.sentMail.push(action.payload);
    },
    inboxMail: (state, action) => {
      state.mailList = action.payload;
    },
    mailSent: (state, action) => {
      state.mailsSent = action.payload;
    },

    updateCount: (state, action) => {
      const mails = action.payload;
      const unreadMsgs = mails.filter((item) => item.read === false);
      state.count = unreadMsgs.length;
    },
    onLogout: (state) => {
      state.mailList = [];
      state.mailsSent = [];
      state.count = 0;
    },
  },
});
export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
