export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant = "default",
}) {
  const variants = {
    default: "bg-white border-slate-200",
    green: "bg-emerald-50 border-emerald-100",
    red: "bg-red-50 border-red-100",
    blue: "bg-blue-50 border-blue-100",
    amber: "bg-amber-50 border-amber-100",
  };

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm ${
        variants[variant] || variants.default
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}