# SIT725_s226265671
# SIT725 - Applied Software Engineering

This repository contains my practical work completed for SIT725 - Applied Software Engineering at Deakin University.

The repository includes my Git/GitHub setup activities, programming exercises, and Express.js web server development completed throughout the trimester.


## Technologies Used

- JavaScript
- Node.js
- HTML
- CSS
- Git
- GitHub

---

# Task 2.2P - Express Web Servers

## Overview

In this task, I created my first Express.js web server using Node.js. The purpose of this task was to understand Express, REST APIs, GET requests, and server-side processing.

Developed a simple calculator application that allows users to perform basic mathematical operations:

- Addition
- Subtraction
- Multiplication
- Division

The application receives values through GET query parameters and performs calculations on the server side using Express routes.



# How to Run the Application

## Step 1: Navigate to the Task 2.2P folder

```

cd 2.2P

```

## Step 2: Install dependencies

```

npm install

```

## Step 3: Start the Express server

```

npm start

```

The server will start running at:

```

[http://localhost:3000](http://localhost:3000)

```

Open the above URL in a browser to access the calculator application.



# Calculator API Endpoints

The application uses HTTP GET requests with query parameters to perform calculations.

## Addition

Example:

```

[http://localhost:3000/add?a=10&b=20](http://localhost:3000/add?a=10&b=20)

```

Response:

```

The sum of 10 and 20 is 30

```



## Subtraction

Example:

```

[http://localhost:3000/subtract?a=20&b=5](http://localhost:3000/subtract?a=20&b=5)

```

Response:

```

Result = 15

```


## Multiplication

Example:

```

[http://localhost:3000/multiply?a=6&b=4](http://localhost:3000/multiply?a=6&b=4)

```

Response:

```

Result = 24

```



## Division

Example:

```

[http://localhost:3000/divide?a=30&b=5](http://localhost:3000/divide?a=30&b=5)

```

Response:

```

Result = 6

```



# Features Implemented

- Created an Express.js web server using Node.js
- Used the public folder to serve static files
- Created REST API endpoints using HTTP GET methods
- Used query parameters (`req.query`) to receive user inputs
- Performed calculations on the server side
- Added input validation for invalid values
- Added division by zero handling
- Created an interactive calculator webpage
- Connected the frontend webpage with backend API endpoints


# Git and GitHub

Git was used throughout the development process to manage the project version history.

The following Git activities were completed:

- Repository creation
- Adding files
- Creating commits
- Pushing code to GitHub
- Maintaining project updates

A `.gitignore` file was also added to prevent unnecessary files such as `node_modules` and environment files from being uploaded.



# Author

Sanika T C

SIT725 - Applied Software Engineering  
Deakin University

