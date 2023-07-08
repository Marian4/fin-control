(
    function (win, doc) {
        const $totalMoneyAmount = doc.querySelector('#totalMoneyAmount')
        const $addTransactionButton = doc.querySelector('#addTransactionButton')
        const $typeSelect = doc.querySelector('#type')
        const $moneyAmount = doc.querySelector('#amount')
        const $originField = doc.querySelector('#origin')
        const $destinationCategoryField = doc.querySelector('#destinationCategory')
        const $transactionDate = doc.querySelector('#date')

        doc.addEventListener('DOMContentLoaded', setCurrentlyMonth);
        
        $typeSelect.addEventListener('click', toggleEnabledField)

        $addTransactionButton.addEventListener('click', processTransaction)

        function toggleEnabledField (event) {
            event.preventDefault()

            if ($typeSelect.value == '+') { 
                $destinationCategoryField.value = 'default'
                $destinationCategoryField.disabled = true
                $originField.disabled = false
            }
            else if ($typeSelect.value == '-') {
                $destinationCategoryField.disabled = false
                $originField.disabled = true
                $originField.value = null
            }
        }

        function processTransaction (event) {
            if (!isTransactionValid(event)) return
            updateTotalMoneyAmount()
            addTransactionToList()
        }

        function isTransactionValid (event) {
            if($moneyAmount.value > $totalMoneyAmount.textContent && $typeSelect.value == "-") {
                event.preventDefault()
                alert("O valor de gasto não pode ser maior que o valor de saldo")
                return false
            }
            return true
        }

        function updateTotalMoneyAmount () {
            const newTotal = $typeSelect.value == '+' ? 
                parseFloat($totalMoneyAmount.textContent) + parseFloat($moneyAmount.value) :
                parseFloat($totalMoneyAmount.textContent) - parseFloat($moneyAmount.value)
            $totalMoneyAmount.textContent = formatMoneyValue(newTotal.toFixed(2))
        }

        function addTransactionToList () {
            $moneyAmount.value = parseFloat($moneyAmount.value).toFixed(2)

            const $history = doc.querySelector('#history').querySelector('table')

            const transaction = doc.createElement('tr')

            const fieldsValues = [
                $typeSelect.value,
                formatMoneyValue($moneyAmount.value),
                $originField.value || $destinationCategoryField.value,
                $transactionDate.value
            ]
            
            fieldsValues.forEach((fieldValue) => {
                const column = doc.createElement('td')
                column.textContent = fieldValue
                transaction.appendChild(column)
            })

            transaction.classList.add($typeSelect.value == '+' ? 'positive' : 'negative')
            $history.insertBefore(transaction, $history.firstChild)
        }

        function formatMoneyValue (value) {
            return value.toString().replace('.', ',')
        }

        function setCurrentlyMonth () {
            const $currentlyMonth = doc.querySelector('#currentlyMonth')
            const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

            $currentlyMonth.textContent = months[(new Date).getMonth()]
        }
    }
)(window, document)
