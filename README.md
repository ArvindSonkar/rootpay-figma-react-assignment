# RootPay Figma React Assignment

## Live Demo

Live deployed URL: ADD_DEPLOYED_URL_HERE
GitHub repository: ADD_GITHUB_REPO_LINK_HERE

---

# Project Overview

This project implements the **Create Account flow** based on the provided Figma design using **React + TypeScript + Vite**.

The application guides users through a **multi-step onboarding process** with validation and a final account summary modal.

---

# Tech Stack

* **React 19** – UI framework
* **TypeScript** – type safety
* **Vite** – fast development and build tooling
* **CSS Modules** – scoped component styling
* **Material UI** – UI component (`LinearProgress`)

---

# Application Flow

The account creation process includes the following steps:

1. **Account Type Selection**
2. **Mobile Number Input**
3. **OTP Verification**
4. **Email Input**
5. **User Information (First & Last Name)**
6. **Create Password**
7. **Account Summary Modal**

Each step validates input before allowing the user to continue.

---

# Architecture

## High Level Structure

CreateNewAccount Page
│
├── AuthLayout
│   ├── Left Illustration Panel
│   └── Right Step Content Panel
│
└── CreateAccount
│
├── AccountType
├── PhoneNumberInput
├── OtpVerification
├── EmailInput
├── UserInfo
├── CreatePassword
│
└── AccountSummaryModal

---

## Project Structure

src/
│
├── pages/
│   └── CreateNewAccount.tsx
│
├── layouts/
│   └── AuthLayout/
│
├── components/
│   ├── CreateAccount/
│   ├── AccountType/
│   ├── PhoneNumberInput/
│   ├── OtpVerification/
│   ├── EmailInput/
│   ├── UserInfo/
│   ├── CreatePassword/
│   └── AccountSummaryModal/
│
└── contexts/
└── CreateNewAccountContext.ts

---

# State Management Decisions

The application uses a **combination of local state, refs, and context**.

### Local State

Each step manages its own input and validation state locally.
This keeps components isolated and prevents unnecessary re-renders.

### Shared Data Collection

`accountInfoRef` inside `CreateAccount` collects data entered across steps.

This allows:

* data persistence between steps
* minimal re-renders

### Global State via Context

`CreateNewAccountContext` stores:

* final account creation status
* account summary data

A **custom hook (`useCreateNewAccountContext`)** ensures the context is only used inside its provider.

---

# Step Behavior

## 1. Account Type

User selects:

* Personal
* Business

Selection is stored in shared account info.

---

## 2. Mobile Number

Validation rules:

* numeric only
* exactly **10 digits**

---

## 3. OTP Verification

Features:

* 4 input boxes
* auto-focus to next input
* validation ensures all digits entered

---

## 4. Email Input

Validation:

* regex email format validation

---

## 5. User Information

Collects:

* First Name
* Last Name

Validation:

* both fields required

---

## 6. Create Password

Includes:

* password
* confirm password

Validation rules:

* minimum **6 characters**
* both passwords must match

Eye toggle allows show/hide password.

---

## 7. Account Summary Modal

Displayed after successful account creation.

Shows:

* Account Type
* Masked Email
* Full Name
* Mobile Number

Includes security information and a **Go To Dashboard** action.

---

# UI / UX Enhancements Implemented

The following improvements were implemented beyond the basic flow:

* Figma-aligned layout and typography
* Stable right panel width to avoid layout flicker
* Modal open animation (overlay fade + scale animation)
* Inline validation feedback
* Reusable **Back / Continue button controls**
* Masked email display in summary modal for privacy

---

# Assumptions

Since backend APIs were not provided, the following assumptions were made:

* OTP verification is simulated on the frontend
* Account creation is handled locally
* Mobile numbers are restricted to **10 digits**
* Password minimum length is **6 characters**

---

# Run Locally

Install dependencies

npm install

Start development server

npm run dev

---

# Available Scripts

npm run dev      # start development server
npm run build    # build production bundle
npm run lint     # run eslint checks
npm run preview  # preview production build

---

# Verification

TypeScript compilation check:

npx tsc --noEmit

---

# Future Improvements

Potential improvements for production usage:

* API integration for OTP verification
* Server-side validation
* Route-based step navigation
* Unit tests for validation and step transitions
* Accessibility improvements (ARIA roles, keyboard navigation)
* Error boundary handling
