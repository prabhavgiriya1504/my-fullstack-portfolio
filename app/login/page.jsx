import LoginForm from '@/components/AdminLoginForm'; 

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8  rounded-xl shadow-2xl border border-blue-300">
        <h1 className="text-3xl font-extrabold text-center text-white">
          Admin Panel Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}