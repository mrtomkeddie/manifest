
import { AppShell } from '@/components/goddess-manifest/app-shell';
import { UserProfileForm } from './components/user-profile-form';

export default function AccountPage() {
  return (
    <AppShell title="My Profile">
      <div className="flex flex-col w-full gap-8">
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline text-primary mb-2">Your Cosmic Profile</h1>
            <p className="text-foreground/80">
              Enter your birth details below. This information will be securely stored and used to personalize your readings and astrological calculations, creating a truly unique experience just for you.
            </p>
        </div>
        <UserProfileForm />
      </div>
    </AppShell>
  );
}
