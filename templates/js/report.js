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
/* =====================================================
   GLOBAL SEARCH ACROSS ALL COMMAND OUTPUTS
   ===================================================== */

function clearGlobalSearch() {

    let input =
    document.getElementById(
        "globalSearchInput"
    );

    let results =
    document.getElementById(
        "globalSearchResults"
    );

    if(input){
        input.value = "";
    }

    if(results){
        results.innerHTML = "";
    }
}

function globalSearchAllCommands() {

    let input =
    document.getElementById(
        "globalSearchInput"
    );

    let results =
    document.getElementById(
        "globalSearchResults"
    );

    if(!input || !results){
        return;
    }

    let searchText =
    input.value.toLowerCase().trim();

    results.innerHTML = "";

    if(searchText.length === 0){

        results.innerHTML =
        "<div class='global-search-summary'>Enter text to search.</div>";

        return;
    }

    let outputs =
    document.querySelectorAll(".output-box");

    let commands =
    document.querySelectorAll(".command-header");

    let foundCount = 0;

    for(let i=0; i<outputs.length; i++){

        let outputText =
        outputs[i].innerText;

        let matchedLines = [];

        let lines =
        outputText.split("\n");

        for(let j=0; j<lines.length; j++){

            if(
                lines[j]
                .toLowerCase()
                .includes(searchText)
            ){
                matchedLines.push(lines[j]);
            }
        }

        if(matchedLines.length > 0){

            foundCount++;

            let commandName = "Command";

            if(commands[i]){
                commandName =
                commands[i].innerText;
            }

            results.innerHTML +=
            `
            <div class="search-result-card">

                <h3>${commandName}</h3>

                <pre>
${matchedLines.join('\n')}
                </pre>

            </div>
            `;
        }
    }

    if(foundCount === 0){

        results.innerHTML =
        `
        <div class="global-search-summary">
            No results found for :
            <b>${searchText}</b>
        </div>
        `;
    }
}
