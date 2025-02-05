import moment from "moment";
import { UseFormSetValue } from "react-hook-form";

export function formatDni(dni: string): string {
  let dniStr = dni?.toString();
  let dniReversed = dniStr?.split("").reverse().join("");
  let dniConPuntos = dniReversed?.match(/.{1,3}/g)?.join(".") || "";
  return dniConPuntos.split("").reverse().join("");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} `;
}
export function formatDateWithTime(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes} `;
}


export function getInitials(name: string, lastName: string): string {
  const nameInitial = name.charAt(0).toUpperCase();
  const lastNameInitial = lastName.charAt(0).toUpperCase();
  return `${nameInitial}${lastNameInitial}`;
}

// export const handleDateChange = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
//   setValue: UseFormSetValue<any>,
//   fieldName: string
// ) => {
//   const value = e.target.value;
//   const dateInArgentina = moment.tz(value, "America/Argentina/Buenos_Aires");
//   const formattedDateISO = dateInArgentina.toISOString();

//   setStartDate(new Date(value));
//   setValue(fieldName, formattedDateISO);
// };

export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}