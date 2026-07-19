function showErrorsOnly() {

    let rows=document.querySelectorAll(".check-row");

    rows.forEach(function(row){

        if(row.dataset.error==="false"){
            row.style.display="none";
        }

    });
}

function showAll() {

    let rows=document.querySelectorAll(".check-row");

    rows.forEach(function(row){
        row.style.display="";
    });
}
