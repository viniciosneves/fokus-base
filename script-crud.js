const formularioTarefa = document.querySelector('form.app__form-add-task')
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const legendaFormulario = document.querySelector('.app__form-label')

btnAdicionarTarefa.addEventListener('click', () => {
    formularioTarefa.classList.toggle('hidden')
})


