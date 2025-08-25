# Blender AI Assistant

A desktop application that uses a chat-based AI to control Blender, making 3D creation more accessible.

![Project Banner](public/placeholder.svg)

## Overview

Blender AI Assistant is a powerful desktop application that revolutionizes the 3D design workflow. It provides a user-friendly, chat-based interface to control Blender using natural language commands. This app is designed for both beginners who are intimidated by Blender's steep learning curve and for experienced artists who want to speed up their workflow. By simply typing what you want to create or modify, the AI translates your words into actions within Blender.

## Key Features

- **AI Chat Interface:** Interact with Blender using simple, conversational language. No need to memorize complex shortcuts or navigate intricate menus.
- **Guided Setup Wizard:** A step-by-step process to connect the application with your Blender installation and configure the AI service.
- **Cross-Platform Compatibility:** Built with Electron, the application can be packaged for Windows, macOS, and Linux.
- **Modern UI:** A sleek and intuitive user interface built with React, TypeScript, and shadcn/ui.

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Desktop:** Electron
- **Backend/Integration:** Node.js (for IPC with Blender)
- **Other:** GSAP (for animations)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- Blender (the `blender` command must be available in your system's PATH)

### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project directory.
3.  Install the required dependencies using npm:
    ```sh
    npm install
    ```

## How to Run the Application

To run the application in development mode, you'll need to run the Vite development server and the Electron app at the same time. A convenient script is provided in `package.json` to handle this.

```sh
npm run dev:electron
```

This command will start the Vite server on `http://localhost:8080`, launch the Electron application, and open the browser's developer tools.

## Project Structure

Here is a brief overview of the project's directory structure:

```
/
├── electron/         # Contains the Electron main process files
├── public/           # Static assets like images and icons
├── src/              # The source code for the React application
│   ├── components/   # Reusable UI components (built with shadcn/ui)
│   ├── pages/        # Application pages corresponding to routes
│   ├── services/     # Modules for interacting with APIs or the Electron backend
│   ├── hooks/        # Custom React hooks
│   └── lib/          # Utility functions and libraries
├── package.json      # Project metadata, dependencies, and scripts
└── vite.config.ts    # Configuration file for Vite
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
