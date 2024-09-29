"use client";
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

import {
  getVariationsFromStorage,
  getCodeToUse,
} from "@/utils/local_session_storage.js/local_session_storage";

export default function Page() {
  //cargamos algunos contactos en Firestore para inicializar
  const loadInitialContacts = async () => {
    try {
      await Promise.all(
        dataContactInitial.map(async (elem) => {
          await addNewContactFirestore(elem);
        })
      );
      console.log("Listo");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //cargamos algunos Productos y Ofertas en Firestore para inicializar
  const loadInitialProd_Ofert = async (coleccion, categoria, subCategoria) => {
    try {
      await Promise.all(
        dataProductInitial.map(async (elem) => {
          await addNewProductFirestore(
            coleccion,
            categoria,
            subCategoria,
            elem
          );
        })
      );
      console.log("Listo");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="m-10 flex flex-col gap-6">
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
      <div>
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
      </div>
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
          textButton={"get variations"}
          onClick={async () => {
            const variations = await getVariationsFromStorage();
            console.log(variations);
          }}
          fill={false}
        />
      </div>
      <div>
        <ButtonGeneric
          textButton={"get code"}
          onClick={async () => {
            const code = await getCodeToUse();
            console.log(code);
          }}
          fill={false}
        />
      </div>
    </div>
  );
}
