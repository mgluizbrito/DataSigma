const tableBody= document.querySelector('#classes-table-body') as HTMLDivElement;

function addRow(): void {

    const row = document.createElement('div');

    row.className = 'class-row';
    row.style.marginBottom = '0.5rem';

    row.innerHTML = `
        <div>
            <input type="number" placeholder="Li" class="input-field li-field">
        </div>
        <div>
            <input type="number" placeholder="Ls" class="input-field ls-field">
        </div> 
        <div>
            <input type="number" placeholder="Fi" class="input-field fi-field">
        </div>
        <div></div>
        <div style="text-align: right;">
            <button class="remove-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;

    // Adiciona o evento de clique após criar o botão
    const removeButton = row.querySelector('.remove-button') as HTMLButtonElement | null;
    if (removeButton) {
        removeButton.addEventListener('click', () => removeRow(removeButton));
    }

    tableBody.appendChild(row);

    const newLiField = row.querySelector('.li-field') as HTMLInputElement;
    const newLsField = row.querySelector('.ls-field') as HTMLInputElement;

    if (document.querySelectorAll('.class-row')?.length > 1) {
        newLiField.value = (document.querySelector('#classes-table-body .class-row:nth-last-child(2) .ls-field') as HTMLInputElement).value || '';
        if (newLsField) newLsField.focus();
    
    } else if (newLiField) newLiField.focus();

    const newFiField = row.querySelector('.fi-field') as HTMLInputElement;
    newFiField.addEventListener('keydown', event => { if (event.key === 'Enter') addRow() });

}

// Função para remover uma linha da tabela
function removeRow(button: HTMLButtonElement): void {
    const row = button.closest('.class-row');
    if (row) row.remove();
}

export default function initClasseOutput(): void {
    addRow();

    document.querySelector('.add-row-button')?.addEventListener('click', addRow);
}