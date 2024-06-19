"use client";
import ButtonGeneric from "../../components/generic/ButtonGeneric";
import {
  setProductsCategoryFirestore,
  setTipsCategoryFirestore,
  setTipsFirestore,
  setHistoryRealtime,
  setTeamRealtime,
  setAboutRealtime,
  setContactRealtime,
  setMainRealtime,
  setSloganRealtime,
  setFooterRealtime,
  loadDataInitFirebase,
} from "../../utils/firebase/fetchFirebase";

export default function Page() {
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
        <ButtonGeneric textButton={"Historia"} onClick={setHistoryRealtime} />
      </div>
      <div>
        <ButtonGeneric textButton={"Team"} onClick={setTeamRealtime} />
      </div>
      <div>
        <ButtonGeneric textButton={"About"} onClick={setAboutRealtime} />
      </div>
      <div>
        <ButtonGeneric textButton={"Contacto"} onClick={setContactRealtime} />
      </div>
      <div>
        <ButtonGeneric textButton={"Main"} onClick={setMainRealtime} />
      </div>
      <div>
        <ButtonGeneric textButton={"Eslogan"} onClick={setSloganRealtime} />
      </div>
      <div>
        <ButtonGeneric textButton={"Footer"} onClick={setFooterRealtime} />
      </div>
    </div>
  );
}
