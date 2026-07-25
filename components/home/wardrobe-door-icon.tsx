export type WardrobeDoorIconType =
  | "one-door"
  | "two-door"
  | "three-door"
  | "four-door"
  | "sliding";

type WardrobeDoorIconProps = {
  type: WardrobeDoorIconType;
  className?: string;
};

export function WardrobeDoorIcon({
  type,
  className,
}: WardrobeDoorIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {type === "sliding" ? (
        <>
          <rect x="3.5" y="2.5" width="25" height="27" rx="1.5" />
          <path d="M4 3h14v26H4M14 3h14v26H14" />
          <path d="M15.2 15.9h1.4M19.1 15.9h1.4" />
          <path d="m8.5 27 3-2.5M23.5 27l-3-2.5" opacity=".55" />
        </>
      ) : (
        <>
          <rect x="3.5" y="2.5" width="25" height="27" rx="1.5" />
          {type === "two-door" && <path d="M16 3v26" />}
          {type === "three-door" && <path d="M12 3v26M20 3v26" />}
          {type === "four-door" && <path d="M9.75 3v26M16 3v26M22.25 3v26" />}
          {type === "one-door" && <path d="M23.5 15.7h.2" />}
          {type === "two-door" && <path d="M13.8 15.7h.2M18 15.7h.2" />}
          {type === "three-door" && <path d="M10.2 15.7h.2M15.8 15.7h.2M21.5 15.7h.2" />}
          {type === "four-door" && <path d="M8.1 15.7h.2M14.2 15.7h.2M17.7 15.7h.2M23.8 15.7h.2" />}
        </>
      )}
      <path d="M6 29.5v1M26 29.5v1" />
    </svg>
  );
}
