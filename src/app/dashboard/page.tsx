'use client';

import React, { useEffect, useState, CSSProperties } from "react"; 
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { PacmanLoader } from "react-spinners";

const DashboardPage = () => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [isloading, setIsLoading] = useState(true);
    const [color, setColor] = useState("#7CFC00");

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
        <PacmanLoader
          color={color}
          loading={isloading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )

};

export default DashboardPage;