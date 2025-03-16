const messages = ["Hello", "Hi", "Hola", "Bonjour", "Ciao"];

//business logic function 1
const getMsgById = (id) => {
  //business logic
  if (id >= messages.length) {
    return "Not Found";
  } else {
    return messages[id];
  }
};

//business logic function 2
const getAllMsg = () => {
  return messages;
};

module.exports = {
  getMsgById,
  getAllMsg,
};
