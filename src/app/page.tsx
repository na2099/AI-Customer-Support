'use client';

import { auth } from "./firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState, CSSProperties } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ClimbingBoxLoader } from "react-spinners";

const HomePage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isloading, setIsLoading] = useState(true);
  const [color, setColor] = useState("#4169E1");

  console.log("user", user);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
    }
    setIsLoading(false);
  }, [user, loading, router]); 
  
  if (isloading || loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ClimbingBoxLoader
          color={color}
          loading={isloading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
};

export default HomePage;
