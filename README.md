# Django Demo

CR Autos-like app, for demoing Django and React knowledge.

## Images
![image](https://github.com/CharlieBytesX/djang-demo/assets/62361574/bfca1b6e-ad00-495b-9b94-c8ce31cc0264)
![image](https://github.com/CharlieBytesX/djang-demo/assets/62361574/f8e22339-6645-4577-a650-cd58cd39839e)
![image](https://github.com/CharlieBytesX/djang-demo/assets/62361574/eaeef2e3-5fe9-4b60-85db-b6fdeef5b1be)
![image](https://github.com/CharlieBytesX/djang-demo/assets/62361574/dda0674d-d8d0-43ac-ae56-d75cd0931885)

## Features
- Extended authentication with email confirmation.
- Post authorization per user.
- Car post with images.

## Repository Structure

**repo root (./):** 
- Composer for development, global .env or dev.env for managing all secrets and configurations.
  
**FE:** 
- Front-end React project using Vite.

**cr_autos:** 
- Django project.

## Requirements

To run this project, ensure you have the following installed:

- Node.js (for managing JavaScript dependencies)
- Docker (for running PostgreSQL in a container)
- Python 3.x (for Django and Python dependencies)

## How to Run (In development environment)

In the root folder of the repository:
1. Copy the `.env` template and rename it to `.dev.env`.

### Front End:
Inside the `FE` folder:
- Install dependencies: `npm i`
- Run development server: `npm run dev`

### Database:
In the root folder:
- Start a Docker PostgreSQL image configured for development: `make`

### Backend:
Navigate to the `cr_autos` folder:
1. Create a virtual environment: `python3 -m venv .venv`
2. Activate the virtual environment:
   - For example, for fish shell: `source .venv/bin/activate.fish`
3. Install Python dependencies: `pip install -r requirements.txt`
4. Migrate database changes: `python manage.py migrate`
5. Start the server: `python manage.py runserver`

## Architecture

Standard Django MVC (or MTV) architecture, serving as a REST API server with Django Rest Framework plugin. React frontend communicates with server routes (all using the prefix `/api`).
### FE
#### Main Libraries
- Vite.
- TailwindCSS for speed prototyping.
- Shadcn for some theming and accesibilty.
- Typescript (Being this a prototype, the server responses are not typed).
- React Router for handling routes.
- Centinel for powerfull and flexible state management.
#### Minimal structure inside `src`:

- **Router**: One router component (`Router`) containing all routes.
  
- **lib**: Shared functions across the project, including auth manager logic and content formatting.

- **pages**: Main components for all route pages.

- **layouts**: Project layouts.

- **components**: Divided into:
  - **shared**: Custom shared components (e.g., Navbar).
  - **ui**: Base components for the project.
  - **dialogs**: Components for alert messages and error messages.

### Django Apps

#### Auth
- Custom authentication logic.
- Extended user model to use email instead of username.
- Added email verification logic.
- Custom decorator `@require_confirmed_author` for DRY (Don't Repeat Yourself) on protected endpoints.

#### Posts
- Handles car posts logic.
- Demo car posts with fields for title, description, phone number, and price management.
- Image handling using UUID.



