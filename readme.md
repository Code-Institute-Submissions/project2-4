# World Cup Finals Dashboard

## Overview

### What is this website for?

This website is designed to provide an overview of some of the major statistical information related to FIFA World Cup Finals since the inception of the competition.

### What does it do?

The website features a number of charts and information boxes to aid the display of various statistics related to the World Cup Finals. A couple of the charts are interactive and will affect the information displayed elsewhere when a particular part is clicked.

### How does it work?

Some of the charts display related information, such as goals scored. These charts show overall stats until the user clicks on a particular segment, at which point the display will change on a related chart to show updated information. Others simply display standalone statistics. Users can take a virtual tour of the dashboard to get a better idea of how the charts work by clicking the button at the top of the page.

## Demo

You can see the live website [here](https://world-cup-stats.herokuapp.com/).

## Features

- Responsive design ensures the website displays well on any screen size
- See accurate statistics from every World Cup Finals tournament up to 2014
- Certain clickable charts and info boxes allow for user interaction
- Clicking the "Start Tour" button provides a step-by-step guide to how the charts work

## Technologies used

- HTML5
- CSS3
- JavaScript
- Python
- Bootstrap
- D3.js
- DC.js
- Crossfilter.js
- Intro.js
- Keen Dashboards
- Flask

## Testing

### Possible console errors

It is possible that if a user has a pop-up blocker or adblocker enabled on any of their browsers that the console will display a couple of errors trying to load some JavaScript files. To get rid of the errors the user will have to turn off the blocker.

## Deployment

To deploy the website I mainly used Heroku but also Git Bash to upload files to GitHub so the code can be easily inspected. Firstly, I created an "app" on Heroku server that would host my website and then made sure I was logged in from the command line. Next, I connected my local repository to the remote Heroku branch and pushed or uploaded all the files to that location using Git Bash. In the end the local project was connected to two remote repositories - one on Heroku and one on GitHub.

In order that my website could display the statistics from my database I had to enable an add-on called **mLab** on my World Cup Finals "app", which would act as a cloud database that makes use of MongoDB management system. Then I set up a new 'collection' within my mLab account that would hold the statistical data and finally I imported a csv file containing the data to mLab.

As a final step I had to make sure I updated the Environment Variables in my main project python file to reflect the additional remote connection settings (Config Vars) that are provided by mLab and stored in the settings tab of my Heroku app (MONGODB_URI and MONGO_DB_NAME). Of course the python file had to then be uploaded again to make sure the changes were live and the website could load the stats from the cloud database.

## Wireframing

I used **Balsamiq Mockups** to create a wireframe/storyboard for my website and the mockup file can be found in the *docs* folder.

## Credits

### Statistics

Courtesy of FIFA.com and the World Cup finals section of [Wikipedia](https://en.wikipedia.org/wiki/List_of_FIFA_World_Cup_finals)