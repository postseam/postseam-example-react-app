# postseam-example-react-app
Frontend application for Postseam's example app.


## Background
As part of Postseam's
[How to Build Saas Applications](https://blog.postseam.com/tag/how-to-build-saas-applications/) series, we will be
creating a basic ecommerce application. This repository contains Postseam's example frontend application, built using React. 
This application will be used develop our SaaS application and will be extended to add new functionality. 

## Using the package.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### Deploying Our Application

We use Firebase Hosting to serve our application. In order to do this for your application, you'll need to follow a few steps.

1. Copy the `firebase.json` file in this repository. You shouldn't need to make any changes here.

2. Add secrets to your GitHub repository to be used for GitHub Actions. We've used a GitHub environment for our example.

3. Install the Firebase CLI: `npm install -g firebase-tools`

4. Run the init command to setup Firebase Hosting for your repository: `firebase init hosting:github`

5. Finally, update the GitHub Workflow files to reference the secrets you created (be sure to follow the TODO in our example).
