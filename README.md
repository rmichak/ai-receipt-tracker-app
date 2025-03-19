# Receipt Tracker SaaS Application

A modern, full-stack receipt tracking application built with:

- [Convex](https://convex.dev/) as the backend (database, server functions)
- [React](https://react.dev/) and [Next.js](https://nextjs.org/) for the frontend
- [Tailwind](https://tailwindcss.com/) for responsive, beautiful UI
- [Clerk](https://clerk.com/) for secure authentication

## Features

- 📱 Mobile-friendly receipt capture and management
- 📊 Expense tracking and categorization
- 📈 Financial insights and reporting
- 🔒 Secure multi-user support
- 📁 Cloud storage for receipt images
- 🏷️ Custom tagging and organization

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- A Clerk account for authentication
- A Convex account for the backend

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

### Configuration

1. Open your app and look for the "Claim your application" button from Clerk in the bottom right
2. Follow the steps to claim your application and link it to this app
3. Follow step 3 in the [Convex Clerk onboarding guide](https://docs.convex.dev/auth/clerk#get-started) to create a Convex JWT template
4. Uncomment the Clerk provider in `convex/auth.config.ts`
5. Set up your `CLERK_JWT_ISSUER_DOMAIN` in your Convex deployment environment variables (see [docs](https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances))

## Development Resources

- [Convex Documentation](https://docs.convex.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

Join the [Convex Discord community](https://convex.dev/community) for real-time help and discussions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
