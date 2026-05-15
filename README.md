# LaborLink

A React Native mobile application that connects customers with service providers (labourers) for appointment-based services.

## Overview

LaborLink is a two-sided marketplace platform enabling:
- **Customers**: Browse services, book appointments, track labour history, post reviews, and manage profiles
- **Labourers**: List services, manage bookings, view customer reviews, track work history, and accept/decline appointments

## Key Features

- **User Authentication**: Role-based login/signup (Customer or Labour) with OTP verification and password management
- **Appointment System**: Book, manage, and track appointments with real-time updates
- **Real-time Chat**: In-app messaging between customers and service providers
- **Notifications**: Push notifications for bookings, appointments, and updates
- **Reviews & Ratings**: Rate and review services with feedback system
- **Location-based Services**: Map view integration for service discovery
- **Work History Tracking**: Complete history of past services
- **Profile Management**: Customizable user profiles with document uploads
- **Payment Integration**: Service booking with transaction tracking

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack, Tab, Native Stack)
- **Authentication**: JWT with Firebase
- **Database/Backend**: Firebase & REST API (Axios)
- **Real-time Communication**: WebSocket (STOMP) for chat
- **State Management**: React Context API
- **Forms**: React Hook Form + Formik
- **UI Components**: React Native Elements, Custom Components
- **Notifications**: Expo Notifications, Native Notify
- **File Storage**: Expo Image Picker, Document Picker, Firebase Storage
- **Additional**: DayJS, Calendars, Charts

## Project Structure

```
src/
├── components/        # Reusable UI components
├── screens/          # App screens and pages
│   └── authentication/  # Login, signup, password reset
├── services/         # API calls and business logic
├── context/          # React Context for state management
├── utils/            # Navigation and helper utilities
└── assets/           # Images and static assets
```

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the app**
   ```bash
   npm start           # Expo CLI menu
   npm run android     # Android
   npm run ios         # iOS
   npm run web         # Web
   ```

## Key Services

- **AuthService**: User authentication and token management
- **BookingService**: Appointment booking and management
- **ChatService**: Real-time messaging
- **LabourService**: Labour/service provider management
- **ReviewService**: Ratings and reviews
- **NotificationService**: Push notifications

## Running the App

- Use Expo Go app (iOS/Android) to scan QR code from `npm start`
- Or build APK/IPA for production deployment

## Firebase Setup

Firebase is configured for:
- Authentication
- Cloud Storage (profile photos, documents)
- Real-time data synchronization

## Notes

- Roles: Customer and Labour (separate navigation flows)
- Real-time features via WebSocket STOMP protocol
- Location services for service discovery
- Multi-document upload support for worker credentials
