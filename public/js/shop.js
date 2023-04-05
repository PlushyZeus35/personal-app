console.log("bbb")

function submitHandler(){
    const form = new FormData();
    form.append('myFile', document.getElementById('formFile').files[0]);

    axios.post('/shop', form).then(({data}) => {
        console.log(data)
    }).catch(({error}) => {
        console.error("ha pasao algo!")
        console.error(error)
    })
}