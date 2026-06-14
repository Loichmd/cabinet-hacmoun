export default function Marquee({ items }: { items: string[] }) {
  return (
    <section className="border-y border-hairline bg-linen py-5 overflow-hidden">
      <div className="flex w-max marquee">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex items-center"
            aria-hidden={dup === 1}
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 px-8 text-[0.72rem] uppercase tracking-[0.22em] text-mute"
              >
                {item}
                <span className="h-1 w-1 rotate-45 bg-champagne" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
