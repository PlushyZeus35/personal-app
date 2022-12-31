//$("#automaticInitDateInput")[0].onclick = onChangeAutomaticInitDateCheckbox;
//$("#automaticFinishDateInput")[0].onclick = onChangeAutomaticFinishDateCheckbox;
$("#initDateInput")[0].onchange = onChangeDates;
$("#finishDateInput")[0].onchange = onChangeDates;
const PPD = 10;

init();

function init(){
    
}

function onChangeDates(){
    const initDate = $("#initDateInput")[0].value;
    const finishDate = $("#finishDateInput")[0].value;
    if(initDate!=null && finishDate!=null && initDate!=undefined && finishDate!=undefined && initDate!='' && finishDate!=''){
        const startDate = new Date(initDate);
        const endDate = new Date(finishDate);
        let diff = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
        if(diff<1){
            $("#finishDateInput")[0].value = '';
            return
        }
        $("#daysInput")[0].value = diff;
        
        let pages = $("#pageInput")[0].value;
        $("#ppdInput")[0].value = (parseInt(pages) / diff).toFixed(1);
        console.log(pages);
        console.log(finishDate);
    }
}

function onclickFinishButton(buttonId){
    const selectedBook = books.filter(i => i.id==buttonId)[0];
    console.log(selectedBook.predictedFinished);
    const today = new Date(Date.now());
    const month = today.getMonth() + 1;
    const currentDate = today.getFullYear() + '-' + month + '-' + today.getDate();
    $("#bookIdFinishedBook")[0].value = buttonId;
    $("#predictedDateInput")[0].value = selectedBook.predictedFinished;
    $("#predictedPPDInput")[0].value = selectedBook.predictedPPD;
    $("#endDateInput")[0].value = currentDate;
    
    let diff = (today.getTime() - new Date(selectedBook.initDate).getTime()) / (1000 * 3600 * 24);
    $("#PPDfinal")[0].value = (selectedBook.pages / diff).toFixed(1);
}

/*function onChangeAutomaticInitDateCheckbox(){
    const checked = $("#automaticInitDateInput")[0].checked;
    console.log(checked);
    if(checked){
        const initDate = calculateInitDate();
        $("#initDateInput")[0].disabled = true;
        $("#initDateInput")[0].value = initDate;
    }else{
        $("#initDateInput")[0].disabled = false;
        $("#initDateInput")[0].value = null;
    }
}*/

/*function onChangeAutomaticFinishDateCheckbox(){
    const checked = $("#automaticFinishDateInput")[0].checked;
    console.log(checked);
    if(checked){
        $("#finishDateInput")[0].disabled = true;
        $("#finishDateInput")[0].value = calculateFinishDate();
    }else{
        $("#finishDateInput")[0].disabled = false;
        $("#finishDateInput")[0].value = null;
    }
}*/

/*function calculateInitDate(){
    const today = new Date(Date.now());
    today.setDate(today.getDate() + 1);
    const month = today.getMonth() + 1;
    const currentDate = today.getFullYear() + '-' + month + '-' + today.getDate();
    
    const readingBooks = books.filter(i=> i.initDate!=null);
    if(readingBooks.length>0){
        let maxDate = readingBooks[0].initDate;
        for(let i=0; i<readingBooks.length; i++){
            if(readingBooks[i].initDate>maxDate){
                maxDate = readingBooks[i].initDate;
            }
        }
        maxDate.setDate(maxDate.getDate() + 1);
        const month = maxDate.getMonth() + 1;
        const predictedDate = maxDate.getFullYear() + '-' + month + '-' + maxDate.getDate();
        return predictedDate;
    }
    return currentDate;
}*/

function onclickReadButton(buttonId){
    const selectedBook = books.filter(i => i.id==buttonId)[0];

    $("#bookId")[0].value = buttonId;
    $("#pageInput")[0].value = selectedBook.pages;

    /*$("#initDateInput")[0].disabled = true;
    $("#initDateInput")[0].value = calculateInitDate();

    $("#finishDateInput")[0].disabled = true;
    $("#finishDateInput")[0].value = calculateFinishDate();
*/
   
}

/*function calculateFinishDate(){
    let initDate = $("#initDateInput")[0].value;
    if(initDate==null || initDate==undefined){
        return null;
    }
    const book = books.filter(i => i.id==$("#bookId")[0].value);
    console.log(book);
    initDate = new Date(initDate);
    let pages = book[0].pages;
    console.log(pages);
    const diff = Math.ceil(pages/PPD);
    $("#daysInput")[0].value = diff;
    console.log(diff);
    initDate.setDate(initDate.getDate() + diff);
    console.log(initDate);
    let month = initDate.getMonth() + 1;
    if(month<10){
        month = '0'+month;
    }
    let day = initDate.getDate();
    if(day<10){
        day = '0'+day;
    }
    console.log(initDate.getFullYear() + '-' + month + '-' + day)
    return initDate.getFullYear() + '-' + month + '-' + day
}
*/
