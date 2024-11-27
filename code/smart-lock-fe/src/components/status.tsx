import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
export default function status({
  type,
  num ,
}: {
  type: string,
  num: number,
}){
  
  const statusConfig: Record<string, { logo: React.ElementType; ty: string }> = {
    Temp: { logo: ThermostatIcon, ty: '°C' },
    Humidity: { logo: OpacityIcon, ty: '%' },
  };

  const decide = statusConfig[type];
  
 
  
    return (
      <div 
        style={squareStyle}
        className="text-panorama-blue border border-solid border-panorama-blue flex flex-col py-3 w-full h-52"
        >
          <div
          className="text-2xl font-semibold ">
            
             <decide.logo sx={{ fontSize: 42}}/> 
            {type}
          </div>
          <div
           
          className='w-full h-[100px] flex justify-center items-center text-center font-semibold text-3xl sm:text-4xl '>
            {num} {decide.ty}
          </div>
        
      </div>
    );
  }


  const squareStyle = {
    
    alignItems: 'left', 

    color: 'panorama-blue',
    padding : '12px',
    borderRadius: '12px',
    
  };


 