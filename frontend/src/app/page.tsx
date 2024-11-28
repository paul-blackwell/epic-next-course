import { Button } from '@/components/ui/button';

async function getStrapiData(path: string) {
  const baseUrl = 'http://localhost:1337';
  try {
    const response = await fetch(`${baseUrl}${path}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData('/api/home-page');
  const { title, description } = strapiData.data;
  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
      <Button>Click me</Button>
    </main>
  );
}
