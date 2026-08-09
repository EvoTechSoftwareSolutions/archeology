import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";
import api from "../../lib/axios";

export function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid unsubscribe link. Token is missing.");
      return;
    }

    const unsubscribe = async () => {
      try {
        const response = await api.get(`/newsletter/unsubscribe/${token}`);
        setStatus("success");
        setMessage(response.data.message || "You have successfully unsubscribed from the newsletter.");
      } catch (error: any) {
        setStatus("error");
        setMessage(error.response?.data?.message || "Failed to unsubscribe. The link might be expired or invalid.");
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col items-center justify-center p-4 pt-24">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center border border-[#eadfc4]">
        {status === "loading" && (
          <div className="flex flex-col items-center text-[#4a4a3a]">
            <FiLoader className="animate-spin text-[#c8a84b] mb-4" size={48} />
            <h2 className="text-2xl font-serif font-bold text-[#1a3a2a]">Processing...</h2>
            <p className="mt-2 text-sm opacity-80">Please wait while we update your preferences.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center text-[#1a3a2a]">
            <FiCheckCircle className="text-green-600 mb-4" size={48} />
            <h2 className="text-3xl font-serif font-bold mb-4">Unsubscribed</h2>
            <p className="text-[#4a4a3a] mb-8">{message}</p>
            <Link 
              to="/"
              className="bg-[#1c5f46] hover:bg-[#154a36] text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center text-[#1a3a2a]">
            <FiXCircle className="text-red-500 mb-4" size={48} />
            <h2 className="text-3xl font-serif font-bold mb-4">Oops!</h2>
            <p className="text-[#4a4a3a] mb-8">{message}</p>
            <Link 
              to="/"
              className="bg-[#1c5f46] hover:bg-[#154a36] text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
