document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const passwordLengthInput = document.getElementById('passwordLength');
    const includeUppercaseCheckbox = document.getElementById('includeUppercase');
    const includeLowercaseCheckbox = document.getElementById('includeLowercase');
    const includeNumbersCheckbox = document.getElementById('includeNumbers');
    const includeSymbolsCheckbox = document.getElementById('includeSymbols');
    const generateButton = document.getElementById('generateButton');
    const generatedPasswordInput = document.getElementById('generatedPassword');
    const copyButton = document.getElementById('copyButton');
    const messageElement = document.getElementById('message');

    // Define os conjuntos de caracteres
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    // Função para gerar a senha
    const generatePassword = () => {
        const length = parseInt(passwordLengthInput.value);
        const includeUppercase = includeUppercaseCheckbox.checked;
        const includeLowercase = includeLowercaseCheckbox.checked;
        const includeNumbers = includeNumbersCheckbox.checked;
        const includeSymbols = includeSymbolsCheckbox.checked;

        let availableChars = '';
        let generatedPassword = '';
        let initialChars = []; // Para garantir que pelo menos um caractere de cada tipo selecionado esteja presente

        // Monta a string de caracteres disponíveis e garante pelo menos um de cada tipo
        if (includeUppercase) {
            availableChars += uppercaseChars;
            initialChars.push(uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]);
        }
        if (includeLowercase) {
            availableChars += lowercaseChars;
            initialChars.push(lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]);
        }
        if (includeNumbers) {
            availableChars += numberChars;
            initialChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
        }
        if (includeSymbols) {
            availableChars += symbolChars;
            initialChars.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
        }

        // Validação: Pelo menos um tipo de caractere deve ser selecionado
        if (availableChars.length === 0) {
            displayMessage('Selecione pelo menos um tipo de caractere!', 'error');
            generatedPasswordInput.value = '';
            return;
        }

        // Validação: O comprimento da senha deve ser maior ou igual ao número de tipos selecionados
        if (length < initialChars.length) {
            displayMessage(`O comprimento da senha deve ser no mínimo ${initialChars.length} para os tipos selecionados.`, 'error');
            generatedPasswordInput.value = '';
            return;
        }

        // Adiciona os caracteres iniciais garantidos
        generatedPassword = initialChars.join('');

        // Preenche o restante da senha
        for (let i = generatedPassword.length; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            generatedPassword += availableChars[randomIndex];
        }

        // Embaralha a senha para garantir a aleatoriedade dos caracteres iniciais
        generatedPassword = shuffleString(generatedPassword);

        generatedPasswordInput.value = generatedPassword;
        displayMessage(''); // Limpa a mensagem de erro
    };

    // Função para embaralhar uma string (algoritmo Fisher-Yates)
    const shuffleString = (str) => {
        let array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
        }
        return array.join('');
    };

    // Função para exibir mensagens ao usuário
    const displayMessage = (msg, type = 'info') => {
        messageElement.textContent = msg;
        messageElement.className = `message ${type}`; // Adiciona classe para estilização
    };

    // Adiciona o evento de clique ao botão Gerar Senha
    generateButton.addEventListener('click', generatePassword);

    // Adiciona o evento de clique ao botão Copiar
    copyButton.addEventListener('click', () => {
        if (generatedPasswordInput.value) {
            generatedPasswordInput.select(); // Seleciona o texto no input
            generatedPasswordInput.setSelectionRange(0, 99999); // Para mobile
            document.execCommand('copy'); // Copia o texto selecionado
            displayMessage('Senha copiada!', 'success'); // Exibe mensagem de sucesso
            setTimeout(() => displayMessage(''), 2000); // Limpa a mensagem após 2 segundos
        } else {
            displayMessage('Nenhuma senha para copiar!', 'info');
        }
    });

    // Gera uma senha inicial ao carregar a página
    generatePassword();
});