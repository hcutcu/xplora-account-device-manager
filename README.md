# Xplora Account Device Manager

## Overview

This repository contains a full-stack application designed to manage accounts and their associated devices. The system is built using a federated GraphQL architecture with microservices, and a simple Expo app to interact with the system. The project demonstrates the use of Apollo Federation, Docker, and React Native (Expo) to create a modular and scalable system.

## Project Structure

The project is composed of the following services:

1. **Account Service**: Manages account-related data (e.g., name, email).
2. **Device Service**: Manages device-related data and links each device to a specific account.
3. **Federation Service**: Acts as the GraphQL gateway that federates the Account and Device services, exposing a unified GraphQL schema.
4. **Expo App**: A simple frontend application that interacts with the federated GraphQL API to manage accounts and devices.

## Features

- **Federated GraphQL Gateway**: Aggregates schemas from the Account and Device services using Apollo Federation.
- **Account Extension**: Extends the Account service to include a list of devices for each account.
- **Expo App**: Allows users to fetch and display a list of accounts, create new accounts and devices, and display the list of devices associated with each account.

## Setup and Running the Project

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js and npm installed on your machine.

### Cloning the Repository

```sh
git clone https://github.com/hcutcu/xplora-account-device-manager.git
# or with gh cli
# gh repo clone hcutcu/xplora-account-device-manager

cd xplora-account-device-manager # Change to the project directory
```

### Running the Services

1. **Build and Start the Services:**

   ```sh
   docker-compose up --build
   # This command will build and start the Account, Device, and Federation services.
   # if docker-compose is not installed, and using newer version of docker, use `docker compose up --build` instead
   ```

2. **Start the Expo App:**
   ```sh
   cd account-device-manager
   npm install
   npm start
   # This command will start the Expo app. You can then open the app in an Android emulator, iOS simulator, or a physical device using the Expo Go app.
   ```

## Development

### Backend Services

- **Account Service:** Located in the `account-service` directory.
- **Device Service:** Located in the `device-service` directory.
- **Federation Service:** Located in the `federation-service` directory.

Each service has its own Dockerfile and can be run independently using Docker.

### Expo App

- Located in the `account-device-manager` directory.
- Uses Expo for development and testing.

  #### Accounts Screen

  - List of Accounts - When the app loads, the Accounts screen displays a list of all accounts.
  - Create New Account: At the bottom of the screen, there is a button to create a new account. Clicking this button navigates to the Create New Account screen.
  - Delete Account: Each account item in the list has a delete button on the right side. Clicking this button will prompt a confirmation dialog. If confirmed, the account and its associated devices will be deleted.
  - View Account Devices: Clicking on an account item navigates to the Account Devices screen, which lists all devices associated with the selected account.

  #### Create New Account Screen

  - Form: This screen contains a form to input the name and email for the new account.
  - Submit: After filling out the form, clicking the submit button will create the new account and navigate back to the Accounts screen.

  #### Account Devices Screen

  - List of Devices: This screen displays a list of all devices associated with the selected account.
    -Create New Device: At the bottom of the screen, there is a button to create a new device for the account. Clicking this button navigates to the Create New Device screen.
    -Delete Device: Each device item in the list has a delete button on the right side. Clicking this button will prompt a confirmation dialog. If confirmed, the device will be deleted.

  #### Create New Device Screen

  - Form: This screen contains a form to input the name for the new device.
  - Submit: After filling out the form, clicking the submit button will create the new device and navigate back to the Account Devices screen.

### GraphQL API

The federated GraphQL API is exposed at `http://localhost:4000/graphql`. You can use tools like Apollo GraphQL Studio or Postman to interact with the API.

### Example Queries

- Fetch Accounts and Devices:

  ```graphql
  query {
    accounts {
      id
      name
      email
      devices {
        id
        name
      }
    }
  }
  ```

- Create a New Account:
  ```graphql
  mutation {
    createAccount(name: "John Doe", email: "john.doe@example.com") {
      id
      name
      email
    }
  }
  ```
- Create a New Device:

  ```graphql
  mutation {
    createDevice(name: "iPhone 12", accountId: "1") {
      id
      name
    }
  }
  ```

### Generating Types and Hooks

To update schema types and generate TypeScript types and React hooks, run the following command:

```sh
npm run generate
```
Everytime you add a new query or mutation in `queries` folder or if the schema changed you need to run `npm run generate` to update the types and hooks


## Documentation

### Account Service

- Port: 4001
- GraphQL Endpoint: /graphql
- Description: Manages account-related data.

### Device Service

- Port: 4002
- GraphQL Endpoint: /graphql
- Description: Manages device-related data and links each device to a specific account.

### Federation Service

- Port: 4000
- GraphQL Endpoint: /graphql
- Description: Aggregates schemas from the Account and Device services using Apollo Federation.

### Notes

- Ensure that Docker and Docker Compose are installed and running on your machine.
- The Expo app can be tested on Android, iOS, and web platforms.
- The federated GraphQL API allows querying accounts and their associated devices in a single request.

### Conclusion

This project demonstrates the use of Apollo Federation, Docker, and React Native (Expo) to create a modular and scalable system for managing accounts and devices. The setup and running instructions provided should help you get the system up and running quickly.

For any issues or questions, please feel free to reach out.
