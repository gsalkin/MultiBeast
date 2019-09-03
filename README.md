<div align="center">
<img src="client/public/images/MultiBeast_skull.png" width="400"/>

MultiBeast
===
</div>

>_And she comes to me in this lonely land And looks down from the multi-beast On which she rides like the wind The wind from beyond the mountain_ \- The Helping Phriendly Book

## A coverage manager for the Aspen Ideas Festival

MultiBeast is a web application that fuses an Express backend with a ReactJS front-end. Written with much ❤️. The core functionality involves scraping the ArtsVision API for sessions during respective years of the Aspen Ideas Festival. These are stored in MongoDB and fed through an Express API to a React front-end.

For efficient deployment, both are shipped as a combined package where a `Build` folder is served by Express as a static folder.

Setup
---
1. Clone the project.
2. To install the API server, from the top of the project run:

        npm install

3. In order to run the API server, you will need to supply variables in a `.env` file. Use the `.env.example` file as template.
4. To start the Express server:

        node app.js


4. The React front-end is derived from the `create-react-app` project. Install the React dependencies:

        cd client && npm install
    
5. To run the React front-end in development:

        npm start

Deployment
---
For simplification, the current app is shipped as a single package. You can test what this deployment package will look like by running

        npm run staging

When dpeloyed to a server, it should run

        npm run production

The app is optimized for Heroku. `package.json` contains a `heroku-postbuild` command which will properly bundle the `build` folder used in production.

Server Architecture
---
The backend of Multibeast is a straight forward Express-based API server. It works by pulling from a MongoDB which stores ArtsVision sessions in a custom schema. 

### Important Files

#### `apiEngine.js`
This file allows for the core event loop which access ArtsVision from the REST API endpoint. It pulls data and compares it to existing data in the database based on two criteria:

1. The event is newly added (checked by cross-referencing the `EventID` value of the entity).
2. The event's `lastEdit` value has changed from the existing date value in the database, indicating a change has been made.

`apiEngine` is envoked in the core `app.js` file on a 10 minute timer.

#### `routes.js`
Express routes for the API and authentication. Note many of these endpoints are not currently used as they require extensive complexity to wire for the multiple permutations of data.

#### `auth.js`
Contains `passport.js` strategies for user creation and login. The current authentication system uses JSON Web Tokens, but can be replaced with user session cookies.

#### `dataWatcher.js`
A simple script to monitor changes to sessions. This connects to a SlackBot called **MultiCub, Spawn of MultiBeast** which alerts slack users of changes made to sessions.

#### Models
The models folder contains `Mongoose` schema for objects entered into the database. This includes sessions and users.

**Note: these schemas must be changed if session objects are to have new data attributes added.**

Client Architecture
---
The front-end architecture is based on a standard `create-react-app` structure. It includes webpack scripts and a proxy to the Express server for API access.

### CSS
CSS is provided through the [Bootstrap](https://getbootstrap.com/) CDN. Bootstrap is used for rapid iteration and ensured mobile support. Using Bootstrap is optional, but would require extensive reconstruction. The `<link>` is pulled in on `index.html`

### Important Files
#### `filterData.json`
This is a flat file located in the `src` folder. Essentially, it is custom data used to properly label dropdowns for the filtering functionality. Ideally, this will be dynamically generated based on the data streamed into the front end.

#### `components`
The components folder includes all views and reusable components for the front end. Core components include `App.js`, `Router.js`, and all Session components.