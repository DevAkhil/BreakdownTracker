# Breakdown Tracker - ASP.NET Core Web API with React

---

### Overview:
Breakdown Tracker is an application designed to track breakdown incidents. It utilizes ASP.NET Core for the backend API and React for the frontend user interface. The WEB API follows Clean Architecture and the Repository Pattern, with Entity Framework Core handling database operations using Code First approach.

### Requirements:
- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (installed automatically with Node.js)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) / [Visual Studio Code](https://code.visualstudio.com/) 
### YouTube Video:
[![Breakdown Tracker Demo](https://i.imgur.com/IwPeAVt.png)](https://www.youtube.com/watch?v=_P3oEPLy9xc)

[Watch a demo of Breakdown Tracker in action on YouTube.](https://www.youtube.com/watch?v=_P3oEPLy9xc)


### Installation:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/DevAkhil/BreakdownTracker.git
    cd BreakdownTracker
    ```

2. **Backend Setup (Visual Studio 2022):**
    - Open Visual Studio 2022.
    - Click on "Open a project or solution".
    - Navigate to the `BreakdownTracker` directory of your cloned repository and select the `.sln` file.
    - Ensure the connection string in `appsettings.json` points to your local database.
    - Build the solution to restore dependencies.
    - Apply migrations to create the database schema (Optional - The API runs EnsureCreated on start so this is not needed):
        - Open Package Manager Console (View > Other Windows > Package Manager Console).
        - Set Default Project to the project containing the DbContext (`Infrastructure`).
        - Run the following command:
            ```
            Update-Database
            ```
    - Set BreakdownTracker.API as the start-up project.
    - Start the backend API by pressing F5 or clicking on the Start button in Visual Studio.

3. **Frontend Setup:**
    - Open a new terminal window.
    - Navigate to the `frontend (breakdowntracker.ui)` directory:
        ```bash
        cd breakdowntracker.ui
        ```
    - Ensure the base URL in the src/Redux/ActionCreator.js points to the correct backend API URL.
    - Install dependencies:
        ```bash
        npm install
        ```
    - Start the React development server:
        ```bash
        npm start
        ```

4. **Access the Application:**
    - Once both the backend API and frontend server are running, you can access the application by navigating to `http://localhost:3000` in your web browser.

### Usage:
- The React frontend provides a user interface to interact with the Breakdown Tracker backend API.
- Users can perform CRUD operations on breakdown records, including creating new breakdown incidents, viewing existing ones, and updating information as needed.
- Ensure the backend API is running while using the frontend to ensure proper functionality.

### Additional Notes:
- The backend API follows Clean Architecture and utilizes the Repository Pattern for separation of concerns and maintainability.
- Entity Framework Core is used for database operations, following the Code First approach for database schema generation.

### Contributors:
- [Akhil Ishwarlaal](https://github.com/DevAkhil)

