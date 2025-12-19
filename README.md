# Hasthiya Lucky 4 Game

A web-based number matching game built with React, Node.js, Express, and MySQL.

## 🚀 How to Run This Project

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd SahanWeerasinghe-HasthiyaLuckyGame
```

### Step 2: Setup Database

1. Login to MySQL:
```bash
mysql -u root -p
```

2. Create the database and run the schema:
```sql
CREATE DATABASE Lucky;
USE Lucky;
SOURCE Backend/schema.sql;
```

Or run directly from terminal:
```bash
mysql -u root -p < Backend/schema.sql
```

### Step 3: Configure Backend Environment

1. Navigate to the Backend folder:
```bash
cd Backend
```

2. Create a `.env` file (or update existing one):
```bash
# Copy from the template below and add your credentials
```

**Backend/.env file:**
```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=127.0.0.1
DB_USER=root                    # Replace with your MySQL username
DB_PASSWORD=YourPassword        # Replace with your MySQL password
DB_NAME=Lucky
DB_PORT=3306

# Game Configuration
# Hidden Numbers for Lucky 4 Game (4 integers between 1-10)
HIDDEN_NUMBERS=2,5,8,3          # You can change these numbers
```

3. Install dependencies:
```bash
npm install
```

4. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:3000`

### Step 4: Configure Frontend Environment

1. Open a new terminal and navigate to the Frontend folder:
```bash
cd Frontend
```

2. Create a `.env` file:
```bash
# Copy from .env.example or create new
```

**Frontend/.env file:**
```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

3. Install dependencies:
```bash
npm install
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 5: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## 🎮 Quick Test

1. Enter your email on the signup page
2. Click "Start Playing"
3. Choose 4 numbers (1-10) and submit
4. View your results and check the leaderboard

## 📝 Troubleshooting

**Database Connection Issues:**
- Verify MySQL is running: `sudo systemctl status mysql` (Linux) or check MySQL service
- Check credentials in `Backend/.env` match your MySQL setup
- Ensure database `Lucky` exists

**Port Already in Use:**
- Backend (3000): Change `PORT` in `Backend/.env`
- Frontend (5173): It will auto-increment to 5174, 5175, etc.

**Module Not Found:**
- Run `npm install` in both Backend and Frontend folders

## 🛠️ Technologies Used
- **Frontend:** React, TypeScript, Material UI, Vite
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **API Client:** Axios
