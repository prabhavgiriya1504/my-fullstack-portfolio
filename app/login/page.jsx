// app/login/page.jsx

import LoginForm from '@/components/AdminLoginForm'; // Adjust path if necessary

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Admin Panel Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}