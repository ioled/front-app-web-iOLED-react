# Frontend Web App iOLED 
[![iOLEDFrontend](https://img.shields.io/badge/iOLED-Webpage-%23783578.svg)](https://www.ioled.cl/)
This repository contains the **iOLED** web application code. This app is made with react and its purpose is that the *user/client* of the company can have access to all the **functionalities** and **information** of their led lighting system device in an integrated system.

## Execution and build npm commands
1. To install the JavaScript libraries used in the project:
`npm install`

2. To run the proyect:
`npm run`

3. To build the project for deploy:
`npm build`

## Project structure
The fundamental code of an application in React is in the **src** folder. Its structure is as follows:

- /src
	- index.js
	-  /images
	-  /actions
		- index.js
	- /reducers
		- index.js
		- deviceReducers.js
		- uiReducers.js
		- userReducer.js
	- /components
		- /Dashboard
			- Dashboard.js
			- DeviceList.js
			- Login.js
			- Navbar.js
			- SimpleBottom.js
		- /Device
			- AliasContainer.js
			- Device.js
			- DeviceMenu.js
			- PlotContainer.js
			- SliderContainer.js
			- StateContainer.js
			- TimerContainer.js
	
		 

