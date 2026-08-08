import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full bg-white rounded-[28px] shadow-[0_30px_80px_rgba(15,23,42,0.12)] border border-[#E7E6E2] p-10 text-center">
        <h1 className="text-5xl font-serif font-bold text-[#1f2937] mb-4">Oops!</h1>
        <p className="text-[#6b7280] text-[1rem] mb-6">
          Something went wrong while loading this page. Please try again or return to the homepage.
        </p>
        {isRouteErrorResponse(error) ? (
          <div className="mb-6 rounded-3xl bg-[#F4F9F7] border border-[#D9E7DB] p-4 text-left text-sm text-[#334d3d]">
            <p className="font-semibold mb-2">Error {error.status}</p>
            <p>{error.statusText || 'An unexpected route error occurred.'}</p>
          </div>
        ) : error instanceof Error ? (
          <div className="mb-6 rounded-3xl bg-[#F4F9F7] border border-[#D9E7DB] p-4 text-left text-sm text-[#334d3d]">
            <p className="font-semibold mb-2">Error</p>
            <p>{error.message}</p>
          </div>
        ) : null}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#1C5F46] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#154633]"
          >
            Return to Home
          </Link>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-full border border-[#1C5F46] px-6 py-3 text-sm font-semibold text-[#1C5F46] transition hover:bg-[#EFF6F2]"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
