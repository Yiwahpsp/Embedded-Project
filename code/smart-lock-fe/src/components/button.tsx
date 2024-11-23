export default function Button({
  variant,
  children,
  wFull,
  className,
  onClick,
}: {
  variant: string,
  children: React.ReactNode,
  wFull?: boolean,
  className?: string,
  onClick?: () => void,
}) {
  let style = 'border-panorama-blue bg-panorama-blue text-ambrosia-ivory'

  if (variant.toLowerCase() === 'secondary') {
    style = 'border-panorama-blue bg-ambrosia-ivory text-panorama-blue'
  } else if (variant.toLowerCase() === 'danger') {
    style = 'border-danger bg-danger text-ambrosia-ivory'
  }

  return (
    <button 
      className={`mx-auto border-1 border max-w-sm rounded-2xl text-xl px-7 py-4 flex flex-row justify-center items-center gap-1 ${style} ${className} ${wFull ? 'w-full' : null}`}
      onClick={onClick}
      >
      {children}
    </button>
  );
}