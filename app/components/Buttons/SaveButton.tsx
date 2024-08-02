import Image from "next/image";
import Save from "../../assets/save.svg";

interface SaveButtonProps {
  onClick: () => void;
}
export default function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <div  onClick={onClick} className="cursor-pointer bg-green-300 rounded-full h-12 w-12 flex items-center justify-center pt-1">
      <Image
        height={25}
        width={25}
        src={Save}
        alt="Guardar"
      />
    </div>
  );
}
