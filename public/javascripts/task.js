const setTagAsDone = async (element, id) => {
    try {
        const headers = new Headers({ 'Content-type': 'application/json' })
        const body = JSON.stringify({ task: { done: element.checked } })
        const response = await fetch(`/tasks/${id}?_method=put`, {
            method: 'POST',
            headers,
            body,
        })
        const data = await response.json()
        const { task } = data
        const parent = element.parentNode

        if (task.done) {
            element.checked = true
            parent.classList.add('has-text-success')
            parent.classList.add('is-italic')
        } else {
            element.checked = false
            parent.classList.remove('has-text-success')
            parent.classList.remove('is-italic')
        }
    } catch (error) {
        alert('Erro ao atualizar a tarefa')
    }
}
