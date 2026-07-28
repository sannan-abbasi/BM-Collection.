import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { BRAND } from '@/lib/supabase';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Jewellery', to: '/shop/jewellery' },
    { label: 'Clothing', to: '/shop/clothing' },
    { label: 'Bags', to: '/shop/bags' },
    { label: 'New Arrivals', to: '/new-arrivals' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-semibold tracking-wide text-ink">
              {BRAND.name.split(' ')[0]}<span className="text-gold">.</span>
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-stone-500 font-sans">
              {BRAND.name.split(' ').slice(1).join(' ')}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm uppercase tracking-widest transition-colors duration-300 relative group ${
                  location.pathname === l.to ? 'text-gold' : 'text-ink hover:text-gold'
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="hidden md:block text-xs uppercase tracking-widest text-stone-500 hover:text-gold transition-colors"
            >
              Admin
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-ink"
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-transform duration-500 md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-serif text-3xl text-cream hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="text-sm uppercase tracking-widest text-stone-400 hover:text-gold transition-colors"
          >
            Admin
          </Link>
          <div className="flex gap-6 mt-8">
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="text-cream/60 hover:text-gold">
              <ShoppingBag className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
