# Real-Time Temperature Monitoring System

This is a real-time temperature monitoring system that processes and visualizes temperature data in real-time using a modern microservices architecture.

![Demo Screenshot](/frontend/public/demo.png)

![Demo Gif](/frontend/public/demo.gif)


## Architecture Overview

The system uses the following technologies:
- **Frontend**: React.js for a responsive user interface.
- **Backend**: Node.js with Express.js to handle data processing and WebSocket communication.
- **Database**: MongoDB for storing temperature data.
- **Message Broker**: Redis for real-time communication and data distribution.
- **Workflow Automation**: **n8n** for processing the temperature readings and determining the status.
- **Docker**: All services are containerized and orchestrated using Docker Compose.

### Key Workflow Integration:
- The **Backend** generates a temperature reading.
- The **Backend** stores the raw reading in **MongoDB**.
- The **Backend** emits the raw reading to the **Frontend**.
- The **Backend** sends the raw reading to the **n8n webhook**.
- **n8n** processes the temperature data and determines whether the status is **NORMAL** or **HIGH**.
- **Backend** updates **MongoDB** with the processed data.
- **Backend** emits the processed reading to the **Frontend**.
- The **Frontend** displays both raw and processed data.

## Prerequisites

Before running the system, ensure that you have the following installed:
- Docker
- Docker Compose

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dubey-supriya-270/temperature-monitor.git
   cd docker

2. Build and start the services using Docker Compose:
    ```bash
    docker-compose up -d

3. Access the services:
- The **Frontend** will be available at [http://localhost:3001](http://localhost:3001).
- The **Backend** will be running and listening for requests and WebSocket connections.
- The **MongoDB** instance will be available on port `27017` (accessible within the Docker network).
- The **Redis** instance will be available on port `6379` (accessible within the Docker network).
- The **n8n** workflow will be available for processing incoming data at [http://localhost:5678].

## n8n Workflow Setup

### n8n Webhook:

The Backend sends the raw temperature data to **n8n** via a Webhook. The data is sent in **POST** requests to `http://localhost:5678/webhook/temperature`.  
**n8n** processes the incoming data (checks if the temperature is above or below 35) and determines the status (`NORMAL` or `HIGH`).

### n8n Workflow Example:

The workflow listens for incoming temperature data, processes it, and sends the processed data back to the Backend. The Backend then updates the temperature data in **MongoDB** and emits the processed reading to the **Frontend**.  
Example **n8n** workflow involves:
- **Webhook Node**: To listen for incoming temperature data.
- **Set Node**: To check the temperature and assign the status.
- **Respond to Webhook Node**: To send the processed data back to the Backend.

### Docker Integration for n8n:

The **n8n** service is included in the **docker-compose.yml** file and runs as a container along with the other services.

To view the **n8n** interface:
- Visit `http://localhost:5678` to configure and manage the workflow. The **Webhook** node listens for **POST** requests at `/temperature` and responds with the processed data.

## How It Works

### Real-Time Data Flow:
1. Backend generates a temperature reading every 2 seconds.
2. The reading is stored in **MongoDB** and emitted to the **Frontend** via WebSocket.
3. The raw data is sent to the **n8n** webhook for processing.
4. **n8n** processes the temperature and sets the status to `"HIGH"` or `"NORMAL"`.
5. The processed reading is sent back to the Backend and stored in **MongoDB**.
6. The Backend emits the processed reading to the **Frontend**.
7. The **Frontend** displays both the raw and processed readings.

### n8n Workflow:
The workflow is designed to:
- Listen for incoming raw temperature data via the **Webhook node**.
- Process the temperature data by checking whether it is above 35 degrees.
- Return the processed data (temperature and status) to the Backend via the **Respond to Webhook node**.

You can explore and manage the workflow through the **n8n UI** available at `http://localhost:5678`.

## Uploading the n8n Workflow

1. Ensure that the **n8n workflow JSON file** is stored in the directory `n8n/workflows/` in your project (e.g., `n8n/workflows/workflow.json`).
   
2. Open the **n8n UI** at `http://localhost:5678`.

3. In the **n8n UI**, go to the top left corner and click on the **"Import"** button.

4. Select the **workflow.json** file from the `n8n/workflows/` folder in your project.

5. After the workflow is imported, make sure to **activate** it by clicking on the **"Activate"** button in the top-right corner of the workflow page.

6. The workflow is now ready to handle temperature data from the Backend and process it according to the logic defined in the workflow.

