import { Link } from "react-router-dom";
import { useSignupViewModel } from "../../viewmodels/auth/SignupViewModel";
import fitnessIllustration from "../../assets/images/fitness-illustration.svg";

const SignupView = () => {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSignup,
  } = useSignupViewModel();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignup();
  };

  const inputClass =
    "w-full rounded-full border border-slate-700 bg-slate-800/80 px-5 py-3 text-white placeholder-slate-500 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20";

  return (
    <div className="min-h-screen bg-[#0F172A] flex overflow-hidden">

      {/* LEFT PANEL */}
      <div className="relative hidden lg:flex lg:w-[52%] overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#5B21B6] to-[#312E81] text-white p-16 flex-col">

        {/* Decorative Bars */}
        <div className="absolute top-20 left-16 w-56 h-4 rounded-full bg-white/10 rotate-45" />
        <div className="absolute top-40 left-28 w-80 h-6 rounded-full bg-white/5 rotate-45" />
        <div className="absolute bottom-20 right-10 w-64 h-4 rounded-full bg-white/10 -rotate-45" />

        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-3xl">
              🏋️
            </div>

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
            Create your account and begin tracking your health,
            nutrition, and fitness goals.
          </p>
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center">
          <img
            src={fitnessIllustration}
            alt="Fitness Illustration"
            className="w-full max-w-2xl"
          />
        </div>

        <div className="relative z-10">
          <p className="text-center text-white/70 text-sm">
            Build habits • Stay consistent • Reach your goals
          </p>
        </div>

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

        <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-slate-900/90 p-10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.6)]">

          <h2 className="mb-2 text-3xl font-bold text-white">
            Create Account
          </h2>

          <p className="mb-8 text-slate-400">
            Start your fitness journey today.
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="number"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                required
                className={inputClass}
              />

              <input
                type="number"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                required
                className={inputClass}
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-full bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-700 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-violet-400 hover:text-violet-300"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignupView;

