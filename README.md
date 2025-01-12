# Handwritten Character Recognition Web Application

A web-based interface for the deep learning OCR system specializing in handwritten character recognition. 

## Author
**Ashkan Sadri Ghamshi**  
HAWK University  
Computer Science Department  
January 2025

## Project Overview
This web application serves as the frontend interface for a deep learning-based OCR system that recognizes handwritten digits (0-9) and uppercase letters (A-Z). Built with Next.js and modern web technologies, it provides a user-friendly interface for character recognition with real-time feedback.

## Features
- Real-time character recognition
- Interactive particle background visualization
- Responsive design for all devices
- Image upload and preview functionality
- Confidence score visualization
- Real-time processing status feedback

## Technical Stack
- **Frontend Framework**: Next.js 14
- **UI Components**: React 18
- **Styling**: TailwindCSS
- **Animation**: GSAP & Particles.js
- **API Integration**: Axios
- **Image Processing**: FormData & HTML5 Canvas

## Getting Started

First, install dependencies:
```bash
npm install
# or
yarn install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure
```
src/
  ├── components/           # React components
  │   ├── ImgRecognizer.js # Main recognition component
  │   └── ParticlesCom.js  # Background animation
  ├── pages/               # Next.js pages
  │   ├── index.js         # Main application page
  │   └── api/            # API routes
  └── styles/             # Global styles
```

## API Integration
The application connects to a Flask backend server for character recognition. API endpoints:
- POST `/api/predict`: Submit image for recognition
- GET `/ping`: Backend health check

## Deployment
The application is deployed on Vercel and can be accessed at:
[https://handwriting-ui.vercel.app/](https://handwriting-ui.vercel.app/)

## Development Notes
This application is part of a master's thesis project at HAWK University, focusing on deep learning applications in character recognition. The frontend is designed to provide an intuitive interface for demonstrating the capabilities of the underlying neural network model.