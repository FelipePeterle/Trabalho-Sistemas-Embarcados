
document.addEventListener('DOMContentLoaded', function () {
    // Navigation scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Language tabs
    const btnC = document.getElementById('btn-c');
    const btnAsm = document.getElementById('btn-asm');
    const contentC = document.getElementById('content-c');
    const contentAsm = document.getElementById('content-asm');

    btnC.addEventListener('click', () => {
        btnC.classList.add('active');
        btnAsm.classList.remove('active');
        contentC.classList.remove('hidden');
        contentAsm.classList.add('hidden');
    });

    btnAsm.addEventListener('click', () => {
        btnAsm.classList.add('active');
        btnC.classList.remove('active');
        contentAsm.classList.remove('hidden');
        contentC.classList.add('hidden');
    });

    const hardwareComponents = ['sensor', 'mcu', 'actuator'];
    hardwareComponents.forEach(id => {
        const element = document.getElementById(id);
        const description = element.querySelector('.description');
        element.addEventListener('mouseenter', () => {
            element.classList.add('bg-amber-50');
            description.classList.remove('hidden');
        });
        element.addEventListener('mouseleave', () => {
            element.classList.remove('bg-amber-50');
            description.classList.add('hidden');
        });
    });

    // Methodology Chart
    const chartData = {
        labels: ['Rigor e Rastreabilidade', 'Flexibilidade a Mudanças', 'Velocidade de Feedback', 'Foco em Qualidade de Código', 'Custo Inicial'],
        datasets: [
            {
                label: 'V-Model',
                data: [5, 1, 1, 3, 5],
                fill: true,
                backgroundColor: 'rgba(163, 123, 115, 0.2)',
                borderColor: 'rgb(163, 123, 115)',
                pointBackgroundColor: 'rgb(163, 123, 115)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(163, 123, 115)'
            },
            {
                label: 'Agile (Scrum)',
                data: [2, 5, 4, 3, 2],
                fill: true,
                backgroundColor: 'rgba(109, 93, 90, 0.2)',
                borderColor: 'rgb(109, 93, 90)',
                pointBackgroundColor: 'rgb(109, 93, 90)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(109, 93, 90)'
            },
            {
                label: 'TDD',
                data: [3, 4, 5, 5, 3],
                fill: true,
                backgroundColor: 'rgba(74, 74, 74, 0.2)',
                borderColor: 'rgb(74, 74, 74)',
                pointBackgroundColor: 'rgb(74, 74, 74)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(74, 74, 74)'
            }
        ]
    };

    const methodologyDetailsData = {
        'V-Model': {
            title: 'V-Model: Rigor e Verificação',
            description: 'Ideal para sistemas críticos (aviação, automotivo) onde a falha não é uma opção. Cada fase de desenvolvimento está atrelada a uma fase de teste, garantindo rastreabilidade total.',
            pros: 'Documentação completa, ideal para certificação.',
            cons: 'Rígido a mudanças, ciclo longo e alto custo inicial.'
        },
        'Agile (Scrum)': {
            title: 'Agile: Flexibilidade e Entrega Contínua',
            description: 'Perfeito para produtos de consumo (IoT, wearables) com requisitos que mudam rapidamente. O trabalho é feito em ciclos curtos (Sprints) com feedback constante.',
            pros: 'Adaptável, entrega rápida de valor, alta motivação.',
            cons: 'Requer disciplina para não negligenciar a documentação; integração com hardware pode ser complexa.'
        },
        'TDD': {
            title: 'Test-Driven Development: Qualidade por Design',
            description: 'Uma disciplina técnica onde os testes são escritos ANTES do código. Isso força um design modular e garante que o software seja robusto desde o início.',
            pros: 'Código confiável, facilita a manutenção e refatoração.',
            cons: 'Curva de aprendizado; exige técnicas para isolar o código do hardware durante os testes.'
        }
    };

    const detailsContainer = document.getElementById('methodology-details');

    const config = {
        type: 'radar',
        data: chartData,
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            onClick: (event, elements, chart) => {
                if (chart.legend.legendItems[elements[0].datasetIndex]) {
                    const label = chart.legend.legendItems[elements[0].datasetIndex].text;
                    updateDetails(label);
                }
            },
            plugins: {
                legend: {
                    onClick: (e, legendItem, legend) => {
                        updateDetails(legendItem.text);
                        // Default legend click behavior can be added here if needed
                    }
                }
            }
        }
    };

    const methodologyChart = new Chart(
        document.getElementById('methodologyChart'),
        config
    );

    function updateDetails(label) {
        const data = methodologyDetailsData[label];
        if (data) {
            detailsContainer.innerHTML = `
                        <h4 class="text-xl font-bold text-[#6D5D5A] mb-2">${data.title}</h4>
                        <p class="mb-4">${data.description}</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div class="bg-green-100 text-green-800 p-3 rounded-lg"><strong>Vantagens:</strong> ${data.pros}</div>
                            <div class="bg-red-100 text-red-800 p-3 rounded-lg"><strong>Desafios:</strong> ${data.cons}</div>
                        </div>
                    `;
        }
    }
    // === QUIZ: validação e feedback visual ===
    const quiz = document.getElementById('quiz');
    if (quiz) {
        // Ao marcar uma alternativa, avalia e mostra feedback
        quiz.querySelectorAll('input[type="radio"]').forEach((input) => {
            input.addEventListener('change', () => {
                const fieldset = input.closest('fieldset');
                const feedback = fieldset.querySelector('.feedback');

                // Limpa estados visuais anteriores
                fieldset.querySelectorAll('label').forEach(l =>
                    l.classList.remove('ring-2', 'ring-green-300', 'ring-red-300', 'bg-green-50', 'bg-red-50')
                );

                const isCorrect = input.hasAttribute('data-correct');
                const reason = input.getAttribute('data-reason') || (isCorrect ? 'Correto!' : 'Resposta incorreta.');

                // Destaque no label escolhido
                const label = input.parentElement;
                label.classList.add('ring-2', isCorrect ? 'ring-green-300' : 'ring-red-300', isCorrect ? 'bg-green-50' : 'bg-red-50');

                // Feedback abaixo da questão
                feedback.textContent = reason;
                feedback.classList.remove('hidden');

                // Atualiza cores do feedback
                feedback.classList.remove('bg-green-100', 'text-green-800', 'border-green-300', 'bg-red-100', 'text-red-800', 'border-red-300');
                if (isCorrect) {
                    feedback.classList.add('bg-green-100', 'text-green-800', 'border-green-300');
                } else {
                    feedback.classList.add('bg-red-100', 'text-red-800', 'border-red-300');
                }
            });
        });

        // Reiniciar quiz
        document.getElementById('reset-quiz').addEventListener('click', () => {
            quiz.reset();
            quiz.querySelectorAll('.feedback').forEach(f => {
                f.classList.add('hidden');
                f.classList.remove('bg-green-100', 'text-green-800', 'border-green-300', 'bg-red-100', 'text-red-800', 'border-red-300');
                f.textContent = '';
            });
            quiz.querySelectorAll('label').forEach(l =>
                l.classList.remove('ring-2', 'ring-green-300', 'ring-red-300', 'bg-green-50', 'bg-red-50')
            );
        });
    }
});
