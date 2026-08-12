const required = ['MONGODB_URI', 'CLERK_SECRET_KEY', 'CLERK_PUBLISHABLE_KEY'];

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key]?.trim());

  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    console.error('Copy server/.env.example to server/.env and fill in values.');
    process.exit(1);
  }
}
