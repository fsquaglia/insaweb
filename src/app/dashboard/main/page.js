"use client";
import HeaderCustomize from "@/ui/HeaderCustomize";
import IntroCustomize from "@/ui/IntroCustomize";
import Input from "@/ui/input";
import ButtonDashboard from "@/ui/ButtonDashboard";

export default function Page() {
  const titulo = "Sección Principal";
  const description =
    "Aquí podrás configurar la sección principal de tu página, tanto los textos como la imagen de fondo.";

  return (
    <div className="container border flex flex-col justify-center text-center">
      <HeaderCustomize titulo={titulo} />

      <IntroCustomize description={description} />
      <div className="flex justify-center">
        <div className="w-80 flex flex-col">
          <Input
            labelText="Primera línea"
            inputValue="primera"
            charLimit={25}
          />
          <Input
            labelText="Segunda línea"
            inputValue="segunda"
            charLimit={25}
          />
          <Input
            labelText="Tercera línea"
            inputValue="tercera"
            charLimit={40}
          />
          <ButtonDashboard />
        </div>
      </div>
    </div>
  );
}
