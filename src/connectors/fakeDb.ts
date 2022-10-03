const db = {
  users: [
    { id: '1', username: 'superpower.123', email: 'admin@example.org' },
    { id: '2', username: 'Petr', email: 'petr@example.org' },
    { id: '3', username: 'deCurator', email: 'decorator@framework.com' },
  ],
}

export const userRepository = {
  list: () => Promise.resolve(db.users),
  detail: ({ id }: { id: string }) => Promise.resolve(db.users.find(u => u.id === id)),
  update: ({ id }: { id: string },
    data: any) => Promise.resolve(db.users = db.users.map(u => u.id === id ? { ...u, ...data } : u)),
}
