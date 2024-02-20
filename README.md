# WebflowCustomCode-Framework
A framework designed for the development of custom Webflow code, offering a great developer experience. Integrates with Firebase as the backend solution, providing Cloud Functions to create APIs and Cloud Hosting to serve the custom code. Includes a development environment for Live Preview to visualize and test custom code real-time.

## Prerequisites

## Framework Stack

### Front-End
**Typescript**: Writing type-safe code.

**React**: Building re-usable UI components.

**TailwindCSS**: To style your components with ease.

### Back-End

**Firebase Hosting**: To serve custom code.

**Firebase Cloud Functions**: To create scalable API's.

**Firebase Real-Time Database**: An easy scalable database to work with and integrates with other firebase services.

**Firebase Authentication**: An easy way to handle authentication.

## Installation
Clone this repository to your desired location.

```git clone https://github.com/<github_username>/WebflowCustomCode-Framework.git```


Go into the root directory.

```cd WebflowCustomCode-Framework```

Run this command while you're in the root directory.

```npm i```

After it's fully installed, go into the functions folder.

```cd functions```

Run this command while you're in the functions folder.

```npm i```

After it's fully installed, go back to root directory.

```cd ..```

Run the development environment.

```npm run dev```

## Project Structure

### Folders
**SRC Folder**: This folder will contain your front-end custom code (TSX).

**Production Folder**: This folder will contain your production ready files. When you deploy your code to production, it will deploy files from this folder. You do not need to touch this folder.

**Development Folder**: This folder will contain your development files. You do not need to touch this folder.

**Scripts folder**: This folder contains the scripts that the framework will use to automate tasks. Do not touch this folder if you do not know what you're doing.

### Files
These are the only files you need to worry about.

**WCCF.config.js** (acronym for Webflow Custom Code Framework): This file will contain the configuration details for the framework. **You are required to provide your firebase project name in this configuration to link the framework to your firebase back-end**.

## Commands
All commands shouldn be ran in the root directory.

```npm run dev```
Run the development environment to live-preview your custom code.

```npm run deploy-production```
Deploy your custom code to the back-end so it can be used for production.
