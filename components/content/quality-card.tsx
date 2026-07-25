import Image from 'next/image';

export function QualityCard({ title, description, image, alt }: { title: string; description: string; image: string; alt: string }) {
  return <article className="quality-card"><div className="quality-image"><Image src={image} alt={alt} fill sizes="(max-width: 800px) 100vw, 25vw" /></div><h3>{title}</h3><p>{description}</p></article>;
}
