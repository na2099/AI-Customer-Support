'use client';

import { useEffect, useState, CSSProperties, ReactElement } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory
import { useAuthState } from 'react-firebase-hooks/auth';
import { ClimbingBoxLoader } from 'react-spinners';
import { auth } from './firebase';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [color, setColor] = useState<string>('#4169E1');
  const [chatBoxComponent, setChatBoxComponent] = useState<ReactElement | null>(null);

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  useEffect(() => {
    console.log('Effect triggered: ', { loading, user });

    if (!loading) {
      setIsLoading(false);
      if (!user) {
        console.log('User not authenticated, redirecting to login.');
        router.push('/login');
      } else {
        console.log('User authenticated, loading chatbox.');
        // Import chatbox dynamically and load after dashboard navigation
        router.push('/chatbox');
      }
    }
  }, [user, loading, router]);

  if (isLoading || loading) {
    console.log('Loading spinner active: ', { isLoading, loading });
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ClimbingBoxLoader
          color={color}
          loading={isLoading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  // Render the dynamically loaded ChatBox component if it's available
  console.log('Rendering chatBoxComponent:', chatBoxComponent);
  return chatBoxComponent || <div>Loading chat module...</div>;
};

export default HomePage;