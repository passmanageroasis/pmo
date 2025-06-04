# Project setup
Here you will learn how to set up the project for further development

## Prerequisites: 
- [Node.js](https://nodejs.org)
- [NPM](https://www.npmjs.com) (comes with node.js) or [Yarn](https://classic.yarnpkg.com) (preferred)

## Install dependencies
After cloning the repository, you need to install the project dependencies using the terminal by using `npm install` or `yarn` inside the subrepositories; `/api` and `/client`.

## Setting up environment variables (`.env`)
In both `/api` and `/client`, copy the content of `.env.example` into a file named `.env`. Here you should modify the variables to suit your setup.

## Running the development servers
In both `/api` and `/client`, you should be able to run `npm run dev` or `yarn dev`. You will see which urls the servers are running on in the terminal.

>[!NOTE]
> To preview and develop in the tauri version of the client app, run `npm run tauri dev` or `yarn tauri dev`.
