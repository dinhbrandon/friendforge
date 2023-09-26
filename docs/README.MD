# FriendForge
![logo](logo.png)
---

## Team:
* Brandon Dinh
* Ramon Duarte
* Ellen Nulty
* Taylor Harris

## Design
- [Data Models](models.md)
- [API Endpoints](api.md)
- [GHI WireFrame](ghi-wireframe.md)

## What is FriendForge?
FriendForge is a friend-group finding application. Making friends can be hard but FriendForge helps users to connect with like-minded people. Users fill out their profiles and then enter The Forge. Here, users choose the focus of the group they would like to join. Groups can be focused on interests such as reading, hiking, gaming, and much more. Options are nearly endless! Users are placed into groups of five based on their desired focus. Within a group, users are able to chat and connect with new friends! There's no limit to how many groups users can join, so you are free to connect with new friends who share whatever interests you may have!

## Functionality
- Users are able to create an account with FriendForge to begin connecting with new friends
- Upon logging in, users create a profile where they are able to write an "about me", add a profile photo, and update their location.
- Users choose from a list of interests that will be displayed on their profile and will help to determine compatibility with future friends
- "The Forge" is our page for creating friendship groups. Each group has a focus (eg. gamers, hikers, readers).
- Once users have their profile and interests set up, they are able to go to "The Forge" where they select the focus of the group they would like to join. Users are then placed into groups of up to five people based on group focus type.
- Users can join multiple groups and can view all their groups on their "My Groups" page
- Users can view their individual group pages which includes group name and photo, group members, and a chat so they can connect with one another
- On profile pages, users can view their profile information
- Admin accounts are able to add groups, interests, and group focuses


## How to open the application
Please clone this repository to your local machine.
Once you have done so, CD into your project directory and run the following commands to start the Docker containers to properly run the servers
- docker volume create project-data
- docker-compose build
- docker-compose up
This will create and start all the docker containers to be able to run this application.
You should now be able to navigate to [localhost3000](http://localhost:3000/) within your browser.
