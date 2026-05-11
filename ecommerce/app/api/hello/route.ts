export async function GET() {
  return new Response('Hello from a Next.js API route!', {
    status: 200,
  });
}

export async function POST() {
  return new Response('Thank you for posting to this API route!', {
    status: 200,
  });
}