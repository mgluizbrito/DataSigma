export default function initOutputsGlobal(): void {

    const menuTableBtn = document.getElementById('menu-table') as HTMLButtonElement;
    const menuTextBtn = document.getElementById('menu-text') as HTMLButtonElement;
    const menuClassBtn = document.getElementById('menu-class') as HTMLButtonElement;

    menuTableBtn.onclick = () => window.location.href = '/DataSigma/table/';
    menuTextBtn.onclick = () => window.location.href = '/DataSigma/text/';
    menuClassBtn.onclick = () => window.location.href = '/DataSigma/classe/';
}