const SVG_SRC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Kotak bawah"><path d="M21 22H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM4 20h16V4H4z" /><path d="m12 17-5-5h3V7h4v5h3l-5 5z"/></g></svg>`;
interface Props {
  className?: string;
}
export default function DownArrow({ className }: Props) {
  return (
    <svg
      className={className}
      dangerouslySetInnerHTML={{
        __html: SVG_SRC,
      }}
    />
  );
}
