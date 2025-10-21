export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /onboarding/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://kyndly.online/sitemap.xml`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
