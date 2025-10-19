import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";
import { OnboardingForm } from "./_components/onboarding-form";

const OnboardingPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-up");
  }
  
  const userStatus = await api.user.getUserStatus();

  if (userStatus?.status === "ACTIVE") {
    redirect("/dashboard");
  }

  return <OnboardingForm />;
};

export default OnboardingPage;
