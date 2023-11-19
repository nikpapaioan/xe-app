# Property Classified App

This is a React app that allows users to create and submit property classifieds. Users can enter the title, type, area, price, and extra description of their property, and the app will send the data to a server using axios.

## Features

- The app uses React hooks to manage the state of each input field.
- The app uses axios to make HTTP requests to the server.
- The app validates the input fields and requires them to be filled before submitting the form.
- The app displays a confirmation message or an error message depending on the server response.

## Installation

To install the app, you need to have Node.js and npm installed on your machine. Then, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory and run `npm install` to install the dependencies.
3. Run `npm start` to start the development server.
4. Open `http://localhost:3000` in your browser to see the app.

## Usage

To use the app, follow these steps:

1. Fill in the input fields with the details of your property. You can choose from four types of property: Rent, Buy, Exchange, or Donation.
2. Click on the Submit button to send the data to the server.
3. Wait for the confirmation message or the error message to appear on the screen.

### Packages Used

This project utilizes the following packages:

- `react-hook-form`: A library for managing forms in React using hooks.
- `react-select`: A flexible and feature-rich dropdown/select library for React.
- `react-toastify`: A library for displaying toast notifications in React applications.
- `axios`: A library for making HTTP requests in JavaScript applications.
- `tailwindcss`: A utility-first CSS framework for styling React components.
