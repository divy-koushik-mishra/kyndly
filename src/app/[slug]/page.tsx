import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { ReviewForm } from "./_components/review-form";

export default async function PublicReviewFormPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch app by slug
  let app;
  try {
    app = await api.app.getBySlug({ slug: params.slug });
  } catch (error) {
    notFound();
  }

  // Check if form is public
  if (!app.isFormPublic) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            Form Not Available
          </h1>
          <p className="text-gray-400">
            This review form is currently not accepting submissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          {app.logoUrl && (
            <div className="mb-6 flex justify-center">
              <img
                src={app.logoUrl}
                alt={app.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
            </div>
          )}
          <h1 className="mb-2 text-4xl font-bold text-white">{app.name}</h1>
          <p className="text-lg text-gray-400">
            Share your experience with {app.projectName}
          </p>
          {app.description && (
            <p className="mt-2 text-sm text-gray-500">{app.description}</p>
          )}
        </div>

        {/* Review Form */}
        <ReviewForm appId={app.id} formConfig={app.formConfig} />

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Powered by{" "}
          <a
            href="https://kyndly.online"
            className="text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kyndly
          </a>
        </div>
      </div>
    </div>
  );
}

