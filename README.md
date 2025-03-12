# Getting Started with Create React App and Firebase

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# Configure your Firebase

In this project There are two firebase services used which are Firestore and Authentication

To use both services, we first need to create a project and a database on Firebase

## Add a project

To add a project, you need to make sure that you are logged in into your Google account, and navigate to [Firebase Console](https://console.firebase.google.com/), and click Create a project. Once you click it, enter your project name, accept the Firebase terms, and click continue. Once done, you will be prompted to enable Google analytics. In this case, we do not need it, so feel free to leave it. Once all the steps are done, you will be redirected to your project page. 

## Create database

On the sidebar of your project page, find Firestore database to navigate to cloud firestore page, and click on create database. Once you click it, you will be asked to start the database in production or test mode. In this case, choose start in test mode, click next, and on the next page, click on enable. Once done, This will create an empty database for our project.

## Integrate Firebase to our App.

To integrate Firebase to our App, we need to configure it first. The first thing that we need to do is navigate to our project app and click on "</>" icon to configure our Firebase project for our app. Once you click it you will be prompted to register a name for your app, and click on register. Once you register your app, you will get your firebaseConfig object on your screen. Copy it as we need it later to initialize Firebase, and click continue to console.

## Initialize Firebase

To initialize Firebase on our App, we need to create a firebase.js file in your "src" directory of our React App, and add these following lines of code:

- import { initializeApp } from "firebase/app";
- import { getFirestore } from "firebase/firestore";

Here, paste your firebaseConfig that you have copied earlier, and add these following lines of code below your firebaseConfig:

- const app = initializeApp(firebaseConfig)
- const db = getFirestore(app)

- export {db}

## You can now start using firebase services in your app. 