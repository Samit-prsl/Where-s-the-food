# MERN Stack Setup Guide (Bun + Vite)

This guide will help you set up a MERN (MongoDB, Express.js, React, Node.js) stack application using Bun as the JavaScript runtime and Vite for the frontend build tool.

## Prerequisites

- [Bun](https://bun.sh) installed on your system
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally or a MongoDB Atlas account
- Git for version control
- A code editor (VS Code recommended)

## If bun is not present in your machine
- Delete bun.lockb
- run npm install

## Running the Application

1. Start the backend server:
```bash
cd backend
bun run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
bun run dev
```

The application will be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5050

### Backend
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "bun test"
  }
}
```

### Frontend
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src"
  }
}
```

## Support and Resources

- [Bun Documentation](https://bun.sh/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)


## License

This project is licensed under the MIT License - see the LICENSE file for details.