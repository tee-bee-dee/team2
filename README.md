# Enque

Setup
----------------------------
1. Setup Account with [mLab](https://mlab.com/) or setup local Mongo for development.
2. Copy mongoDB access point into app.js:

        $ var mongoURI = process.env.MONGODB_URI || 'YOUR MONGODB CONNECTION ON mLAB';

2. Install [Node.js](http://nodejs.org/download/)
3. Navigate to the root directory
4. Install npm dependencies:

        $ npm install
        $ npm install --global gulp

6. Use ``gulp`` or ``npm run build`` to run the application
7. Navigate your browser to [http://localhost:4000](http://localhost:4000/)

Note: Sometimes, BrowserSync doesn't load the page, so if yours is stuck loading, just refresh the page!

Logging in as Peter
----------------------------
In order to login as peter, use the following credentials on the live application.

	username: peter@enque.com
	password: peter

The live app can be found [here](http://tbd-team2.herokuapp.com/).

For local development, go into Mongo and set company owner value `peter` to `true` to access Peter's dashboard.

Slack Integration can be found here

	tee-bee-dee.slack.com

	username: cse112tbd@gmail.com
	password: cse112ta
	
The TA account has access to `appointments`, `checkin` and `dev` channel, which display scheduled appointments Slack notifications, check-in notifications, and Travis integration for builds.

Travis
----------------------------
Go to the [Travis CI](https://travis-ci.org/tee-bee-dee/team2) website to view build history.

Click the restart button on the latest build to rebuild it.

Documentation
----------------------------
To build documentation, run ``gulp apidoc``.

For documentation regarding app features, visit the [Wiki](https://github.com/tee-bee-dee/team2/wiki).

For documentation regarding the back-end, visit the [docs page](https://tbd-team2.herokuapp.com/docs/).

Tests
----------------------------
``npm run test``: run both unit and e2e
``npm run e2e``: run only e2e tests
``npm run unit``: run only unit tests

Code Climate Test Coverage
----------------------------
Go to [Code Climate](https://codeclimate.com/github/tee-bee-dee/team2) to view code coverage of application, as well as test coverage.

Production Build
----------------------------
Run ``npm start`` to run production application.

Facebook Chat Bot
----------------------------
Graders, check out presentation slides for video of demo. Cannot make bot public. However, repository is available [here](https://github.com/tee-bee-dee/enquechat).
