// script.js
const flexContainer = document.getElementById('flex-container');
const codeDisplay = document.getElementById('code-display');
const alignButtons = document.querySelectorAll('.controls button');
const dirButtons = document.querySelectorAll('.dir-btn');
const mainAxis = document.getElementById('main-axis');
const crossAxis = document.getElementById('cross-axis');

// Remove a classe active de todos os botões
function removeActiveClasses(buttons) {
    buttons.forEach(button => {
        button.classList.remove('active');
    });
}

// Configura o evento de clique para os botões de align-items
alignButtons.forEach(button => {
    button.addEventListener('click', function() {
        removeActiveClasses(alignButtons);
        this.classList.add('active');
        
        const alignValue = this.id;
        flexContainer.style.alignItems = alignValue;
        updateCodeDisplay(alignValue);
    });
});

// Configura o evento de clique para os botões de direção
dirButtons.forEach(button => {
    button.addEventListener('click', function() {
        removeActiveClasses(dirButtons);
        this.classList.add('active');
        
        const direction = this.id === 'row-dir' ? 'row' : 'column';
        flexContainer.style.flexDirection = direction;
        
        // Atualiza as informações do eixo
        if (direction === 'row') {
            mainAxis.textContent = 'Eixo Principal → Horizontal';
            crossAxis.textContent = 'Eixo Transversal ↓ Vertical';
        } else {
            mainAxis.textContent = 'Eixo Principal ↓ Vertical';
            crossAxis.textContent = 'Eixo Transversal → Horizontal';
        }
        
        updateCodeDisplay(document.querySelector('.controls button.active').id);
    });
});

// Atualiza o display de código
function updateCodeDisplay(alignValue) {
    const direction = flexContainer.style.flexDirection || 'row';
    
    let code = `.flex-container {
    display: flex;
    flex-direction: ${direction};
    align-items: ${alignValue};`;

    // Adiciona comentários explicativos
    switch(alignValue) {
        case 'stretch':
            code += '\n    /* Itens esticam para preencher o contêiner */';
            break;
        case 'flex-start':
            code += '\n    /* Itens alinhados no início do eixo transversal */';
            break;
        case 'flex-end':
            code += '\n    /* Itens alinhados no final do eixo transversal */';
            break;
        case 'center':
            code += '\n    /* Itens centralizados no eixo transversal */';
            break;
        case 'baseline':
            code += '\n    /* Itens alinhados pela linha de base do texto */';
            break;
    }
    
    code += '\n}';
    
    codeDisplay.textContent = code;
}

// Inicializa com stretch
document.getElementById('stretch').classList.add('active');