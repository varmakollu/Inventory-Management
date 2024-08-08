# Inventory Management Website

This is an Inventory Management Website built with Next.js and Firebase. It allows you to add, categorize, and manage items in your inventory. This README will guide you through the setup and usage of the project.

## Features

- **Add Item**: Add new items to your inventory with the required fields.
- **Categorize Item**: Organize items by categories.
- **Manage Quantity**: Keep track of the quantity of each item.

## Requirements

- Node.js (v12.x or later)
- Firebase account

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/varmakollu/Inventory-Management.git
   cd Inventory-Management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Create a new project in the Firebase console.
   - Enable Firestore in the Firebase console.
   - Enable Firebase Authentication (use Email/Password or any preferred method).
   - Obtain the Firebase configuration object from your Firebase project settings.


## Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

## Project Structure

- `app/`: Next.js pages.
- `components/`: React components used in the application.
- `data/`: Categories Index page.

## Adding an Item

To add an item, navigate to the "Add Item" page and fill in the following fields:

- **Category**: Select a category for the item.
- **Item Name**: Enter the name of the item.
- **Quantity**: Enter the quantity of the item.

Click the "Add Item" button to save the item to the database.

## Firebase Configuration

In `/firebase.js`, you will find the Firebase configuration and initialization:

```javascript
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
```

## Authentication

Firebase Authentication is used to secure the application. Users must sign in to add or manage inventory items.

## Deployment

To deploy the application, follow these steps:

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the application:**

   ```bash
   npm start
   ```

For deployment on platforms like Vercel, follow their specific deployment instructions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.