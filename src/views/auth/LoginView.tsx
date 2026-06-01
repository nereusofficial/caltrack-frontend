import { Link } from "react-router-dom";
import { useLoginViewModel } from "../../viewmodels/auth/LoginViewModel";
import fitnessIllustration from "../../assets/images/fitness-illustration.svg";

const LoginView = () => {
  const { formData, loading, error, handleChange, handleLogin } =
    useLoginViewModel();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex overflow-hidden">

      {/* LEFT PANEL */}
      <div className="relative hidden lg:flex lg:w-[55%] overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#312E81] text-white p-16 flex-col">

        {/* Decorative Bars */}
        <div className="absolute top-20 left-16 w-56 h-4 rounded-full bg-white/10 rotate-45" />
        <div className="absolute top-40 left-28 w-80 h-6 rounded-full bg-white/5 rotate-45" />
        <div className="absolute bottom-20 right-10 w-64 h-4 rounded-full bg-white/10 -rotate-45" />

        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

        {/* Branding */}
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-5xl xl:text-6xl font-black tracking-tight">
                CalTrack
              </h1>

              <p className="text-white/70">
                Fitness & Nutrition Tracker
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-md text-lg text-slate-200">
            Track calories, monitor your fitness progress, and build healthier
            habits every day.
          </p>
        </div>

        {/* Illustration */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <img
            src={fitnessIllustration}
            alt="Fitness Illustration"
            className="w-full max-w-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Bottom Text */}
        <div className="relative z-10">
          <p className="text-center text-white/70 text-sm">
            Track calories • Monitor progress • Achieve your goals
          </p>
        </div>

        {/* PREMIUM S CURVE */}
        <svg
        className="absolute top-0 -right-20 h-full w-72"
        viewBox="0 0 200 1000"
        preserveAspectRatio="none"
        >
        <path
            d="
            M0,0
            C140,120 140,280 60,500
            C-20,720 140,880 0,1000
            L200,1000
            L200,0
            Z
            "
            fill="#0F172A"
        />
        </svg>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">

        <div
          className="
            w-full
            max-w-lg
            rounded-[32px]
            border
            border-white/10
            bg-slate-900/90
            p-10
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          "
        >
          <h2 className="mb-2 text-3xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="mb-8 text-slate-400">
            Login to continue your fitness journey.
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-full
                  border
                  border-slate-700
                  bg-slate-800/80
                  px-5
                  py-3
                  text-white
                  placeholder-slate-500
                  transition
                  focus:border-violet-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-500/20
                "
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  rounded-full
                  border
                  border-slate-700
                  bg-slate-800/80
                  px-5
                  py-3
                  text-white
                  placeholder-slate-500
                  transition
                  focus:border-violet-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-violet-500/20
                "
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-violet-400 hover:text-violet-300"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-full
                bg-gradient-to-r
                from-fuchsia-600
                via-violet-600
                to-indigo-700
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-lg
                hover:shadow-violet-500/30
                disabled:opacity-60
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-violet-400 hover:text-violet-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;