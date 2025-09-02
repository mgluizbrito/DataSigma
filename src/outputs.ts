export default function initOutputs(): void {

    const menuTableBtn = document.getElementById('menu-table') as HTMLButtonElement;
    const menuTextBtn = document.getElementById('menu-text') as HTMLButtonElement;
    const menuClassBtn = document.getElementById('menu-class') as HTMLButtonElement;

    menuTableBtn.onclick = () => window.location.href = '/DataSigma/public/table/';
    menuTextBtn.onclick = () => window.location.href = '/DataSigma/public/text/';
    menuClassBtn.onclick = () => window.location.href = '/DataSigma/public/classe/';
}