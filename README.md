# Open Source Project 2023 - InfiniThree Source Code - Using ReactJS as Frontend Side and Python Flask as Backend Side

Public source code demo: https://infinithree.netlify.app/

# How to Install and Run the Project

## Setting Up the ReactJS Project:
  1. Clone the ReactJS project to your folder
  ```
  git clone https://github.com/NganBao0206/codification_law_infiniThree.git
  ```
  then move to the frontend folder
  ```
  cd codification_law_infiniThree/frontend
  ```
  2. Install project dependencies
  ```
  npm install
  ```
  3. Run the project
  ```
  npm run dev
  ```
  This will start the development server, and your React app will be available at http://localhost:5173 by default.

## Setting up the Python Flask server
  1. Clone the Python Flask project
  ```
  git clone https://github.com/NganBao0206/codification_law_infiniThree.git
  ```
  3. Open `codification_law_infiniThree/backend/server` folder.
  4. Create a new file named `.env`.
  5. Open the `.env` file and set your environment variables as follows:
 
       ```
       DB_USER=<your-database-username>
       DB_PASS=<your-database-password>
       DB_HOST=<your-database-host>
       DB_NAME=<your-database-name>
       HOST=localhost
       CORS_URL=http://localhost:5173
       JWT_SECRET_KEY=n3rfq83r18fhnc12rh19dic12ndcn3u9cuwecnjc2i3uhf981h12ufn1fo1u93fhi
       CLOUDINARY_CLOUD_NAME=dljmwib1r
       CLOUDINARY_API_KEY=551239148838771
       CLOUDINARY_API_SECRET=FCXYKNM3fQHa9ein5j-WJB90H0s
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

# Features included in the project

- Register / Login: Includes new user registration and login functionality, information authentication, database storage, and access authorization via tokens.
- Searching codification tree
- Look up legal terms: query terms and return pagination results based on keywords and page numbers.
- Discussion forum
- Chat bot: Currently, this feature only runs locally due to deployment difficulties as the server only has 2GB of RAM.
- Contact: provides a JWT-protected API endpoint for sending reports via email. It uses Flask and JWT to authenticate users and send email reports with the content and subject provided from the request.

# Dependencies and libraries
Python (3.11.4)

1. Flask and related extensions:
  - Flask (3.0.0)
  - Flask-Bcrypt (1.0.1)
  - Flask-Cors (4.0.0)
  - Flask-JWT-Extended (4.5.3)
  - Flask-SQLAlchemy (3.1.1)
2. Libraries that support data processing and calculations:
  - NumPy (1.26.2)
  - Pandas (2.1.3)
  - SciPy (1.11.4)
  - Scikit-learn (1.3.2)
  - sklearn-crfsuite (0.3.6)
3. Libraries that support authentication, encryption, and security:
  - PyJWT (2.8.0)
  - Bcrypt (4.1.1)
  - Werkzeug (3.0.1)
4. Other supporting libraries:
  - Cloudinary (1.36.0)
  - Jinja2 (3.1.2)
  - MarkupSafe (2.1.3)
  - SQLAlchemy (2.0.23)
  - Tabulate (0.9.0)
  - Jenkins LTS (2.426.1)
  - Docker (24.0.7)
  - Docker-compose (2.17.2)


# Authors
  1. Nguyen Kim Bao Ngan
  2. Vo Phu Phat
  3. Tran Le Lan
