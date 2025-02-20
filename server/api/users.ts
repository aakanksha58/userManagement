import { useStorage } from '#imports';

const storage = useStorage('users', { driver: 'fs' });

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const users = (await storage.getItem('users')) || [];

  if (method === 'GET') {
    return { success: true, data: users };
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const newUser = { id: Date.now(), ...body };
    users.push(newUser);
    await storage.setItem('users', users);
    return { success: true, data: newUser };
  }

  if (method === 'PUT') {
    const body = await readBody(event);
    if (!body.id) {
      return { success: false, error: "User ID is required" };
    }
  
    const index = users.findIndex(user => user.id === body.id);
    if (index === -1) {
      return { success: false, error: "User not found" };
    }
  
    users[index] = { ...users[index], ...body };
    await storage.setItem('users', users);
    return { success: true, data: users[index] };
  }

  if (method === 'DELETE') {
    const body = await readBody(event);
    const updatedUsers = users.filter(user => user.id !== body.id);
    await storage.setItem('users', updatedUsers);
    return { success: true };
  }

  return { success: false, error: "Method Not Allowed" };
});
