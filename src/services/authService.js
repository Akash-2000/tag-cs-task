const USERS_KEY = "users";

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users back to localStorage
export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register new user
export const registerUser = (user) => {
  const users = getUsers();
  const exists = users.some((u) => u.email === user.email);
  if (exists) {
    throw new Error("User already exists");
  }
  users.push(user);
  saveUsers(users);
};

// Login user
export const loginUser = ({ email, password }) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  return user;
};
