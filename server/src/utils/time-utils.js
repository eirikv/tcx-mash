const _pad = time => time < 10 ? `0${time}` : `${time}`;

function formatTime(time) {
  let hour = Math.floor((time/(1000*60*60)) % 24);
  let min = Math.floor((time/(1000*60)) % 60);
  let sec = Math.floor((time/1000) % 60);

  return `${_pad(hour)}:${_pad(min)}:${_pad(sec)}`;
}

module.exports = {
  formatTime,
};
