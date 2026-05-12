# File Upload Application

> A React/Next.js application demonstrating multipart form data handling, file validation, upload progress tracking, and a drag-and-drop interface.

---

## Project Overview

This application implements a fully-featured file upload experience in Next.js. Users can drag and drop files or browse to select them, with real-time validation for file type and size, a live upload progress bar, and server-side handling via a custom API route using Formidable.

---

## Technology Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js (Pages Router) |
| **Language** | JavaScript (JSX) |
| **Form Handling** | React Hook Form |
| **File Upload UI** | react-dropzone |
| **HTTP Requests** | axios |
| **Server-side Parsing** | formidable |
| **Styling** | CSS Modules / inline styles |

---

## Setup Instructions

### 1. Create a new Next.js project
npx create-next-app file-upload
cd file-upload

### 2. Install required dependencies
npm install react-hook-form formidable axios react-dropzone

### 3. Set up the project structure
file-upload/
├── pages/
│   ├── index.js        # Main upload form UI
│   └── api/
│       └── upload.js   # Server-side API route for file handling
├── public/
└── styles/

### 4. Start the development server
npm run dev

### 5. Open in your browser
http://localhost:3000

---

## Application Structure
file-upload/
├── pages/
│   ├── index.js          # Upload form — UI, validation, drag & drop, progress
│   └── api/
│       └── upload.js     # API route — multipart parsing with Formidable
├── public/               # Static assets
└── styles/               # CSS styling

---

## Key Components

### `pages/index.js`
**Purpose:** The main client-side upload interface.  
**Implements:**
- File upload form built with **React Hook Form**
- **File type validation** — restricts accepted formats (e.g. images, PDFs)
- **File size validation** — rejects files exceeding the size limit
- **Drag and drop interface** — powered by `react-dropzone`
- **Upload progress tracking** — uses `axios` `onUploadProgress` callback to display a live progress bar
- Error and success state display

### `pages/api/upload.js`
**Purpose:** The server-side API route that receives and processes uploaded files.  
**Implements:**
- Disables Next.js default body parser to allow multipart form data
- Parses incoming file data using **Formidable**
- Handles file storage server-side
- Returns upload confirmation or error response

---

## Features Implemented

- **Multipart Form Data Handling:** Files are sent as `multipart/form-data` via `axios` and parsed server-side by Formidable through a custom Next.js API route.
- **File Type Validation:** Client-side checks restrict uploads to accepted MIME types; invalid file types are rejected before upload begins.
- **File Size Validation:** Files exceeding the configured size limit are caught during validation and display an error message to the user.
- **Upload Progress Tracking:** `axios` `onUploadProgress` provides real-time byte counts, rendered as a progress bar that updates as the upload proceeds.
- **Drag and Drop Interface:** `react-dropzone` provides a droppable zone where users can drag files directly from their file system, with visual feedback on hover.
- **Form State Management:** React Hook Form manages form registration, validation triggers, and error display with minimal re-renders.

---

## How It Works

### Client Side (`index.js`)

1. `react-dropzone` wraps the upload area and handles drag-over, drop, and click-to-browse interactions.
2. On file selection, React Hook Form validation runs — checking file type and size.
3. If valid, `axios` posts the file as `FormData` to `/api/upload`.
4. The `onUploadProgress` callback updates a percentage state, which drives the progress bar UI.
5. On success or failure, a status message is shown.

### Server Side (`api/upload.js`)

1. The Next.js default body parser is disabled (`export const config`).
2. Formidable parses the incoming multipart request.
3. The uploaded file is saved to a temp or designated directory.
4. The API responds with a success message or an error.

---

## Testing the Application

| Scenario | Expected Result |
|---|---|
| Drag and drop a valid file | File appears in the upload zone, ready to submit |
| Select a file via browse | Same as above via file picker |
| Submit a file of the wrong type | Validation error shown, upload blocked |
| Submit a file exceeding size limit | Validation error shown, upload blocked |
| Submit a valid file | Progress bar fills, success message shown |
| Check the server response | API returns confirmation with file details |

---

## Resources

- [React Hook Form Docs](https://react-hook-form.com/)
- [react-dropzone Docs](https://react-dropzone.js.org/)
- [axios Docs](https://axios-http.com/docs/intro)
- [Formidable Docs](https://github.com/node-formidable/formidable)
- [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [MDN — FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [Project Source Code](https://github.com/syangche/React_Practicals.git)
