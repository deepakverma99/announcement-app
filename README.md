# Shopify Announcement Banner App

A full-stack Shopify App built on the MERN stack (MongoDB, Express, React, Node.js) using Shopify's React Router template. This app allows merchants to easily set a custom announcement banner from their Shopify Admin dashboard, which is instantly displayed on their storefront via a Theme App Extension.

## 🚀 Features
- **Admin Dashboard**: A clean UI built with Shopify's modern Polaris Web Components to update the announcement text.
- **MongoDB Audit Log**: Every time an announcement is saved, a new timestamped record is created in MongoDB to maintain an audit history.
- **Shopify Metafields API**: Uses the Shopify GraphQL Admin API to seamlessly sync the announcement to the shop's Metafields (`my_app.announcement`).
- **Storefront App Embed Block**: A Liquid Theme App Extension that reads the shop metafield and displays a floating banner at the top of every page.

## 🛠 Tech Stack
- **Frontend**: React Router, Shopify App Bridge, Polaris Web Components.
- **Backend**: Node.js (via React Router server runtime), Shopify Admin GraphQL API.
- **Database**: MongoDB (Mongoose) for audit logging.
- **Storefront**: Shopify Theme App Extensions (Liquid & CSS).

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (v20+ recommended)
- A Shopify Partner Account
- A Shopify Development Store
- A MongoDB Cluster URI

### 2. Environment Variables
Create a `.env` file in the root of the project with your MongoDB connection string. (Ensure you specify your database name, e.g., `shopify_app`):
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/shopify_app?appName=Cluster0
```

### 3. Installation
Install the project dependencies:
```bash
npm install
```

### 4. Run the Dev Server
Start the local development server and connect it to your Shopify Partner account:
```bash
npm run dev
```
Follow the CLI prompts to select your Partner account and Development Store. The CLI will generate a secure tunnel and provide a URL to install the app on your dev store.

## 🎨 Storefront Setup
To view the announcement banner on your store:
1. Open your Shopify Admin -> **Online Store** -> **Themes**.
2. Click **Customize** on your active theme.
3. On the left sidebar, click the **App embeds** icon.
4. Toggle **Announcement Banner** to ON and hit **Save**.
5. Save a message in the App Dashboard, and view your live storefront!

## 🌐 Deployment
This app is containerized via a `Dockerfile` and can be easily deployed to Render, Fly.io, or Heroku.
1. Connect your GitHub repository to your hosting provider (e.g. Render Web Service).
2. Ensure you add all necessary Environment Variables to your host (`SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `SHOPIFY_APP_URL`, `MONGODB_URI`, `SCOPES`).
3. Deploy the application.
4. Once your live URL is generated, run `npm run deploy` locally to push your final production URLs directly to Shopify's configuration.
