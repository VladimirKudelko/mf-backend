import { sendReportCallback } from './mail-sending';

export default () => {
  setInterval(sendReportCallback, 1000 * 60 * 60);
};
