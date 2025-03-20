# Receipt Tracker SaaS Application

A modern, full-stack receipt tracking application built with:

- [Convex](https://convex.dev/) as the backend (database, server functions)
- [React](https://react.dev/) and [Next.js](https://nextjs.org/) for the frontend
- [Tailwind](https://tailwindcss.com/) for responsive, beautiful UI
- [Clerk](https://clerk.com/) for secure authentication
- [Inngest](https://www.inngest.com/) for background job processing and scheduled tasks
- [Schematic](https://www.schematic.com/) for feature flags and customer portal
- [Stripe](https://stripe.com/) for payment processing and subscriptions

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

1. Create a `.env.local` file in the root directory with the following variables:

```bash
# Convex
CONVEX_DEPLOYMENT=your_deployment_id
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWT_ISSUER_DOMAIN=your_clerk_domain

# Schematic
SCHEMATIC_API_KEY=your_schematic_api_key
NEXT_PUBLIC_SCHEMATIC_KEY=your_schematic_public_key
NEXT_PUBLIC_SCHEMATIC_CUSTOMER_PORTAL_COMPONENT_ID=your_component_id

# Optional AI Features
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
```

2. Open your app and look for the "Claim your application" button from Clerk in the bottom right
3. Follow the steps to claim your application and link it to this app
4. Follow step 3 in the [Convex Clerk onboarding guide](https://docs.convex.dev/auth/clerk#get-started) to create a Convex JWT template
5. Uncomment the Clerk provider in `convex/auth.config.ts`
6. Set up your `CLERK_JWT_ISSUER_DOMAIN` in your Convex deployment environment variables (see [docs](https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances))

## Development Resources

- [Convex Documentation](https://docs.convex.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Inngest Documentation](https://www.inngest.com/docs)
- [Schematic Documentation](https://docs.schematic.com/)
- [Stripe Documentation](https://stripe.com/docs)

## Support

Join the [Convex Discord community](https://convex.dev/community) for real-time help and discussions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
