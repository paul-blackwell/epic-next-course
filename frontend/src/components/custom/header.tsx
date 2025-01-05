import Link from 'next/link';
import { Logo } from '@/components/custom/logo';
import { Button } from '@/components/ui/button';
import { getUserMeLoader } from '@/data/services/get-user-me-loader';
import { LoggedInUser } from '@/components/custom/logged-in-user';
interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    ctaButton: {
      id: number;
      label: string;
      url: string;
    };
  };
}

export async function Header({ data }: Readonly<HeaderProps>) {
  const user = await getUserMeLoader();

  const { logoText, ctaButton } = data;
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.text} />
      <div className="flex items-center gap-4">
        {user.ok ? (
          <LoggedInUser userData={user.data} />
        ) : (
          <Link href={ctaButton.url}>
            <Button>{ctaButton.label}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
