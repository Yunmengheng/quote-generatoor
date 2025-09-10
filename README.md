# Quote Generator

**Created by: MengHeng**

## Description

A modern, responsive Quote Generator web application that delivers inspirational quotes with an elegant user interface. Built with Next.js 15, TypeScript, and Tailwind CSS, this application integrates with Supabase for real-time database management and features a beautiful green-themed design with smooth animations.

**Technologies Used:**
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Supabase (Database & API)
- **Styling:** Custom CSS with Tailwind utilities

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- A Supabase account and project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yunmengheng/quote-generatoor.git
   cd quote-generatoor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL commands from `supabase-setup.sql` in your Supabase SQL Editor
   - Copy your project URL and anon key

4. **Configure environment variables:**
   ```bash
   # Create .env.local file and add your Supabase credentials
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Architecture

### Frontend (Next.js + TypeScript)
- **Component Structure:** React functional components with TypeScript for type safety
- **State Management:** React hooks (useState, useEffect) for local state
- **Styling:** Tailwind CSS with custom color palette and responsive design
- **User Interface:** Clean, modern design with smooth animations and hover effects


### Data Flow
1. **Frontend** → Fetches quotes from Supabase on component mount
2. **User Interaction** → Clicks "Get Random Quote" button
3. **Frontend Logic** → Randomly selects quote from local state array
4. **UI Update** → Displays quote text and author with animations
5. **Error Handling** → Fallback to local quotes if database connection fails

## Features

- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Database Integration** - Quotes stored and fetched from Supabase
- ✅ **Random Quote Selection** - Intelligent randomization algorithm
- ✅ **Error Handling** - Graceful fallbacks and user feedback
- ✅ **Loading States** - Visual feedback during data fetching
- ✅ **Custom Animations** - Smooth transitions and hover effects
- ✅ **TypeScript** - Full type safety and better developer experience
- ✅ **Auto-seeding** - Automatically populates database with initial quotes

## Color Palette

- **Primary Green:** `#3E5F44` (Dark green for text and buttons)
- **Secondary Green:** `#5E936C` (Medium green for accents)
- **Light Green:** `#93DA97` (Background gradients)
- **Mint Green:** `#E8FFD7` (Quote box background)
