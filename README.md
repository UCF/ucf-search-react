# UCF Search

Provides the frontend for [search.ucf.edu](https://search.ucf.edu). This combines an embedded [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/) with location results pulled from the UCF map.

## Development Setup

There are two primary ways to work on this application. Firstly, a completely local setup using installed tools. The second utilizes the Dev Container extension in Visual Studio code and allows for development with needing to locally install Node, NPM or the node packages for this project. Of the two methods, the Dev Container process ensures the most consistent experience and is the preferred setup.

### Dev Containers

**Prerequisites**:
- Ensure [Docker](https://docs.docker.com/engine/install/) or [Podman](https://podman.io/docs/installation) is installed on your system.
- Ensure the [Dev container](https://code.visualstudio.com/docs/devcontainers/tutorial#_install-the-extension) Visual Studio Code extension is installed.
- (Optional) Many Dev Containers will require [Docker compose](https://docs.docker.com/compose/install/) or [Podman compose](https://podman-desktop.io/docs/compose/setting-up-compose) to manage spinning up multiple images at once. This project does not require this, but it may be good to have it installed and configured.

1. Clone the project into a local directory: `git clone git@github.com:UCF/ucf-search-react.git`
2. Open the project in Visual Studio Code, but ignore prompts to install the node packages or open the project within the container.
3. Copy the `.env.template` file to `.env` and add in the appropriate values.
4. This project uses a Font-Awesome kit and will require an authorization token. To pass this into the container, copy the `.devcontainer/devcontainer.env.templ` to `.devcontainer/devcontainer.env` and replace the example token with a valid token.
5. Open the project in the container by pressing `CMD/Ctrl + Shift + P` and searching for the command `Dev Containers: Rebuild and Reopen in container`.
6. Once the project is open in the container, follow the instructions below for continued development.

### Local Installation

1. Clone the project into a local directory: `git clone git@github.com:UCF/ucf-search-react.git`
2. Open the project in Visual Studio Code, but ignore prompts to install the node packages or open the project within the container.
3. Copy the `.env.template` file to `.env` and add in the appropriate values.
4. This project uses a Font-Awesome kit and will require an authorization token. There are a number of ways to define this token, but the simplest is to add it to your shell as an environment variable at startup. Edit your shell configuration file (`.bashrc` or `.zshrc`) and add the following line: `FONTAWESOME_NPM_AUTH_TOKEN=YOUR_AUTH_TOKEN`.
5. Install the node packages using `npm install`.
6. The project is now ready to build and run. Follow the instructions below for continue development.

## Running the Project

There are two primary scripts used for development: The `dev` script and the `build` script.

To develop locally, run `npm run dev` and a local web server will spin up allowing you to run the application without need of a locallly installed web server (IIS, Apache etc.). Once this process starts, it will continue to run, recompiling your code whenever it detects a file change.

To compile the assets completely, you can run `npm run build`. This will build the project for production use, and place the files within the `dist/` directory. For most development needs, this step is not necessary. When code in this repository is commited to the `main` branch is will build and deploy the code via a GitHub action.
