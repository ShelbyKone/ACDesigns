# ACDesigns

ACDesigns is my senior capstone project for my BS in Computer Science. It is meant to be a fun image posting / social site for
players of Animal Crossing: New Horizons.

The entirety of this application was written by me and is shared here as a demonstration of my skills aquired while attaining my degree.

## Development Stack

### Front End
* Written in Node.js using the Vue.js javascript framework.
* Stylized using Vuetify as the CSS framework.
* State management handled using Vuex.
* Routing handled using Vue Router.
* Authentication done with Google Firebase Authentication.

### Back End
* Written in Node.js using the Express.js application framework.
* Conforms to REST API principles.
* Stores data in a MongoDB database, using Mongoose for object modeling.
* Stores uploaded images in Amazon Simple Storage Service (S3).
* Verifies authentication tokens using the Firebase Admin SDK.

### Hosting
* AWS Elastic Beanstalk used to host both server and front end.
* AWS CodePipeline used to automate deployment.
* Domain registered through Amazon Route 53.
* Public SSL certificate provisioned by AWS Certificate Manager.

## Application Features

### Profile Page
* Authenticated users have a custom profile page.
* This profile includes an "about me" section, the users posted designs, and the users favorited designs.
* Users can also upload a profile picture.

### Design Posts
* Users can post their designs with a custom title, description, tags, and image.
* All designs are able to be favorited by others while displaying the number of favorites they currently have.
* Each design has a social section that allows users to quickly share the designs on social media.

### Popular Page
* The home page of ACDesigns displays the most popular designs, that is, the designs with the most favorites.
* Users can also choose to sort by "new" if they would like to see the most recently posted designs.
* The popular page includes a "load more" button so that the user can scroll through designs endlessly, for as long as they like.

### Search Engine
* The most important feature of ACDesigns is the search engine.
* Users can search using as many words as they like, then the application will return all designs that contain one or more of those words in the title, tags, or both.
* ACDesigns uses a "ranked" search algorithm, meaning designs that include the most search terms will be displayed first.
