"use client";

import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import { OAuthSignIn } from "./action";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const OAuthProviders: OAuthProvider[] = [
    {
      name: "github",
      displayName: "GitHub",
      icon: <Github className="size-5" />,
    },
  ];

  return (
    <>
      {OAuthProviders.map((provider) => (
        <Button
          onClick={async () => await OAuthSignIn(provider.name)}
          key={provider.name}
          variant={"outline"}
          className="flex justify-center items-center gap-2 w-full mt-2"
        >
          {provider.icon}
          Login With {provider.displayName}
        </Button>
      ))}
    </>
  );
}
