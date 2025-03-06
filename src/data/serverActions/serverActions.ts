//NOTE: burasi client tarafindan server actionlarinin cagirilmasi icin kullanilir.
"use server"
import generateData from "../generators/data-factory";


//NOTE: bu server action client tarafindan cagirilir.
export const getExample = async () => {
    const dataProvider = generateData();

    const response = await dataProvider.getExample();

    return response;
}