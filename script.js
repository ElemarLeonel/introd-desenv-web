// Adiciona um ouvinte de evento para o formulário com o id 'imcForm' quando ele é submetido
document.getElementById('imcForm').addEventListener('submit', function(event) {
    // Impede o comportamento padrão de envio do formulário, que é recarregar a página
    event.preventDefault();

    // Obtém os valores de peso e altura do formulário e os converte em números
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // Calcula o IMC (Índice de Massa Corporal) com base nos valores de peso e altura
    const imc = weight / (height * height);
    
    // Obtém o elemento onde o resultado do IMC será exibido
    const resultElement = document.getElementById('result');
    // Limpa o conteúdo atual do elemento de resultado
    resultElement.textContent = '';

    // Obtém a tabela de classificação de IMC
    const imcTable = document.getElementById('imcTable').getElementsByTagName('tbody')[0];
    // Obtém todas as linhas da tabela
    const rows = imcTable.getElementsByTagName('tr');

    // Percorre cada linha da tabela
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Obtém o intervalo de IMC e a classificação de cada linha da tabela
        const imcRange = row.getElementsByTagName('td')[0].textContent;
        const classification = row.getElementsByTagName('td')[1].textContent;

        // Divide o intervalo de IMC em valores mínimo e máximo
        const imcValues = imcRange.split(' - ');
        const minImc = parseFloat(imcValues[0]);
        const maxImc = imcValues[1] ? parseFloat(imcValues[1].replace(',', '.')) : undefined;

        // Verifica se o IMC calculado está dentro do intervalo de IMC da linha atual
        if ((minImc <= imc && imc < maxImc) || (!maxImc && minImc <= imc)) {
            // Se o IMC está dentro do intervalo, exibe o resultado no elemento de resultado
            resultElement.textContent = `Seu IMC é ${imc.toFixed(2)} (${classification})`;
            // Adiciona a classe 'highlight' à linha atual para destacá-la
            row.classList.add('highlight');
        } else {
            // Se o IMC não está dentro do intervalo, remove a classe 'highlight' da linha atual
            row.classList.remove('highlight');
        }
    }
});

// Adiciona um ouvinte de evento para o botão com o id 'clearBtn' quando é clicado
document.getElementById('clearBtn').addEventListener('click', function() {
    // Limpa o formulário, redefinindo-o para os valores padrão
    document.getElementById('imcForm').reset();
    // Limpa o conteúdo do elemento de resultado
    document.getElementById('result').textContent = '';
    // Obtém todas as linhas da tabela de classificação de IMC
    const rows = document.getElementById('imcTable').getElementsByTagName('tr');
    // Percorre todas as linhas da tabela e remove a classe 'highlight' de cada uma delas
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove('highlight');
    }
});
