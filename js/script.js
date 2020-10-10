
// передаем тип и значения, фильтруем только те значения, которые соотв переданному типу
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	// перебираем блоки с ошибкой и верные и выключаем их
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	// общая функция для вывода блока в зависимости от переданных параметров
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
	// изначально выключены
		hideAllResponseBlocks();
		// в зависимости от переданного айди включаем нужный блок
		document.querySelector(blockSelector).style.display = 'block';
		// если ошибка или ок, то в зависимости от этого вставляем в спан нужное сообщение
		if (spanSelector) {
			//
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	// передаем параметры на ошибку: класс для блока error, сообщение для error по умолчанию, если хотим добавить свое,
	// вводим нужный текст, айди спана
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// передаем параметры на ок: класс для блока ок, сообщение, айди спана
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// передаем параметры на ок: класс для блока ок, сообщение, айди спана
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	tryFilterByType = (type, values) => {
		try {
			// массив введенных значений, в зависимости от выбранного типа проверяем с помощью выполнения
			// функции filterByType (запуская метод eval) есть ли среди значений равные нашему типу
			// преобразовываем в строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			console.log(valuesArray);
			console.log(typeof valuesArray);
			console.log(valuesArray.length);
			// если длина массива не нулевая (то есть мы нашли значения соотв типа, то выводим
			// эту строку полученных значений)
			// иначе выводим соотв сообщение и с указанием выбранного типа
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			// вызываем функцию, чтобы вывести оформление блока и передаем в него нужную информацию функцией alertMsg
			showResults(alertMsg);
		} catch (e) {
			// обрабатываем ошибку
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn');

// на кнопку вешаем слушатель на клик
filterButton.addEventListener('click', e => {
	// объявляем инпуты с типом и с вводимыми данными
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	// если не ввели значение, выводим соотв сообщение
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// вызываем функцию с выводом результатов
		showNoResults();
	} else {
		// очищаем форму
		dataInput.setCustomValidity('');
		// предотвращаем перезагрузку страницы
		e.preventDefault();
		// передаем значения в функцию, которая будет выполнять проверку на соотв значения и типа
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

