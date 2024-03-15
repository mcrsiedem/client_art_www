import { useNavigate } from "react-router-dom";
export default function Icon({className,logo,navi}){
    const navigate = useNavigate();
    return(
        <img
        className={className}
        src={logo}
        onClick={() => {
          navigate(navi);

        }}
        alt="Logo"
      />
    )
}