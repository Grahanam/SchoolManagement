# School Management API

A Node.js API for managing school information and retrieving schools sorted by geographical proximity using SQLite.

## Features

- Add new schools with validation
- List schools sorted by distance from given coordinates
- SQLite database (file-based, no external DB required)
- Input validation using Joi
- Haversine formula for distance calculation
- Error handling middleware

## Installation

### Prerequisites

- Node.js (v18+)
- npm
- Git

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/school-management-api.git
   cd school-management-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### API Documentation

1. Add School
   # Endpoint
   # POST /api/addSchool

Request Body:

```bash
  {
 "name": "City High School",
 "address": "123 Education Street",
 "latitude": 40.7128,
 "longitude": -74.0060
}
```

Success Response:

```bash
{
 "message": "School created successfully",
 "schoolId": 1
}
```

2. List Schools by Proximity

# Endpoint

# GET /api/listSchools?latitude=40.7128&longitude=-74.0060

Success Response:

```bash
[
  {
    "id": 1,
    "name": "City xyz School",
    "address": "123 xyz Street",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "distance": 0
  }
]
```
