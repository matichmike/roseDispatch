# roseDispatch features

# Drivers can have three types of tasks:
- Pickup: Where and when the driver picks something up
- Dropoff: Where and when the driver drops something off
- Other: Where and when the driver does some other task (like grab a lunch or coffee)

# User Stories
* As a dispatcher, I should be able to create new tasks for a specified driver over a 24
hour / 7 day / 52 week period.
* A task’s time-interval should be between 1-24 hours, but it should not extend across
multiple days.
* If a new task conflicts with existing task times, the application should give me the option
to overwrite the existing conflicting task(s).
* I should be able to delete tasks.
* Assume there are only 3 drivers and the timetable will be different for each driver. The
dispatcher should be able to select a driver via a dropdown to view their timetable.
* As a dispatcher, I want to be able to download a .csv file outlining a specific driver’s
tasks for a given division of time. The valid divisions for which I can generate a driver
report are 2,4,7,14, and 28 days.

# App Deployment
* The app is deployed at Netlify at this [LINK](https://boring-liskov-13d411.netlify.app)

# Data persistence
* Data persistence is not implemented, the data is temporarily stored in the app state using MobX library

# Features not implemented
* Updating existing tasks’ times, descriptions and locations.