import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type NotificationType = "success" | "error" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
}

interface NotificationContextValue {
  notify: (message: string, type?: NotificationType, title?: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((message: string, type: NotificationType = "success", title?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const notification: Notification = { id, type, title, message };
    setNotifications((prev) => [notification, ...prev]);

    window.setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }, 4500);
  }, []);

  useEffect(() => {
    const originalAlert = window.alert;
    window.alert = (message?: string) => {
      notify(String(message ?? ""), "success");
    };

    return () => {
      window.alert = originalAlert;
    };
  }, [notify]);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 flex-col items-center gap-3 px-4 sm:px-0">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`w-[min(95vw,420px)] rounded-[28px] border px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-transform duration-300 ease-out ${
              notification.type === "success"
                ? "border-emerald-100 bg-emerald-50 text-emerald-900"
                : notification.type === "error"
                ? "border-rose-100 bg-rose-50 text-rose-900"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 text-xl">
                {notification.type === "success" && "✓"}
                {notification.type === "error" && "⚠"}
                {notification.type === "info" && "ℹ"}
              </div>
              <div className="min-w-0">
                {notification.title && <div className="font-semibold text-sm uppercase tracking-[0.2em] mb-1">{notification.title}</div>}
                <p className="text-sm leading-6">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
