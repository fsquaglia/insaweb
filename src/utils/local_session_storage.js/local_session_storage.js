import {
  getDocConfig,
  getNodoRealtime,
  getUpdateCodeProd,
  updateDocInCollection,
} from "../firebase/fetchFirebase";

export const getVariationsFromStorage = async () => {
  // Primero comprobar si está almacenado en sessionStorage
  let variations = {};
  //   console.log("Revisando sessionStorage");

  const storedVariations = sessionStorage.getItem("variations");

  if (storedVariations) {
    console.log("Datos encontrados en sessionStorage");

    try {
      variations = JSON.parse(storedVariations);
    } catch (error) {
      console.warn(
        "Datos no son válidos en sessionStorage. Asignando un objeto vacío.",
        error
      );
      variations = {}; // Asignar un objeto vacío si no es parseable
    }

    // Verificamos si es un objeto vacío
    if (Object.keys(variations).length === 0) {
      console.log("Variations está vacío, obteniendo datos desde Firestore");
    } else {
      return variations; // Retornamos si ya hay datos válidos
    }
  }

  // Si no hay datos o si variations es un objeto vacío, obtenemos los datos de Firestore
  //   console.log("Obteniendo datos desde Firestore");

  try {
    const nodeVariations = await getNodoRealtime("variaciones");

    // Verificar si nodeVariations es un objeto, si no lo es, asignar un objeto vacío
    if (
      nodeVariations &&
      typeof nodeVariations === "object" &&
      Object.keys(nodeVariations).length > 0
    ) {
      Object.keys(nodeVariations).forEach((key) => {
        variations[key] = nodeVariations[key].data;
      });
      variations = transformVariations(variations);

      // Almacenamos los datos actualizados en sessionStorage solo si hay datos
      if (Object.keys(variations).length > 0) {
        sessionStorage.setItem("variations", JSON.stringify(variations));
      } else {
        console.warn(
          "No se almacenaron datos en sessionStorage debido a que variations está vacío."
        );
      }
    } else {
      console.warn(
        "Datos obtenidos no son válidos. Asignando un objeto vacío."
      );
      variations = {};
    }
  } catch (error) {
    console.error("Error al obtener las variaciones de Realtime:", error);
  }

  return variations;
};

const transformVariations = (variations) => {
  const transformedVariations = {};

  // Iteramos sobre todas las propiedades del objeto variations
  Object.keys(variations).forEach((key) => {
    if (key === "grupoDeValores") {
      // Tratamos "grupoDeValores" de manera especial
      transformedVariations[key] = variations[key].map((item) => ({
        IDgrupoDeValores: item.IDgrupoDeValores,
        grupoDeValores: item.grupoDeValores,
      }));
    } else {
      // Para cualquier otra propiedad, la transformamos a un array de strings
      transformedVariations[key] = variations[key].map(
        (item) => Object.values(item)[0]
      );
    }
  });

  return transformedVariations;
};

export const getCodeToUse = async () => {
  // Comprobar si hay algo en sessionStorage
  let codeToUse;
  let blockCode = null;

  try {
    const storedValue = sessionStorage.getItem("codeProduct");
    if (storedValue) {
      blockCode = JSON.parse(storedValue);
    }
  } catch (error) {
    console.error("Error parsing JSON from sessionStorage:", error);
  }

  // Si blockCode es null o inválido, se obtiene un nuevo bloque de la BDD
  if (!blockCode || !blockCode.from || !blockCode.to) {
    console.log("Nada en session o datos inválidos, trayendo bloque de la BDD");
    blockCode = await getBlockToUse();
    sessionStorage.setItem("codeProduct", JSON.stringify(blockCode));
  }

  // Comprobar si llegamos al límite del bloque
  if (blockCode.from[1] === blockCode.to[1]) {
    console.log("llegué al límite");
    codeToUse =
      "" + blockCode.from[0] + ("00000" + blockCode.from[1]).slice(-5);

    // Obtener un nuevo bloque
    blockCode = await getBlockToUse();
    sessionStorage.setItem("codeProduct", JSON.stringify(blockCode));
  } else {
    // Otorgar el código
    codeToUse =
      "" + blockCode.from[0] + ("00000" + blockCode.from[1]).slice(-5);

    // Aumentar el código en uso
    const newBlockCode = {
      from: [blockCode.from[0], blockCode.from[1] + 1],
      to: [blockCode.to[0], blockCode.to[1]],
    };

    sessionStorage.setItem("codeProduct", JSON.stringify(newBlockCode));
  }

  return codeToUse;
};

// solicitar un nuevo bloque de Firebase y actualizar la BDD
const getBlockToUse = async () => {
  //solicitar el documento de configuraciones a Firestore
  //codProdBloque:15 --- codProdEnUso: 0 --- codProdPrefijo: "AA"
  try {
    let docConfig = await getUpdateCodeProd();
    const codeBlock = {
      from: [docConfig.codProdPrefijo, docConfig.codProdEnUso + 1],
      to: [
        docConfig.codProdPrefijo,
        docConfig.codProdEnUso + docConfig.codProdBloque,
      ],
    };
    return codeBlock;
  } catch (error) {
    console.error("Error al obtener el bloque de código ", error);
    throw new Error("Error al obtener el bloque de código ");
  }
};

//obtener el documento de configuraciones y guardarlo en sessionStorage
const getConfigToUse = async () => {
  try {
    let docConfig = await getDocConfig();
    sessionStorage.setItem("configurations", JSON.stringify(docConfig));
    return docConfig;
  } catch (error) {
    console.error("Error al obtener la configuración ", error);
    throw new Error("Error al obtener la configuración ");
  }
};
//obtener el documento de configuraciones de sessionStorage
const getConfigFromStorage = () => {
  let config = {};
  const storedConfig = sessionStorage.getItem("configurations");

  if (storedConfig) {
    try {
      config = JSON.parse(storedConfig);
    } catch (error) {
      console.warn(
        "Datos no son válidos en sessionStorage. Asignando un objeto vacío.",
        error
      );
      config = {}; // Asignar un objeto vacío si no es parseable
    }
  }

  return config;
};

// obtener el documento de configuraciones de sessionStorage o de BDD si no se entuentra en sessionStorage
export const getConfig = async () => {
  let config = getConfigFromStorage();
  if (Object.keys(config).length === 0) {
    config = await getConfigToUse();
  }

  return config;
};

//actualizar el documento de configuraciones en sessionStorage y en la BDD. Recibir datos como {key: value, key:value}
export const updateConfig = async (onlyUpdateData) => {
  // Recuperar el objeto almacenado en sessionStorage
  let storedObject = JSON.parse(sessionStorage.getItem("configurations"));

  // Verificar que onlyUpdateData sea un objeto y que contenga propiedades
  if (onlyUpdateData && typeof onlyUpdateData === "object") {
    // Iterar sobre las propiedades del objeto para actualizar las correspondientes en storedObject
    Object.keys(onlyUpdateData).forEach((key) => {
      const value = onlyUpdateData[key];

      // Actualizar el objeto almacenado con el nuevo valor
      if (key in storedObject) {
        storedObject[key] = value;
      }
    });
  }

  // Guardar el objeto actualizado nuevamente en sessionStorage
  sessionStorage.setItem("configurations", JSON.stringify(storedObject));

  // Incluir la lógica para actualizar también en la base de datos
  try {
    await updateDocInCollection(
      "configuraciones",
      "configuraciones",
      onlyUpdateData
    );
    console.log("Configuración actualizada");
  } catch (error) {
    console.error("Error al actualizar la configuración: ", error);
    throw new Error("Error al actualizar la configuración");
  }
};
