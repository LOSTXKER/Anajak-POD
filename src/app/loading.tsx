export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-12 h-12 border-4 border-ci-blue border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 font-medium">กำลังโหลด...</p>
    </div>
  )
}
