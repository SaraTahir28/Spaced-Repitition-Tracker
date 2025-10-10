# 📚 Spaced Repetition Tracker

A lightweight, accessible web app that helps users plan and track revision topics using spaced repetition. Built using modular JavaScript and localStorage, with no external styling or frameworks.

## 🚀 Live Demo

🔗 [saraspacerepitition.netlify.app](https://saraspacerepitition.netlify.app)

## 🧠 Project Overview

This app allows users to:
- Select from 5 predefined users
- View their personalized revision agenda
- Add new topics with a start date
- Automatically calculate spaced revision dates (1 week, 1 month, 3 months, 6 months, 1 year)
- Store and retrieve agenda data using localStorage
- Filter out past revision dates
- Reset all user data for development/testing

## 📦 Features

- ✅ Modular JavaScript using ES modules
- ✅ Uses provided `storage.js` for data handling
- ✅ No authentication required
- ✅ Fully accessible (100% Lighthouse score)
- ✅ Native HTML form and date picker
- ✅ Form validation and keyboard accessibility
- ✅ Unit tests for revision date logic
- ✅ Deployed via Netlify

## 🧪 Testing

Unit tests are written using Node’s built-in `node:test` and `assert` modules.

To run tests locally:


Run npm test in terminal.
