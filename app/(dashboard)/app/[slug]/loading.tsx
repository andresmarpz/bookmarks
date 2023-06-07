export default function Loading() {
  const skeletons = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className="mt-2 flex flex-col gap-2">
      {skeletons.map((_, i) => (
        <div
          key={"skeleton" + i}
          className="w-100 h-16 rounded bg-neutral-700 animate-in slide-in-from-top-1"
        />
      ))}
    </div>
  )
}
