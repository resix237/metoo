import ButtonMenu from "@/components/ui/ButtonMenu";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" xl:px-64 px-10 lg:px-32 transition-all ease-in-out duration-100">

      <div className="flex w-full justify-between py-10 place-items-center">
        <h1 className=" font-Montserrat text-white text-xl font-light uppercase  ">
          Marc Fouda
        </h1>

        <ButtonMenu />

      </div>
      <div className=" grid grid-cols-2 pt-20" >
        <div className=" text-6xl text-white font-Montserrat " >
          <span> Hi</span> <span>I'm</span> <span>Marc</span> <span>Fouda</span>,
          <br /><span>But</span> <span>You</span> <span>can</span> <span>call</span> <span>me</span> <span>Resix</span>
        </div>
      </div>
    </main>
  );
}
