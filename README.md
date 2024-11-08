****Project Overview****

The project is a React frontend application that displays a list of documents in the form of cards. These cards can be reordered, and each card can display an overlay image when clicked. The application is designed with the following key features:

- Mock API: Using MSW to intercept and mock REST API calls.
- LocalStorage Persistence: Data is saved and retrieved from the browser's localStorage, ensuring persistence across reloads.
- Automatic Data Saving: Every 5 seconds, the frontend will save any changes made to the data (if there were changes) to the mock API.
- Drag and Drop: The cards are reorderable via drag-and-drop functionality.
- Loading Spinner: A loading spinner is displayed when the data is being saved, and the user is informed of the time elapsed since the last save.

****Key Components****

**1. App Setup with MSW (Mock Service Worker)**
MSW intercepts network requests, allowing us to mock API calls and return mock data.
LocalStorage is used to store the data, ensuring persistence across page reloads.
**2. Frontend Architecture**
The frontend architecture follows a component-based approach, with each feature being implemented as a self-contained component:

- Card: Represents individual document items in the grid.
- CardGrid: Manages the state of the cards and handles the interaction of the cards, including drag-and-drop and overlay management.
- CardOverlay: Displays a larger view of the card's image when clicked.
  
****Setting Up the Project****

**1. Go into **frontend** package using**
```js
cd frontend
```

**2. Install Dependencies**
First, install all dependencies using Yarn (or npm if preferred):

```js
yarn install
```

**3. Run the Application**
You can run the application using Yarn:

```js
yarn dev
```

This will start the development server, and the application will be available on http://localhost:3000.

**3. API Mocking with MSW**
The mock APIs are set up using MSW. The mock data is stored in the browser’s localStorage to persist across reloads.
The mock APIs (GET, POST, PUT, DELETE) for managing cards are defined in the src/mocks/handlers.ts file.

****Directory Structure****

```js
my-app/
├── public/
│   ├── images/          # Store image thumbnails here (e.g., bank-draft.png, invoice.png)
│   └── data.json        # Example data for testing
├── src/
│   ├── components/
│   │   ├── Card.tsx     # Card component to display individual document
│   │   ├── CardOverlay.tsx # Overlay to show the document image in full
│   │   └── CardGrid.tsx  # Displays a grid of cards
|   |-- services/
|       |__ storage.ts   # Store cards data in the local storage   
│   ├── mocks/
│   │   ├── browser.ts   # Setup MSW service worker
│   │   └── handlers.ts  # Mock API handlers
│   ├── App.tsx          # Main app component
│   ├── index.tsx        # Application entry point
│   ├── styles.css       # Styles for the application
│   └── types.ts         # TypeScript types for cards and other data
└── README.md            # Documentation for running and using the app
```

****Architectural & API Design****

**1. Approach to Architecture**
The architecture is designed to be simple and modular, following React's component-based design principles. The focus was on making the frontend app interactive and responsive to user actions while simulating real API interactions via MSW. Here are the key architectural decisions:

**2. Componentization:**

**Card**: A reusable component that accepts a card's data and handles click events to display the image overlay.

**CardGrid**: Manages the list of cards and the drag-and-drop functionality. This is the parent component that holds the state of the cards and handles user interactions (reordering, adding cards, etc.).

**CardOverlay**: A simple component to show a larger view of the image when a card is clicked.

**3. State Management:**

The state for the cards is managed at the CardGrid level. The list of cards is fetched from a mock API (MSW) and stored in the component's state.
The app also includes state for tracking the loading spinner and time passed since the last save.
Mock API Design:

MSW was chosen because it allows for mocking REST API calls in the browser. It can intercept network requests, and the response can be configured based on the request method (GET, POST, PUT, DELETE).
Data is stored in localStorage to provide persistence across page reloads, making the app functional even without an actual backend.
Handling Automatic Saving:

The frontend saves the data every 5 seconds, but only if there are changes (to avoid unnecessary API calls). A loading spinner is shown during the save operation, and the time since the last save is displayed.
How the Frontend Calls the REST API for Saving
Every 5 seconds, the frontend checks if there are any changes to the data. If there are, it makes a POST or PUT request to save the data to the mock API. The flow is as follows:

Auto-save: The frontend calls the REST API every 5 seconds using the fetch API to persist changes (if any).
Loading Spinner: While the save request is in progress, a loading spinner is displayed to indicate that the data is being saved.
Time Elapsed: A timer shows how long it has been since the last save. This timer is updated every second, and it resets each time the save operation is completed.

****API Design for Mocking with MSW****
Here’s a simple breakdown of the API design:

GET /api/cards: Fetches the current list of cards from localStorage.
POST /api/cards: Adds a new card to the list in localStorage.
PUT /api/cards/:id: Updates an existing card based on its id.
DELETE /api/cards/:id: Deletes a card from the list based on its id.
The mock responses are defined in the src/mocks/handlers.ts file using MSW’s rest API. For example, the GET request fetches data from localStorage, and POST adds new data to it.

