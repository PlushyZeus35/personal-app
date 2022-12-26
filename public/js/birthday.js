
setBirthdayData(birthdays);

function setBirthdayData(birthdays){
    for(let i=0; i<birthdays.length; i++){
        /*
        a.birth.d-flex.justify-content-around(href="#")
                                span.birthname Borja 
                                span.birthday 5
        */
       const link = document.createElement('a');
       link.id = birthdays[i].id;
	   link.onclick = selectedBirthday;
       link.classList = ['birth d-flex justify-content-around'];
       link.href = '#';

       const spaname = document.createElement('span');
       spaname.classList = ['birthname'];
       spaname.innerHTML = birthdays[i].name;

      	const spanday = document.createElement('span');
       	spanday.classList = ['birthday'];
       	spanday.innerHTML = birthdays[i].day;

        link.appendChild(spaname);
        link.appendChild(spanday);
        let montcont;
       	switch(birthdays[i].month){
			case 1:
				montcont = $("#januarybirths")[0];
				montcont.appendChild(link);
				break;
			case 2:
				montcont = $("#februarybirths")[0];
				montcont.appendChild(link);
				break;
			case 3:
				montcont = $("#marchbirths")[0];
				montcont.appendChild(link);
				break;
			case 4:
				montcont = $("#aprilbirths")[0];
				montcont.appendChild(link);
				break;
			case 5:
				montcont = $("#maybirths")[0];
				montcont.appendChild(link);
				break;
			case 6:
				montcont = $("#junebirths")[0];
				montcont.appendChild(link);
				break;
			case 7:
				montcont = $("#julybirths")[0];
				montcont.appendChild(link);
				break;
			case 8:
				montcont = $("#augustbirths")[0];
				montcont.appendChild(link);
				break;
			case 9:
				montcont = $("#septemberbirths")[0];
				montcont.appendChild(link);
				break;
			case 10:
				montcont = $("#octoberbirths")[0];
				montcont.appendChild(link);
				break;
			case 11:
				montcont = $("#novemberbirths")[0];
				montcont.appendChild(link);
				break;
			case 12:
				montcont = $("#decemberbirths")[0];
				montcont.appendChild(link);
				break;
		}
    }
}

function selectedBirthday(){
	const editModal = new bootstrap.Modal('#editBirthModal', {
		keyboard: false
	});
	const selectedId = this.id;
	let name,day,month;
	for(let i=0; i<birthdays.length; i++){
		if(birthdays[i].id==selectedId){
			name = birthdays[i].name;
			day = birthdays[i].day;
			month = birthdays[i].month;
		}
	}
	$("#editedId")[0].value = selectedId;
	$("#editedName")[0].value = name;
	$("#editedDay")[0].value = day;
	$("#editedMonth")[0].value = month;
	$("#deleteBirthButton")[0].href = "/birthday/delete/" + selectedId;
	editModal.show();
}