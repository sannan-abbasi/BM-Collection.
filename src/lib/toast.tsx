import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  notify: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-start gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3 shadow-xl animate-[slideIn_0.3s_ease-out]"
          >
            {t.type === 'success' && <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-600 mt-0.5" />}
            {t.type === 'error' && <XCircle className="h-5 w-5 flex-shrink-0 text-red-600 mt-0.5" />}
            {t.type === 'info' && <Info className="h-5 w-5 flex-shrink-0 text-stone-600 mt-0.5" />}
            <p className="text-sm text-stone-800 flex-1 leading-relaxed">{t.message}</p>
            <button onClick={() => dismiss(t.id)} className="text-stone-400 hover:text-stone-600 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
