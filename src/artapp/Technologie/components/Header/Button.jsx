import { useNavigate } from "react-router-dom";
export default function Button({className,logo,navi}){
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