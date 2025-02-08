# Real-Time Temperature Monitoring System

This is a real-time temperature monitoring system that processes and visualizes temperature data in real-time using a modern microservices architecture.

![Frontend Demo Screenshot](/frontend/public/frontend-demo.png)

## Architecture Overview

The system uses the following technologies:
- **Frontend**: React.js for a responsive user interface.
- **Backend**: Node.js with Express.js to handle data processing and WebSocket communication.
- **Database**: MongoDB for storing temperature data.
- **Message Broker**: Redis for real-time communication and data distribution.
- **Docker**: All services are containerized and orchestrated using Docker Compose.

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

