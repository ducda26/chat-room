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

  // User leaves chat (17)
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users (17)
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}

  //(13) (17)
  module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  };