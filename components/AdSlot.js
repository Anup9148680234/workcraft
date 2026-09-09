export default function AdSlot({ type = "banner" }) {
  const sizes = {
    banner: "h-24",
    sidebar: "h-64",
    feed: "h-32",
  };

  return (
    <div
      className={`${sizes[type]} w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center`}
    >
      <span className="text-xs font-medium tracking-widest text-gray-400">
        ADVERTISEMENT
      </span>
    </div>
  );
}