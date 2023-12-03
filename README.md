# Open Source Project 2023 - InfiniThree Source Code - Using ReactJS as Frontend Side and Python Flask as Backend Side

# How to Install and Run the Project

## Setting Up a Vite + React Project:
1. Create a React App with Vite
Create a new directory for your project
```
mkdir my-react-app
cd my-react-app
```

Initialize a new Node.js project `npm init -y`

Install Vite globally (if not installed) `npm install -g create-vite`

Create a new React app using Vite
```
create-vite my-react-app --template react
cd my-react-app
```

2. Running the Project
Install project dependencies `npm install`

Start the development server `npm run dev`

This will start the development server, and your React app will be available at http://localhost:3000 by default.

## Set up the server
  1. Open `codification_law_infiniThree/InfiniThree/server` folder.
  2. Create a new file named `.env`.
  3. Open the `.env` file and set your environment variables as follows:
       
       ```
       DB_USER=<your-database-username>
       DB_PASS=<your-database-password>
       DB_HOST=<your-database-host>
       DB_NAME=<your-database-name>
       ```
  
## Running the Program in VSCode
  1. Open *VSCode*.
  2. Go to `File -> Open Folder`.
  3. Navigate to and select the `codification_law_infiniThree/InfiniThree/server` folder.
  4. Press `Ctrl+Shift+P` to open the Command Palette.
  5. Type and select `Python:Create Environment`.
  6. In the terminal, activate the virtual environment using the command `source .venv/bin/activate`.
  7. Install the required packages with `pip install -r requirements.txt`.
  8. Run program with `python run.py`.
  
## Running the Program in PyCharm
  1. Open *PyCharm*.
  2. Go to `File -> Open...`.
  3. Select the `codification_law_infiniThree/InfiniThree/server` folder.
  4. Go to `File` -> `Setting` -> `Project: <Project-name>` -> `Python Interpreter`.
  5. Click on the plus (+) icon in the bottom right corner to add a new Python Interpreter.
  6. Select `Virtualenv Environment` on the left.
  7. Make sure `New environment` is selected and specify the path to the `.venv` directory in project folder in Location.
  8. Select the Python version from the `Base interpreter` list.
  9. Click `OK` to create the virtual environment.
  10. Open the Terminal in PyCharm (`View` -> `Tool Windows` -> `Terminal`).
  11. In the terminal, activate the virtual environment using the command `source .venv/bin/activate`.
  12. Install the required packages with `pip install -r requirements.txt`.
  13. Navigate to the `run.py` file in the PyCharm Project Tool Window.
  14. Right-click on the `run.py` file and select `Run 'run'`.
    
## Prepare Database
  1. Create a new database in MySQL Server.
  2. Update the .env file with your database information.
  3. Run `models.py` to create table.

## Installing Docker on Ubuntu 

You will need the following:
- One Ubuntu server set up, including a sudo non-root user and a firewall.
- An account on Docker Hub if you wish to create your own images and push them to Docker Hub.

1. Update your existing list of packages: `$ sudo apt update`

2. Next, install a few prerequisite packages which let apt use packages over HTTPS: `$ sudo apt install apt-transport-https ca-certificates curl software-properties-common`

3. Then add the GPG key for the official Docker repository to your system: `$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`

4. Add the Docker repository to APT sources: `$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"`

5. Finally, install Docker: `$ sudo apt install docker-ce`

6. Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running: `$ sudo systemctl status docker`

## Installing PyTest

1. Prerequisites

- Python Installation.
- Pip Installation.

2. Open your terminal and run the command: `pip install pytest`

# Authors
  1. Nguyen Kim Bao Ngan
  2. Vo Phu Phat
  3. Tran Le Lan
