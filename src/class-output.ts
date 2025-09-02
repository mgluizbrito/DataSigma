const tableBody= document.querySelector('#classes-table-body') as HTMLDivElement;

function addRow(): void {

    const row = document.createElement('div');

    row.className = 'class-row';
    row.style.marginBottom = '0.5rem';

    row.innerHTML = `
        <div>
            <input type="number" value="0.0" class="input-field">
        </div>
        <div>
            <input type="number" value="0.0" class="input-field">
        </div> 
        <div>
            <input type="number" value="1" class="input-field">
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
}

// Função para remover uma linha da tabela
function removeRow(button: HTMLButtonElement): void {
    const row = button.closest('.table-row');
    if (row) {
        row.remove();
    }
}

export default function initClasseOutput(): void {
    addRow();

    document.querySelector('.add-row-button')?.addEventListener('click', addRow);
}