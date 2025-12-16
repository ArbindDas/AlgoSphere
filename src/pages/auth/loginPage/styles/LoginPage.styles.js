export const styles = {
  container: "min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden",
  floatingElements: {
    top: "fixed top-1/4 left-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl",
    bottom: "fixed bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl"
  },
  layout: "relative min-h-screen flex items-center justify-center p-4",
  grid: "w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center",
  
  // Left side
  leftSide: "hidden lg:block space-y-8",
  welcomeBadge: "inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg",
  title: "text-5xl md:text-6xl font-bold text-gray-800 mb-6",
  subtitle: "text-xl text-gray-600 mb-8",
  
  // Right side
  formContainer: "max-w-md mx-auto",
  formCard: {
    glow: "absolute inset-0 bg-linear-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20",
    card: "relative bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-2xl shadow-black/10"
  },
  header: "text-center mb-8",
  logoContainer: "w-20 h-20 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30",
  
  // Form elements
  divider: "flex items-center my-6",
  dividerLine: "flex-1 h-px bg-gray-300",
  dividerText: "px-4 text-gray-500 text-sm",
  
  rememberMe: "flex items-center gap-2 cursor-pointer",
  checkbox: "w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500",
  
  submitButton: "w-full py-4 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed",
  
  signupLink: "text-center mt-8 pt-6 border-t border-gray-200",
  statsContainer: "grid grid-cols-3 gap-4 mt-8",
  statItem: "text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm"
};

export const statsData = [
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
];