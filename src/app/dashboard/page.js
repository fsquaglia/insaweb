"use client";
import { Timestamp } from "firebase/firestore";
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
  addNewContactFirestore,
  addNewProductFirestore,
} from "../../utils/firebase/fetchFirebase";

const dataContactInitial = [
  {
    nombreContacto: "Fernando Squaglia",
    sobrenombre: "tucho",
    direccion: "Calle 1234",
    localidad: "San Cristóbal",
    provincia: "Santa Fe",
    email: "fernandosquaglia@gmail.com",
    celTE: "543408670000",
    saldo: 0,
  },
  {
    nombreContacto: "Nombre1 Apellido1",
    sobrenombre: "loco 1",
    direccion: "Calle 321",
    localidad: "San Cristóbal",
    provincia: "Santa Fe",
    email: "email@email.com",
    celTE: "543408671111",
    saldo: 0,
  },
  {
    nombreContacto: "Nombre2 Apellido2",
    sobrenombre: "loco 2",
    direccion: "Calle 555",
    localidad: "San Cristóbal",
    provincia: "Santa Fe",
    email: "email3@email.com  ",
    celTE: "543408675555",
    saldo: 0,
  },
  {
    nombreContacto: "Nombre4 Apellido4",
    sobrenombre: "loco 4",
    direccion: "Calle 999",
    localidad: "San Cristóba",
    provincia: "Santa Fe",
    email: "email999@com.com",
    celTE: "543408678877",
    saldo: 0,
  },
];

const dataProductInitial = [
  {
    articulo: "14545",
    color: ["Negro", "Suela"],
    data1: "Algún dato extra",
    data2: "Algún dato extra 2",
    fechaCompra: Timestamp.fromDate(new Date("2024-06-06")),
    imagen: [
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/products%2FKids%2F20220331_120224.jpg?alt=media&token=11f991c4-1c4d-4bb2-9cd2-7c1da3d20bcc",
    ],
    marca: "Puerto Blue",
    Modelo: "Milan",
    nombre: "Zapato de vestir caballero Milan",
    num_talle: ["42", "44"],
    precioCompra: 100,
    precioVenta: 200,
    publicado: true,
    stock: 1,
    grupoValores: "Zapatos PB",
    idProducto: "productos/Caballeros/Calzado Caballeros/KIcFk5axys0ZpAuOHovr",
  },
  {
    articulo: "A1245",
    color: ["Negro"],
    data1: "Algún dato extraaaaa",
    data2: "Algún dato extraaaaa 2",
    fechaCompra: Timestamp.fromDate(new Date("2024-06-15")),
    imagen: [
      "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/products%2FKids%2F20220331_120224.jpg?alt=media&token=11f991c4-1c4d-4bb2-9cd2-7c1da3d20bcc",
    ],
    marca: "Meet Me",
    Modelo: "Milan",
    nombre: "Zapato de vestir caballero Milan",
    num_talle: ["42", "44"],
    precioCompra: 100,
    precioVenta: 200,
    publicado: false,
    stock: 1,
    grupoValores: "",
    idProducto: "productos/Caballeros/Calzado Caballeros/KIcFk5axys0ZpAuOHovr",
  },
];
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
    </div>
  );
}
