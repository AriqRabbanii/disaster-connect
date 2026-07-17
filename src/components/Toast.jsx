import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const colors = {
  success: 'border-l-green-500',
  error: 'border-l-red-500',
  warning: 'border-l-yellow-500',
  info: 'border-l-blue-500',
};

function ToastItem({ toast, onRemove }) {
  return (
    <div className={`flex items-start gap-3 bg-white rounded-xl shadow-xl border border-gray-100 border-l-4 ${colors[toast.type]} p-4 min-w-[320px] max-w-sm animate-slide-down`}>
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium text-gray-800">{toast.message}</p>
      <button onClick={() => onRemove(toast.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function Toast() {
  const { toasts, removeToast } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onRemove={removeToast} />)}
    </div>
  );
}
