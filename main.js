
//preventDefault : prevent submit button to send data to server
let resultsList = document.getElementById('resultsList');
let searchForm = document.getElementById('searchForm');
let searchInput = document.getElementById('searchInput');


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    displaySearchResults(searchInput.value);
})
$().ready(function () {
    $("#searchInput").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "http://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                autoSelectFirst: true, //first item will be selected when showing suggestions
                minLength: 3,
                data: {
                    'action': "opensearch",
                    // Output format
                    'format': "json",
                    'search': request.term,  // Maximum number of suggestion results to be shown
                    limit: 8,
                },
                success: function (data) {
                    response(data[1]);
                }
            });
        }
    });
});
function displaySearchResults(x) {

    let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${x}`;

    fetch(url)
        .then(function (response) {
            return (response.json());
        })
        .then(function (data) {
            let resultsArray = data.query.search;
            resultsOnPage(resultsArray);
        })
        .catch(function () {
            console.log('An error occured');
        });
}


function resultsOnPage(myArray) {

    resultsList.innerHTML = " "; //clear previous result
    resultsList.insertAdjacentHTML('beforeend', `<h2>Search Results for ${searchInput.value} </h2>`);
    myArray.forEach(function (item) {
        let itemTitle = item.title;
        let itemSnippet = item.snippet;
        let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);
        resultsList.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
         <h3 class="resultTitle">
          <a href="${itemUrl}" target="_blank" rel="noopener">${itemTitle}</a>
         </h3>
         <p class="resultSnippet"><a href="${itemUrl}"  target="_blank" rel="noopener">
         ${itemSnippet}</a></p>
        </div>`
        );
    })
}



