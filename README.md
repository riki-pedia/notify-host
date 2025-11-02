## Notification Host
This is a notification gateway that forwards notifications to a target server. Server counterpart for <a href="https://github.com/riki-pedia/notification-hub">notification-hub</a>. The gateway listens for incoming notification requests and forwards them to the specified target server with authentication. It's built using Node.js and Express, and wrapped in a Docker container for easy deployment and usability across whatever homelab services you may have.

This readme is kind of bad for right now, but if I decide to maintain this better I'll improve it.

### Usage
1. Build the Docker image:
   ```bash
   # this assumes you cloned the the repo
   docker build -t notify-host .
   ```
   OR pull from GHCR:
    ```bash
   docker pull ghcr.io/riki-pedia/notify-host:latest
   ```
2. Run the Docker container:
   ```bash
   docker run -d -p 9100:9100 -e TARGET="http://<target-server>:<port>/notify" -e TOKEN="your_secret_token" --name notify-host notify-host
   ```
   OR use docker compose:
   ```yaml
   version: '3'
   services:
     notify-host:
       image: ghcr.io/riki-pedia/notify-host:latest
       container_name: notify-host
       ports:
         - "9100:9100"
       environment:
         - TARGET=http://<target-server>:<port>/notify
         - TOKEN=your_secret_token
       restart: unless-stopped
   ```

   MAKE SURE YOU HAVE THE HOST RUNNING THE TARGET SERVER ACCESSIBLE TO THE GATEWAY.
   