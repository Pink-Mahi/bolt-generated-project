# Devices Dashboard

A responsive web application for managing devices with Supabase authentication and database integration.

## Setup Instructions

### 1. Local Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google OAuth API:
   - In the sidebar, navigate to "APIs & Services" > "Library"
   - Search for "Google+ API" or "Google Identity Services"
   - Click "Enable"

4. Configure OAuth Consent Screen:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Select "External" user type
   - Fill in the required information:
     - App name
     - User support email
     - Developer contact information
   - Save and continue
   - Add necessary scopes (email, profile)
   - Add test users if in testing mode
   - Complete the process

5. Create OAuth 2.0 Client ID:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Add your application name
   - Add authorized JavaScript origins:
     - Development: `http://localhost:8080`
     - Production: Your actual domain (e.g., `https://your-app.example.com`)
   - Add authorized redirect URIs:
     - Development: `http://localhost:8080/auth/callback`
     - Production: `https://your-app.example.com/auth/callback`
   - Click "Create"
   - Save the Client ID and Client Secret

6. Configure Supabase:
   - Go to your Supabase project dashboard
   - Navigate to Authentication > Providers
   - Find Google in the list
   - Enable it and enter your Client ID and Client Secret
   - Save changes

### 3. Apple OAuth Setup

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Sign in with your Apple Developer account
3. Navigate to "Certificates, Identifiers & Profiles"

4. Register an App ID:
   - Go to "Identifiers" > "+"
   - Select "App IDs"
   - Choose "App" as the type
   - Fill in:
     - Description
     - Bundle ID (e.g., `com.yourcompany.app`)
   - Under Capabilities, select "Sign In with Apple"
   - Click "Continue" and then "Register"

5. Create a Services ID:
   - Go to "Identifiers" > "+"
   - Select "Services IDs"
   - Fill in:
     - Description
     - Identifier (e.g., `com.yourcompany.app.service`)
   - Click "Continue" and then "Register"
   - Select the Service ID you just created
   - Check "Sign In with Apple"
   - Click "Configure"
   - Add your domain and return URLs:
     - Development: `http://localhost:8080`
     - Production: Your actual domain
   - Save changes

6. Create a Key:
   - Go to "Keys" > "+"
   - Enter a name
   - Check "Sign In with Apple"
   - Click "Configure"
   - Select your primary App ID
   - Save and download the key file
   - Note the Key ID

7. Configure Supabase:
   - Go to your Supabase project dashboard
   - Navigate to Authentication > Providers
   - Find Apple in the list
   - Enable it and enter:
     - Service ID
     - Team ID (found in top right of Apple Developer account)
     - Key ID
     - Private Key (from downloaded file)
   - Save changes

### 4. Environment Variables

Create a `.env` file in your project root (do not commit this file):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Docker Deployment

```bash
# Build the Docker image
docker build -t devices-dashboard .

# Run the container
docker run -p 8080:8080 devices-dashboard
```

### 6. Coolify Deployment

1. Push your code to a Git repository
2. In Coolify:
   - Create a new service
   - Select your repository
   - Choose Docker as deployment method
   - Set port to 8080
   - Add environment variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Deploy

## Important Notes

- Always use HTTPS in production
- Keep your OAuth credentials secure
- Update your OAuth redirect URIs when changing domains
- Test authentication flow in development before deploying
- Monitor your OAuth usage and quotas

## Troubleshooting

### Common OAuth Issues

1. Invalid Redirect URI:
   - Double-check all redirect URIs match exactly
   - Include both with and without trailing slash
   - Verify protocol (http/https) matches

2. CORS Issues:
   - Verify allowed origins in Google Cloud Console
   - Check Supabase authentication settings

3. Apple Sign In Issues:
   - Verify team ID and key configuration
   - Ensure private key format is correct
   - Check domain verification

For additional help, check:
- [Supabase Authentication Docs](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Sign in with Apple Documentation](https://developer.apple.com/sign-in-with-apple/get-started/)
