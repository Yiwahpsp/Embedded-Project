export default function Button({
  variant,
  children,
  wFull,
  className,
  onClick,
  type,
  isSmall,
  disabled
}: {
  variant: string,
  children: React.ReactNode,
  wFull?: boolean,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  type?: 'submit' | 'reset' | 'button' | undefined,
  isSmall?: boolean,
  disabled?: boolean
}) {
  let style = 'border-panorama-blue bg-panorama-blue text-ambrosia-ivory'

  if (variant.toLowerCase() === 'secondary') {
    style = 'border-panorama-blue bg-ambrosia-ivory text-panorama-blue'
  } else if (variant.toLowerCase() === 'danger') {
    style = 'border-danger bg-danger text-ambrosia-ivory'
  }

  return (
    <>
      {
        isSmall ?

          <button
            type={type}
            className={`mx-auto border-1 border max-w-lg rounded-2xl text-base md:text-lg py-2 px-4 flex flex-row justify-center items-center gap-1 
              ${style} ${className} 
              ${wFull ? 'w-full' : null}`}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
          : <button
            type={type}
            className={`mx-auto border-1 border max-w-lg rounded-2xl text-lg md:text-xl py-3 px-7 flex flex-row justify-center items-center gap-1 
              ${style} ${className} 
              ${wFull ? 'w-full' : null}`}
            onClick={onClick}
            disabled={disabled}
          >
            {children}
          </button>
      }
    </>
  );
}