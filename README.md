# Vasudha Climate, Energy & Power Data Platform — Frontend

Frontend application for the Vasudha Climate, Energy & Power Data Platform.

The application provides a public-facing platform for exploring approved Climate, Energy, and Power datasets, along with authenticated dashboards for Admin and Super Admin users.

The frontend is built using React and Vite and communicates with a Node.js/Express backend API connected to PostgreSQL.

---

# Assessment Submission

This project was developed as part of the Vasudha Climate, Energy & Power technical assessment.

## Public GitHub Repositories

### Frontend Repository

https://github.com/RiyaKumari22/climate-energy-platform-frontend

### Backend Repository

https://github.com/RiyaKumari22/climate-energy-platform-backend

---

## Deployed Application

### Frontend

https://climate-energy-platform-frontend.onrender.com/

### Backend API

https://climate-energy-platform-backend.onrender.com

### Backend Health Check

https://climate-energy-platform-backend.onrender.com/api/health

The frontend is deployed on Render and communicates with the deployed backend API, which connects to the PostgreSQL production database.

---

# Project Overview

The Vasudha Climate, Energy & Power Data Platform is a full-stack web application designed to manage and publicly visualize datasets related to:

- Climate
- Energy
- Power

The application supports multiple user roles and provides an approval workflow for uploaded datasets.

Administrators can upload CSV datasets and select the appropriate domain, data type, and visualization type.

New datasets are initially marked as `PENDING` and remain hidden from public users until approved by a Super Admin.

Approved datasets are then displayed on the public Climate, Energy, and Power pages.

---

# Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI framework |
| Vite | Frontend build tool |
| React Router | Application routing |
| Tailwind CSS | UI styling |
| Axios | Backend API communication |
| Recharts | Data visualization |
| React Leaflet | Interactive map visualization |
| JavaScript | Application development |
| Render | Frontend deployment |

---

# Main Features

## Public Features

Public users do not need to create an account or log in.

The application provides:

- Home page
- Climate page
- Energy page
- Power page
- Public dataset visualization
- Domain-based dataset filtering
- Interactive data visualizations
- Interactive India map
- India state heatmap
- Time-series charts

---

# Authentication

The application provides authentication for administrative users.

Supported roles:

- Admin
- Super Admin

Authentication uses JWT tokens provided by the backend.

After successful login, the user is redirected based on their role.

### Super Admin

Super Admin users are redirected to:

```text
/super-admin
