const TOKEN = 'xxx:YYY'; //Thay bằng token thực tế
const CHAT_ID = -111122223333; //Thay bằng ID thực tế
// const THREAD_ID = aaaaa; //Thay bằng Thread id thực tế

function sendTelegram(message) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`; //URL của bot tele
  const payload = {
    chat_id: CHAT_ID,
    text: message,
    // message_thread_id: THREAD_ID,
    parse_mode: 'Markdown'
  };
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  UrlFetchApp.fetch(url, options);
}

function onEdit(e) {
  const range = e.range;
  const sheet = e.source.getActiveSheet();

  if (range.getColumn() == 'x') { // x là vị trí của cột trong sheet bạn muốn dùng để so sánh. Ví dụ bạn muốn check thay đổi trạng thái của cột C
    const row = range.getRow();
   const newStatus = e.value;
    const oldStatus = e.oldValue;

    if ((!newStatus || newStatus === "") && (!oldStatus || oldStatus === "")) return;
    const bugName = sheet.getRange(row, 1).getValue(); 
    const assignee = sheet.getRange(row, 10).getValue();
    const Priority = sheet.getRange(row, 7).getValue();
    const message = `🔔Bug *${bugName}* vừa thay đổi trạng thái thành *${newStatus}*. \nAssignee: *${assignee}*. \nPriority: *${Priority}*`;
    sendTelegram(message);
  }
}
