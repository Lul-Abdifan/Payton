<a name="readme-top"></a>

# 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Business Operations](#business-operations)
  - [E-Commerce & Digital Presence](#e-commerce--digital-presence)
- [Contribution Guidelines](#contribution-guidelines)
  - [Branching Strategy](#branching-strategy)
    - [Main Branches](#main-branches)
    - [Support Branches](#support-branches)
  - [Commit Message Guidelines](#commit-message-guidelines)
    - [Format](#format)
    - [Commit Types](#commit-types)
    - [Examples](#examples)
  - [Pull Request Process](#pull-request-process)
- [Software Requirements](#software-requirements)
  - [Backend](#backend)
  - [Frontend](#frontend-tech)
- [Development with Docker](#development-with-docker)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
- [Manual Setup](#manual-setup)
- [Technologies Used](#technologies-used)
  - [Backend](#backend-tech)
  - [Frontend](#frontend-tech)
- [DevOps & Deployment](#devops--deployment)
  - [Docker](#docker)
  - [Monitoring](#monitoring)

[⬆ Back to Top](#readme-top)

---

# PaytonSuite <a name="paytonsuite"></a>

An advanced ERP and e-commerce platform specifically designed for musical instrument retailers,and rental programs.

## Overview <a name="overview"></a>

PaytonSuite is a comprehensive business management solution that combines inventory management, customer relationship management, e-commerce, and educational program administration into a single, integrated platform. Built with modern web technologies, it provides tools for managing sales, rentals, repairs, and customer engagement.

## Key Features <a name="key-features"></a>

### Business Operations <a name="business-operations"></a>
- **Inventory Management**: Track instruments, accessories, and supplies
- **Point of Sale (POS)**: In-store and online sales processing
- **Rental & Lease Management**: Handle instrument rentals 
- **Repair & Service Tracking**: Manage instrument repairs and maintenance
- **Customer Relationship Management (CRM)**: Comprehensive customer profiles and history

### E-Commerce & Digital Presence <a name="e-commerce--digital-presence"></a>
- **Online Storefront**: Customizable product catalog with secure checkout
- **Dealer Microsites**: Branded websites for dealers with CMS capabilities
- **Customer Portal**: Self-service account management for customers
- **Product Storytelling**: Showcase instruments with rich media and customer stories



## Contribution Guidelines <a name="contribution-guidelines"></a>

### Branching Strategy <a name="branching-strategy"></a>
We follow GitFlow with the following branch structure:

#### Main Branches <a name="main-branches"></a>
- `main`: Production-ready code (protected branch)
  - Direct commits are not allowed
  - Only updated via pull requests from `dev`
  - Each commit represents a production release (tagged with version)

- `dev`: Development integration branch
  - Where feature branches are merged into
  - Should always be in a deployable state
  - Protected branch (no direct pushes)

#### Support Branches <a name="support-branches"></a>
-  `feature/*` — New Features or Enhancements
  - **Naming:** `feature/description-in-kebab-case`  
  - **Example:** `feature/user-authentication`  
  - **Branch from:** `dev`  
  - **Merge back into:** `dev`  
  - **Note:** PR must be reviewed and approved before merging  

---

-  `fix/*` — Bug Fixes
  - **Naming:** `fix/issue-description` or `fix/issue-#123`  
  - **Example:** `fix/login-button-styling`  
  - **Branch from:**  
    - `dev` → for next release  
    - `main` → for hotfix  
  - **Merge back into:**  
    - `dev`  
    - `main` (if hotfix)  
  - **Note:** PR must be reviewed and approved before merging  
  
  ---

-  `chore/*` — Maintenance Tasks
  - **Naming:** `chore/task-description`  
  - **Example:** `chore/update-dependencies`  
  - **Branch from:** `dev`  
  - **Merge back into:** `dev`  
  - **Note:** PR must be reviewed and approved before merging  

---

- `hotfix/*` — Critical Production Fixes
  - **Naming:** `hotfix/description`  
  - **Example:** `hotfix/security-patch`  
  - **Branch from:** `main`  
  - **Merge back into:**  
    - `main`  
    - `dev`  
  - **Note:** PR must be reviewed and approved before merging  

### Commit Message Guidelines <a name="commit-message-guidelines"></a>
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

#### Format <a name="format"></a>
```
type(scope): description

[optional body]

[optional footer]
```

#### Commit Types <a name="commit-types"></a>
- `feat`: A new feature
  - Example: `feat(auth): add Google OAuth integration`
  - Triggers a MINOR version bump

- `fix`: A bug fix
  - Example: `fix(api): handle null reference in user profile`
  - Triggers a PATCH version bump

- `docs`: Documentation only changes
  - Example: `docs(readme): update installation instructions`

- `style`: Changes that don't affect code logic
  - Example: `style(ui): format login form according to style guide`

- `refactor`: Code change that neither fixes a bug nor adds a feature
  - Example: `refactor(database): optimize user queries`

- `perf`: Performance improvements
  - Example: `perf(api): optimize database queries in report generation`

- `test`: Adding missing tests or correcting existing ones
  - Example: `test(api): add unit tests for user service`

- `chore`: Changes to build process or auxiliary tools
  - Example: `chore(deps): update axios to v1.0.0`

- `ci`: Changes to CI configuration
  - Example: `ci: add GitHub Actions workflow for tests`

#### Scopes
- Should be the name of the component being changed (e.g., `auth`, `api`, `ui`, `database`)
- Use kebab-case
- Keep it short but descriptive

#### Examples <a name="examples"></a>
```
feat(auth): implement password reset flow

- Add password reset endpoint
- Create email templates
- Add tests for password reset

Fixes #123
```

```
fix(api): handle null reference in order processing

When a deleted product was referenced in an order, the system would throw a null reference exception. This change adds proper null checks and returns a meaningful error message.

Closes #456
```

### Pull Request Process <a name="pull-request-process"></a>
1. Create a new branch from `dev` following the naming convention
2. Make your changes with clear, atomic commits
3. Push your branch and create a pull request to `dev`
4. Ensure all tests pass
5. Get at least one code review approval
6. Resolve any merge conflicts
7. Squash and merge your PR

## Software Requirements <a name="software-requirements"></a>

### Backend
- **Python**: 3.9+
- **Django**: 4.2+ (with Wagtail CMS integration)
- **Database**: PostgreSQL 13+
- **Cache & Message Broker**: Redis 6.0+
- **Task Queue**: Celery 5.3+
- **Web Server**: Gunicorn with Nginx
- **Cloud Storage**: AWS S3 (via boto3)
- **Payment Processing**: Stripe
- **Data Processing**: Pandas 2.0+, PyArrow 14.0+

### Frontend <a name="frontend-tech"></a>
- **Node.js**: 16+
- **Next.js**: 13.4+
- **React**: 18.2+
- **TypeScript**: 5.9+
- **Styling**: Tailwind CSS 3.3+
- **State Management**: Built-in React Hooks
- **Form Handling**: React Hook Form
- **HTTP Client**: Native Fetch API

## Development with Docker <a name="development-with-docker"></a>

### Prerequisites <a name="prerequisites"></a>
- [Docker](https://docs.docker.com/get-docker/) **20.10+**
- [Docker Compose](https://docs.docker.com/compose/install/) **2.0+**

---

### Quick Start <a name="quick-start"></a> (First-Time Setup)

1. **Clone the repository**
   ```bash
   git clone https://github.com/sapb0y/PaytonSuite.git
   cd PaytonSuite
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Open .env and update with your configuration
   ```

3. **Build the Docker images**
   ```bash
   docker compose build
   ```

4. **Start the development environment**
   ```bash
   docker compose up -d
   ```
   > **Note:** Use `docker compose` (without the dash) for Docker Compose v2+.
   > If you're using v1, run `docker-compose up -d`.

5. **Access the applications**
   - Frontend: http://localhost:3000 (Next.js storefront)
   - Backend API: http://localhost:8000 (Django REST API)
   
   > **Note:** The PostgreSQL database (port 5432) and Redis (port 6379) are running but not exposed to the host for security reasons. They are accessible within the Docker network for the services that need them.


### Available Services
- `erp`: Django backend service (REST API)
- `storefront`: Next.js frontend application
- `db`: PostgreSQL database
- `redis`: In-memory data store used for caching and Celery message broker
- `celery`: Asynchronous task queue worker

### Development Workflow
- The code is mounted as volumes for live reloading
- Backend logs: `docker compose logs -f erp`
- Frontend logs: `docker compose logs -f storefront`
- Celery logs: `docker compose logs -f celery`
- Run tests: `docker compose exec erp pytest`
- Apply migrations: `docker compose exec erp python manage.py migrate`
- Create superuser: `docker compose exec erp python manage.py createsuperuser`

## Manual Setup <a name="manual-setup"></a>

### Prerequisites for Manual Setup
- Python 3.9+
- Node.js 16+
- PostgreSQL 13+
- Redis 6.0+

### Backend Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/sapb0y/PaytonSuite.git
   cd PaytonSuite/erp
   ```

2. **Set up Python environment**

   **For Linux (Ubuntu/Debian):**
   ```bash
   # Install system dependencies
   sudo apt update
   sudo apt install -y python3-venv python3-pip python3-dev libpq-dev

   # Create and activate virtual environment
   python3 -m venv venv
   source venv/bin/activate
   ```

   **For Windows:**
   ```powershell
   # Install system dependencies (if not already installed)
   # 1. Install Python 3.9+ from python.org (check 'Add Python to PATH' during installation)
   # 2. Install PostgreSQL from postgresql.org (remember the password you set)
   # 3. Add PostgreSQL bin directory to PATH (typically C:\Program Files\PostgreSQL\<version>\bin)
   
   # Create and activate virtual environment
   python -m venv venv
   .\venv\Scripts\activate
   ```

   **For both Linux and Windows, after activating the environment:**
   ```bash
   # Upgrade pip and install Python dependencies
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. **Set up the database**
   ```bash
   # Create and configure database (PostgreSQL)
   createdb paytonsuite
   
   # Set up the database schema
   python manage.py migrate
   
   # Create an admin user
   python manage.py createsuperuser
   ```

5. **Start the development server**
   ```bash
   python manage.py runserver
   ```

### Frontend <a name="frontend-tech"></a> Setup
1. **Navigate to the storefront directory**
   ```bash
   cd ../storefront
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

### Running with Docker (Alternative)
For a simpler setup, you can use Docker as described in the Development with Docker section above.

## Technologies Used <a name="technologies-used"></a>

### Backend
- **Django 4.2+**: Core web framework
- **Django REST Framework**: Building RESTful APIs
- **Celery**: Asynchronous task queue
- **PostgreSQL**: Primary database
- **Redis**: Caching and message broker for Celery
- **Gunicorn**: WSGI HTTP Server
- **Wagtail CMS**: Content management system
- **Stripe**: Payment processing
- **Pandas & PyArrow**: Data processing
- **Boto3**: AWS SDK for Python

### Frontend <a name="frontend-tech"></a>
- **Next.js 13.4+**: React framework
- **React 18.2+**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 3.3+**: Utility-first CSS framework
- **React DOM**: For web rendering

## DevOps & Deployment <a name="devops--deployment"></a>

### Docker <a name="docker"></a>
- **Docker Compose** is used for local development with the following services:
  - `erp`: Django backend
  - `storefront`: Next.js frontend
  - `db`: PostgreSQL database
  - `redis`: Redis cache and message broker
  - `celery`: Asynchronous task processing



 ### Monitoring <a name="monitoring"></a>
   - The application supports Sentry integration for error tracking
   - Set `SENTRY_DSN` environment variable to enable Sentry error reporting







*This project is maintained by [Your Team Name].*
