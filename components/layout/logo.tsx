import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link href="/" className="header-logo" aria-label="Wardro home">
      <Image
        src="/images/brand/wardro-logo-terracotta.png"
        alt="Wardro — More Space, Less Chaos"
        width={836}
        height={199}
        priority
      />
    </Link>
  );
}

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Wardro home">
      <span className="logo-mark">
        <i />
        <i />
      </span>
      <span>
        <b>WARDRO</b>
        <small>More Space · Less Chaos</small>
      </span>
    </Link>
  );
}
