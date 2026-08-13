# Fullstack Airbnb Clone

A modern, full-stack clone of Airbnb featuring a beautiful UI built with Next.js and Tailwind CSS, powered by a robust Python FastAPI backend and PostgreSQL database.

## 🚀 Tech Stack

**Frontend**
- Next.js (App Router, React 18)
- Tailwind CSS (Styling, Animations)
- Lucide React (Icons)
- Leaflet (Interactive Maps)

**Backend**
- Python 3.12
- FastAPI (High performance API)
- SQLAlchemy (ORM)
- Alembic (Database Migrations)
- PostgreSQL (Neon.tech)
- Uvicorn (ASGI Server)

## ✨ Features
- Pixel-perfect, responsive Airbnb UI with beautiful micro-animations
- Search functionality with Location, Dates, and Guest filters
- Interactive Map view linking pins to listings
- User Authentication (Guest & Host roles)
- Categorized listings (Homes, Experiences)
- Detailed Listing pages with Image Galleries and sticky Booking Widgets
- Host dashboard for managing listings

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL Database (Local or cloud like Neon.tech)

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment and install dependencies:
```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

Set up your environment variables by creating a `.env` file in the `backend` directory:
```env
# backend/.env
DATABASE_URL=postgresql://user:password@hostname/dbname?sslmode=require
SECRET_KEY=your-super-secret-key
```

Run database migrations to create tables:
```bash
python -m alembic upgrade head
```

Seed the database with mock data:
```bash
python seed_locations.py
```

Start the FastAPI server:
```bash
uvicorn app.main:app --reload --port 8000
```
*The API will be available at http://localhost:8000*

### 2. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Set up your environment variables by creating a `.env.local` file in the `frontend` directory:
```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the Next.js development server:
```bash
npm run dev
```
*The web app will be available at http://localhost:3000*

---

## 🌍 Online Deployment Guide

To put your app on the live internet for free, we recommend the following stack:

### 1. Database (Neon.tech)
1. Create a free PostgreSQL database on [Neon.tech](https://neon.tech/).
2. Copy the Connection String provided.

### 2. Backend (Render.com)
1. Push your repository to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your repository.
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add an Environment Variable:
   - `DATABASE_URL`: *(Paste your Neon connection string here)*
6. Deploy! Render will give you a URL (e.g., `https://airbnb-backend-xxxx.onrender.com`).

### 3. Frontend (Vercel.com)
1. Go to [Vercel](https://vercel.com/) and create a new Project.
2. Import your GitHub repository.
3. Vercel will automatically detect Next.js. 
4. In the Environment Variables section, add:
   - `NEXT_PUBLIC_API_URL`: `https://airbnb-backend-xxxx.onrender.com` *(Make sure to use your actual Render URL and do NOT append /api/v1)*
5. Deploy! Vercel will give you your final live web URL.
