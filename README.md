# ShaadiMart Matrimony - Frontend

A modern, responsive matrimony web application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features real-time chat, profile management, and secure authentication.

![ShaadiMart](https://img.shields.io/badge/ShaadiMart-Matrimony-pink) 
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🚀 Features

### 🔐 Authentication & Security
- **JWT-based authentication** with Laravel Sanctum
- **Secure token storage** in HTTP-only cookies
- **Protected routes** with automatic redirects
- **Password change** functionality

### 💬 Real-time Chat System
- **WebSocket-based real-time messaging** using Laravel Reverb
- **Private chat channels** for secure communication
- **Online/offline status** indicators
- **Message read receipts** and typing indicators
- **Optimistic UI updates** for instant messaging

### 👤 Profile Management
- **Multiple profile pictures** with primary selection
- **Plan-based upload limits** (Basic, Premium plans)
- **Drag & drop image upload**
- **Profile picture management** (upload, delete, set primary)

### 🎨 UI/UX Features
- **Fully responsive design** (mobile-first approach)
- **Modern glassmorphism design** with smooth animations
- **Dark/Light mode support** (optional)
- **Accessible components** with proper ARIA labels
- **Loading states** and error handling

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Context + useState/useEffect

### Real-time Communication
- **WebSocket**: Laravel Reverb
- **Client**: Laravel Echo + Pusher protocol

### Backend Integration
- **API**: Laravel 10+ REST API
- **Authentication**: Laravel Sanctum tokens
- **File Storage**: AWS S3 / Local storage

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend API running (Laravel)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/shaadimart-frontend.git
cd shaadimart-frontend
