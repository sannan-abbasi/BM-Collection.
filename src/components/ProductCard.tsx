import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import type { Product } from '@/lib/types';

export function formatPrice(price: number): string {
  return 'Rs ' + Number(price).toLocaleString('en-PK');
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="image-zoom relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-100 premium-shadow">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-100">
            <Sparkles className="h-10 w-10 text-stone-300" />
          </div>
        )}
        {product.is_new_arrival && (
          <span className="absolute top-4 left-4 bg-ink/90 text-cream text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
            New
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-serif text-lg text-ink group-hover:text-gold transition-colors duration-300">
          {product.title}
        </h3>
        <p className="text-sm text-stone-600 mt-1">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
