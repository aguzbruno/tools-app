import Image from "next/image";
import Header from "./components/Header";
import SuperList from "./components/Super/SuperList";

export default function Home() {
  return (
    <div className="m-auto flex justify-center">

    
    <div className="flex flex-col justify-center items-start m-auto mt-10">
      <div className="flex flex-col "><p className="font-bold text-2xl">Lunes</p><p> Fiaca</p></div>
      <div className="flex flex-col"><p className="font-bold text-2xl">Martes</p><p>Agus Gym</p><p>Playa 11 a 17</p> </div>
      <div className="flex flex-col">
        <p className="font-bold text-2xl">Miercoles</p> <p>Corremos</p><p>Agus Gym</p> <p>Gala Súper</p>
      </div>
      <div className="flex flex-col"><p className="font-bold text-2xl">Jueves</p><p>Playa 8-9 a 17</p> </div>
      <div className="flex flex-col"><p className="font-bold text-2xl">Viernes</p> <p>Corremos</p> <p>Agus Gym</p> </div>
      <div className="flex flex-col"><p className="font-bold text-2xl">Sabado</p> <p>Playa 8-9 a 17</p><p>Agus Super</p></div>
      <div className="flex flex-col"><p className="font-bold text-2xl">Domingo</p> <p>Playa 8-9 a 17</p></div>
    </div>
    </div>
  );
}
