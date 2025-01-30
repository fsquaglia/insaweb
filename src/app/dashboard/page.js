"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import ButtonGeneric from "../../components/generic/ButtonGeneric";
import {
  setProductsCategoryFirestore,
  setTipsCategoryFirestore,
  setTipsFirestore,
  loadDataInitFirebase,
  addNewContactFirestore,
  addNewProductFirestore,
  setNodoRealtime,
  createDocConfig,
  createDocHistory,
  actualizarUsuarios,
} from "../../utils/firebase/fetchFirebase";
import {
  aboutInitialData,
  historyInitialData,
  sloganInitialData,
  mainInitialData,
  teamInitialData,
  footerInitialData,
  contactInitialData,
  dataContactInitial,
  dataProductInitial,
  variationsInitialData1,
} from "@/utils/SettingInitialData";
import Swal from "sweetalert2";

export default function Page() {
  const [pointerEvent, setPointerEvent] = useState(true);
  const { data: session } = useSession();

  const handlerClickEnabled = async () => {
    const { value: email } = await Swal.fire({
      title: "Autorización necesaria",
      input: "email",
      inputLabel: "Ingresa tu email para desbloquear",
      inputPlaceholder: "nombre@servidor.com",
    });
    if (!email) return;

    if (email === session?.user?.email) {
      setPointerEvent(false);
    } else {
      Swal.fire("Email incorrecto");
    }
  };

  return (
    <div
      className={`relative m-10 flex flex-col gap-6 ${
        pointerEvent ? "opacity-50" : "opacity-100"
      }`}
    >
      {pointerEvent && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-white/70"
          onClick={handlerClickEnabled}
        >
          <p className="text-gray-700">
            Acciones bloqueadas. Haz clic para desbloquear.
          </p>
        </div>
      )}
      <div>
        <ButtonGeneric textButton={"Todos"} onClick={loadDataInitFirebase} />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Categ. Prod."}
          onClick={setProductsCategoryFirestore}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Categ. Tips"}
          onClick={setTipsCategoryFirestore}
        />
      </div>
      <div>
        <ButtonGeneric textButton={"Tips"} onClick={setTipsFirestore} />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Historia"}
          onClick={() => {
            setNodoRealtime("historia", historyInitialData);
          }}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Team"}
          onClick={() => {
            setNodoRealtime("team", teamInitialData);
          }}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton="About"
          onClick={() => {
            setNodoRealtime("about", aboutInitialData);
          }}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Contacto"}
          onClick={() => {
            setNodoRealtime("contacto", contactInitialData);
          }}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Main"}
          onClick={() => {
            setNodoRealtime("main", mainInitialData);
          }}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Eslogan"}
          onClick={() => {
            setNodoRealtime("eslogan", sloganInitialData);
          }}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Footer"}
          onClick={() => {
            setNodoRealtime("footer", footerInitialData);
          }}
        />
      </div>
      {/* <div>
        <ButtonGeneric
          textButton={"Contactos"}
          onClick={loadInitialContacts}
          fill={false}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Productos"}
          onClick={() =>
            loadInitialProd_Ofert(
              "productos",
              "Caballeros",
              "Calzado caballeros"
            )
          }
          fill={false}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Ofertas"}
          onClick={() => loadInitialProd_Ofert("ofertas", "", "")}
          fill={false}
        />
      </div> */}
      <hr />
      <span>
        Las variaciones son los colores, talles, marcas, grupos de precios, etc
      </span>
      <div>
        <ButtonGeneric
          textButton={"Variaciones"}
          onClick={() => setNodoRealtime("variaciones", variationsInitialData1)}
          fill={false}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Configuraciones"}
          onClick={() => createDocConfig()}
          fill={false}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"Crear doc Historial"}
          onClick={() => createDocHistory()}
          fill={false}
        />
      </div>

      <div>
        <ButtonGeneric
          textButton={"Actualizar Usuarios"}
          onClick={() => actualizarUsuarios()}
          fill={false}
        />
      </div>
    </div>
  );
}
