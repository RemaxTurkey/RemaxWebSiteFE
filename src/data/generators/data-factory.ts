import RemaxService from "../providers/remaxService";

function generateData() {
    return RemaxService.getInstance();
}

export default generateData;