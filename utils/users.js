const users = []; // (13)

// Join user to chat (13)
function userJoin(id, username, room) {
    const user = { id, username, room };
  
    users.push(user);
  
    return user;
  }
  
  // Get current user(13)
  function getCurrentUser(id) {
    return users.find(user => user.id === id);
  }

  //(13)
  module.exports = {
    userJoin,
    getCurrentUser
  };