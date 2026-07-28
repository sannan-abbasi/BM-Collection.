import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Mail } from 'lucide-react';
import { BRAND } from '@/lib/supabase';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl text-cream">
              {BRAND.name.split(' ')[0]}<span className="text-gold">.</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              {BRAND.tagline}. Every piece is thoughtfully curated to bring you timeless elegance and exceptional craftsmanship.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop/jewellery" className="hover:text-gold transition-colors">Jewellery</Link></li>
              <li><Link to="/shop/clothing" className="hover:text-gold transition-colors">Clothing</Link></li>
              <li><Link to="/shop/bags" className="hover:text-gold transition-colors">Bags</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>WhatsApp: {BRAND.whatsapp}</li>
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-gold transition-colors">{BRAND.email}</a></li>
              <li><Link to="/admin" className="hover:text-gold transition-colors">Admin Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/40">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="text-xs text-cream/40">Crafted with care for the discerning few.</p>
        </div>
      </div>
    </footer>
  );
}
