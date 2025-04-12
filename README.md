# 🌎 Globetrotter - The Ultimate Travel Guessing Game

Welcome to Globetrotter, an engaging full-stack web application that challenges players to guess famous destinations based on cryptic clues! Test your geography knowledge, learn fascinating facts about places around the world, and challenge your friends to beat your score.

## ✨ Features

### 🎮 Core Gameplay
- **Cryptic Clues**: Get presented with intriguing clues about world-famous destinations
- **Multiple Choice**: Select from carefully curated options for each destination
- **Interactive Feedback**: 
  - 🎉 Correct answers trigger celebratory animations and reveal fascinating facts
  - 🤔 Wrong guesses provide learning opportunities with interesting destination trivia
- **Progressive Scoring**: Track your performance with an intuitive scoring system

### 🤝 Social Features
- **Profile Creation**: Create your unique player profile
- **Challenge Friends**: Generate and share custom invitation links
- **Social Competition**: Compare scores with friends and compete for the top spot
- **Dynamic Share Cards**: Auto-generated social media cards for sharing challenges

### 🎯 Additional Features
- **Extensive Database**: 100+ carefully curated destinations with unique clues and facts
- **AI-Enhanced Content**: Leverages AI to generate engaging and accurate destination information
- **Responsive Design**: Seamless experience across all devices
- **Real-time Updates**: Instant feedback and score tracking

## 🚀 Tech Stack

- **Frontend**:
  - Next.js 15 with App Router
  - React 19
  - TypeScript for type safety
  - Tailwind CSS for styling

- **Backend**:
  - Next.js API Routes

- **DataBase**:
  - MongoDB

- **Infrastructure**:
  - Vercel for deployment
  - Mongodb hosted on Atlas

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sagar-io/The-Globetrotter-Challenge.git
   cd The-Globetrotter-Challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```env
   MONGO_URI="your_mongodb_connection_string"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser
