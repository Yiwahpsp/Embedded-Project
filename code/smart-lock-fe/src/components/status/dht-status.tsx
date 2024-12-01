import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';

interface DHTStatusProps {
  type: 'Temperature' | 'Humidity'; // Restrict type to valid keys
  num: number;
  disabled: boolean;
}

export default function DHTStatus({
  type,
  num,
  disabled
}: DHTStatusProps) {
  const statusConfig: Record<string, { logo: React.ElementType; ty: string }> = {
    Temperature: { logo: ThermostatIcon, ty: '°C' },
    Humidity: { logo: OpacityIcon, ty: '%' },
  };

  const decide = statusConfig[type];

  // Fallback check if type is invalid
  if (!decide) {
    return <div>Invalid type</div>;
  }

  const { logo: Icon, ty } = decide; // Destructure for clarity

  return (
    <div
      style={squareStyle}
      className="flex flex-col border-panorama-blue bg-secondary py-3 border border-solid rounded-xl w-full text-panorama-blue aspect-square"
    >
      <div className="flex items-center gap-1 font-semibold text-wrap text-xl md:text-2xl">
        <Icon sx={{ fontSize: 32 }} />
        <div className='flex flex-col gap-0'>
          <p className='line-clamp-1 overflow-hidden'>{type === 'Temperature' ? 'Temp' : 'Humid'}</p>
        </div>
      </div>
      <div className="flex flex-grow justify-center items-center w-full font-semibold text-3xl text-center md:text-4xl">
        {num} {ty}
      </div>
    </div>
  );
}

const squareStyle: React.CSSProperties = {
  alignItems: 'flex-start', // 'left' is invalid, replaced with 'flex-start'
  color: 'panorama-blue',
  padding: '12px',
};
