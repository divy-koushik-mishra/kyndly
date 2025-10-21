"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Validation schema matching tRPC input
const onboardingSchema = z.object({
  projectName: z.string().min(2, "Project name must be at least 2 characters"),
  appConfig: z.object({
    platform: z.enum(["web", "mobile"]),
    domain: z.string().min(3, "Domain must be at least 3 characters"),
    name: z.string().min(2, "App name must be at least 2 characters"),
  }),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export function OnboardingForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<OnboardingFormData>({
    projectName: "",
    appConfig: {
      platform: "web",
      domain: "",
      name: "",
    },
  });

  const onboardUserMutation = api.user.onboardUser.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      setErrors({ submit: error.message });
    },
  });

  const totalSteps = 4;

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    try {
      if (currentStep === 2) {
        // Validate project name
        if (!formData.projectName || formData.projectName.length < 2) {
          newErrors.projectName = "Project name must be at least 2 characters";
        }
      } else if (currentStep === 3) {
        // Validate app config
        if (!formData.appConfig.name || formData.appConfig.name.length < 2) {
          newErrors.appName = "App name must be at least 2 characters";
        }
        if (!formData.appConfig.domain || formData.appConfig.domain.length < 3) {
          newErrors.domain = "Domain must be at least 3 characters";
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (error) {
      return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    try {
      const validatedData = onboardingSchema.parse(formData);
      await onboardUserMutation.mutateAsync(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path.join(".")] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="w-full max-w-2xl">
        {/* Step Indicator */}
        <div className="mb-8 flex justify-center items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  currentStep >= step
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 scale-110"
                    : "bg-slate-800/50 text-slate-500 border border-slate-700/50"
                )}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={cn(
                    "w-12 h-1 mx-2 rounded transition-all duration-300",
                    currentStep > step
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-slate-800/50"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main Card */}
        <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
          <CardContent className="p-8 md:p-12">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="text-center space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl shadow-lg shadow-purple-500/50">
                    🚀
                  </div>
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Welcome to Kyndly
                  </h1>
                  <p className="text-lg text-slate-300 max-w-md mx-auto font-light">
                    Let&apos;s set up your first project in just a few simple steps.
                    It&apos;ll only take a minute!
                  </p>
                </div>
                <div className="pt-4">
                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 shadow-lg shadow-purple-500/50"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Project Setup */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/50">
                      📦
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Create Your Project
                  </h2>
                  <p className="text-slate-300 font-light">
                    Give your project a memorable name
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName" className="text-base">
                      Project Name
                    </Label>
                    <Input
                      id="projectName"
                      placeholder="e.g., My Awesome App"
                      value={formData.projectName}
                      onChange={(e) => {
                        setFormData({ ...formData, projectName: e.target.value });
                        setErrors({ ...errors, projectName: "" });
                      }}
                      className={cn(
                        "h-12 text-base",
                        errors.projectName && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.projectName && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.projectName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 border-slate-600 hover:bg-slate-800"
                    size="lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                    size="lg"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: App Configuration */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/50">
                      ⚙️
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Configure Your App
                  </h2>
                  <p className="text-slate-300 font-light">
                    Tell us about your application
                  </p>
                </div>

                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="appName" className="text-base">
                      App Name
                    </Label>
                    <Input
                      id="appName"
                      placeholder="e.g., My App"
                      value={formData.appConfig.name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          appConfig: { ...formData.appConfig, name: e.target.value },
                        });
                        setErrors({ ...errors, appName: "" });
                      }}
                      className={cn(
                        "h-12 text-base",
                        errors.appName && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.appName && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.appName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">Platform</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            appConfig: { ...formData.appConfig, platform: "web" },
                          })
                        }
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all duration-200",
                          formData.appConfig.platform === "web"
                            ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        )}
                      >
                        <div className="text-3xl mb-2">🌐</div>
                        <div className="font-semibold text-white">
                          Web
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            appConfig: { ...formData.appConfig, platform: "mobile" },
                          })
                        }
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all duration-200",
                          formData.appConfig.platform === "mobile"
                            ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        )}
                      >
                        <div className="text-3xl mb-2">📱</div>
                        <div className="font-semibold text-white">
                          Mobile
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain" className="text-base">
                      Domain
                    </Label>
                    <Input
                      id="domain"
                      placeholder="e.g., myapp.com"
                      value={formData.appConfig.domain}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          appConfig: { ...formData.appConfig, domain: e.target.value },
                        });
                        setErrors({ ...errors, domain: "" });
                      }}
                      className={cn(
                        "h-12 text-base",
                        errors.domain && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                    {errors.domain && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {errors.domain}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 border-slate-600 hover:bg-slate-800"
                    size="lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/50"
                    size="lg"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-500">
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/50">
                      ✨
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    Review & Confirm
                  </h2>
                  <p className="text-slate-300 font-light">
                    Everything looks good? Let&apos;s launch!
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-400">
                          Project Name
                        </p>
                        <p className="text-lg font-semibold text-white">
                          {formData.projectName}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep(2)}
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      >
                        Edit
                      </Button>
                    </div>

                    <div className="h-px bg-slate-700/50" />

                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm text-slate-400">
                          App Details
                        </p>
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-white">
                            {formData.appConfig.name}
                          </p>
                          <p className="text-sm text-slate-400">
                            Platform:{" "}
                            <span className="capitalize font-medium text-white">
                              {formData.appConfig.platform}
                            </span>
                          </p>
                          <p className="text-sm text-slate-400">
                            Domain: <span className="font-medium text-white">{formData.appConfig.domain}</span>
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep(3)}
                        className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="bg-red-950/30 border border-red-800 rounded-lg p-4">
                      <p className="text-sm text-red-400">
                        {errors.submit}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 border-slate-600 hover:bg-slate-800"
                    size="lg"
                    disabled={onboardUserMutation.isPending}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/50"
                    size="lg"
                    disabled={onboardUserMutation.isPending}
                  >
                    {onboardUserMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </span>
                    ) : (
                      "Complete Setup"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Text */}
        <p className="text-center mt-6 text-sm text-slate-400 font-light tracking-wider">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
}

