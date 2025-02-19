import Services from '@/components/Services';
import Products from '@/components/Products';
import Research from '@/components/Research';

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Portfolio Management</h1>
      <div className="grid gap-8">
        <Services />
        <Products />
        <Research />
      </div>
    </main>
  );
}
