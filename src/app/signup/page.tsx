import { redirect } from 'next/navigation';

export default function SignupPage() {
  // Permanently redirect any visitors of /signup to the home page (or login)
  redirect('/');
}
