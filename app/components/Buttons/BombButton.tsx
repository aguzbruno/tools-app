import Image from "next/image";
import Bomb from "../../assets/bomb.svg";

interface BombButtonProps {
  onClick: () => void;
}
export default function BombButton({ onClick }: BombButtonProps) {
  return (
    <div onClick={onClick} className="cursor-pointer bg-red-200 rounded-full h-12 w-12 flex items-center justify-center pt-1">
      <Image
        height={25}
        width={25}
        src={Bomb}
        alt="Vaciar"
      />
    </div>
  );
}
