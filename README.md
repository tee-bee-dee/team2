# web-app [ ![Codeship Status for CSE112-GoldTeam/web-app](https://codeship.com/projects/5f33bf40-cb9d-0133-dbda-4a84e368cd36/status?branch=master)](https://codeship.com/projects/59497)

First Run
----------------------------
1. Install [MongoDB](https://www.mongodb.org/downloads)
2. Install [Node.js](http://nodejs.org/download/)
3. Navigate to the web-app directory
4. Install npm dependencies:

        $ npm install
        $ npm install --global gulp

5. Create a folder for the MongoDB server with

        $ mkdir db

6. Use ``gulp`` to run the application (it will automatically start Mongo)
7. Navigate your browser to [http://localhost:4000](http://localhost:4000/)

Push to testing environment
----------------------------
1. Install git and heroku toolbelt (https://toolbelt.heroku.com/)
2. git config --global user.name "John Doe"
3. git config --global user.email johndoe@example.com
4. if want to only temporarily be login to git (http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github)
5. if want permanent storage of git password (https://help.github.com/articles/caching-your-github-password-in-git/)
6. heroku login
7. gulp stage OR gulp stage --test [stage number]


Logging in as Peter
----------------------------
In order to login as peter, use the following credentials

	$ username: peter@enque.com
	$ password: peter
	
The live app can be found here

	$ http://team-fubar.herokuapp.com/
