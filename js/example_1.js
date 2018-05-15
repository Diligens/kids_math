var example_1 = {
    conditions: {
        a: [6, 9], // a ​​∈ [6, 9]
        abSum: [11, 14] // a+b ​∈ [11, 14]
    },
    numbersFromConditions: function () {
        let a = _.random(this.conditions.a[0], this.conditions.a[1]);
        let b = (_.random(this.conditions.abSum[0], this.conditions.abSum[1])) - a;
        let abSum = a + b;
        let range = {
            a: a,
            b: b,
            abSum: abSum
        };
        return range
    },
    viewExample: function (callback) {
        // сохраним в переменную сгенерированные числа
        let ourNumbers = this.numbersFromConditions();

        // создадим элементы для отображения примера
        let aElem = document.createElement("div");
        let plus = document.createElement("div");
        let bElem = document.createElement("div");
        let equally = document.createElement("div");
        let abSum = document.createElement("div");
        abSum.setAttribute("id", "example_sum");
        abSum.classList.add('example_sum');

        aElem.innerHTML = ourNumbers.a;
        plus.innerHTML = ' + ';
        bElem.innerHTML = ourNumbers.b;
        equally.innerHTML = ' = ';
        abSum.innerHTML = '?';

        // добавим элементы выражения в узел для примера
        let exampleBox = document.getElementById("example_box");
        exampleBox.appendChild(aElem);
        exampleBox.appendChild(plus);
        exampleBox.appendChild(bElem);
        exampleBox.appendChild(equally);
        exampleBox.appendChild(abSum);

        // обязательно передаём следующему шагу сгенерированные ранее числа
        callback(ourNumbers);
    },
    step1: function (ourNumbers) {
        let scale = document.getElementById('scale');
        let oneStep = scale.offsetWidth / 20;

        // создадим 1-ый инпут
        let input_1 = document.createElement('input');
        input_1.setAttribute("id", "input_1");
        input_1.classList.add("input");
        input_1.style.left = oneStep * ourNumbers.a / 2 + "px";


        // создадим 1-ую стрелку
        let arrow_1 = document.createElement('div');
        let arrow_1_end = document.createElement('div');
        arrow_1.setAttribute("id", "arrow_1");
        arrow_1.classList.add("arrow");
        arrow_1_end.classList.add('arrow_end');
        arrow_1.appendChild(arrow_1_end);
        arrow_1.style.width = ourNumbers.a * oneStep + "px";

        // добавим 1-ые инпут и стрелку в узел scale
        scale.appendChild(input_1);
        scale.appendChild(arrow_1);
        input_1.focus(); // установим автофокус для инпута

        // прослушиваем ответы пользователя и описываем условие
        input_1.oninput = function() {
            let answer_1 = input_1.value;
            let last_symbol_answer_1 = answer_1.charAt(answer_1.length - 1);
            let example_box = document.getElementById("example_box");
            input_1.value = last_symbol_answer_1;
            if(last_symbol_answer_1 == ourNumbers.a) {
                console.log('правильный ответ!');
                input_1.setAttribute("disabled", "");
                example_box.children[0].classList.remove("example_error");
                input_1.classList.remove("input_error");
                input_1.style.border = "none";

                example_1.step2(ourNumbers);
            } else {
                example_box.children[0].classList.add("example_error");
                input_1.classList.add("input_error");
                console.log('не верно...');
            }
        };
    },
    step2: function (ourNumbers) {
        let scale = document.getElementById('scale');
        let oneStep = scale.offsetWidth / 20;

        // создадим 2-ой инпут
        let input_2 = document.createElement('input');
        input_2.setAttribute("id", "input_2");
        input_2.classList.add("input");
        input_2.style.left = oneStep * (ourNumbers.a + ourNumbers.b/2) + "px";

        // создадим 2-ую стрелку
        let arrow_2 = document.createElement('div');
        let arrow_2_end = document.createElement('div');
        arrow_2.setAttribute("id", "arrow_2");
        arrow_2.classList.add("arrow");
        arrow_2_end.classList.add('arrow_end');
        arrow_2.appendChild(arrow_2_end);
        arrow_2.style.left = ourNumbers.a * oneStep + "px";
        arrow_2.style.width = ourNumbers.b * oneStep + "px";

        // добавим 2-ые инпут и стрелку в узел scale
        scale.appendChild(input_2);
        scale.appendChild(arrow_2);
        input_2.focus(); // установим автофокус для инпута

        // прослушиваем ответы пользователя и описываем условие
        input_2.oninput = function() {
            let answer_2 = input_2.value;
            let last_symbol_answer_2 = answer_2.charAt(answer_2.length - 1);
            let example_box = document.getElementById("example_box");
            input_2.value = last_symbol_answer_2;
            if(last_symbol_answer_2 == ourNumbers.b) {
                console.log('правильный ответ!');
                input_2.setAttribute("disabled", "");
                example_box.children[2].classList.remove("example_error");
                input_2.classList.remove("input_error");
                input_2.style.border = "none";

                example_1.step3(ourNumbers);
            } else {
                example_box.children[2].classList.add("example_error");
                input_2.classList.add("input_error");
                console.log('не верно...');
            }
        };

    },
    step3: function (ourNumbers) {
        let example_box = document.getElementById("example_box");
        let example_sum = document.getElementById('example_sum');
        example_sum.innerHTML = "";
        example_sum.classList.add('focused');
        let input_3_1 = document.createElement('input');
        let input_3_2 = document.createElement('input');
        input_3_1.classList.add('input_sum');
        input_3_2.classList.add('input_sum');
        example_sum.appendChild(input_3_1);
        example_sum.appendChild(input_3_2);
        input_3_1.focus();
        input_3_2.setAttribute("disabled", "");

        input_3_1.oninput = function() {
            let answer_3_1 = input_3_1.value;
            let last_symbol_answer_3_1 = answer_3_1.charAt(answer_3_1.length - 1);
            input_3_1.value = last_symbol_answer_3_1;
            let abSum_toString = ourNumbers.abSum.toString();
            let first_num_of_abSum = abSum_toString.charAt(0);
            let two_num_of_abSum = abSum_toString.charAt(1);

            // ждём первую цифру от финального числа
            if(last_symbol_answer_3_1 == first_num_of_abSum) {
                input_3_1.setAttribute("disabled", "");
                input_3_1.style.border = "none";
                input_3_1.classList.remove("input_error");

                example_box.children[4].classList.remove("example_error");

                // ждём вторую цифру от финального числа
                input_3_2.removeAttribute("disabled");
                input_3_2.focus();

                input_3_2.oninput = function(){
                    let answer_3_2 = input_3_2.value;
                    let last_symbol_answer_3_2 = answer_3_2.charAt(answer_3_2.length - 1);
                    input_3_2.value = last_symbol_answer_3_2;

                    if(last_symbol_answer_3_2 == two_num_of_abSum) {
                        input_3_2.setAttribute("disabled", "");
                        input_3_2.style.border = "none";
                        input_3_2.classList.remove("input_error");
                        example_sum.style.borderColor = "transparent";
                        let ruler = document.getElementById('ruler');
                        ruler.classList.add('win');
                        example_sum.style.borderBottom = "solid 4px #8bbc80";
                        console.log('урааааа!!!');

                    } else {
                        input_3_2.classList.add("input_error");
                    }
                };
            } else {
                input_3_1.classList.add("input_error");
                console.log('не верно...');
            }
        };
    },
    play: function () {
        this.viewExample(this.step1);
    }
};
example_1.play();