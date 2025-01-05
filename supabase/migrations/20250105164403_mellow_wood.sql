/*
  # Auto-confirm user emails
  
  1. Changes
    - Updates all existing users to mark their emails as confirmed
    - Ensures new users will have their emails marked as confirmed
*/

-- Update existing users to mark all emails as confirmed
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE email_confirmed_at IS NULL;

-- Create a trigger to auto-confirm emails for new users
CREATE OR REPLACE FUNCTION auth.handle_new_user_email_confirm()
RETURNS trigger AS $$
BEGIN
  NEW.email_confirmed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_email_confirm ON auth.users;

-- Create trigger for new user email confirmation
CREATE TRIGGER on_auth_user_email_confirm
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auth.handle_new_user_email_confirm();