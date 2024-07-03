import './style.css'
// url Async requesting function
const button:null|HTMLButtonElement=<HTMLButtonElement>document.getElementById("button");
button.onclick=getData;

function getData(){
  let inputText: null|HTMLInputElement =<HTMLInputElement>document.getElementById("input");
  let inputTextvalue:string=inputText.value;
  grab_data(inputTextvalue);
}

function httpGetAsync(theUrl:string, callback:any)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext:string)
{
  const divImg:HTMLDivElement|null= <HTMLDivElement>document.getElementById("images");
  let terst: null|HTMLImageElement=<HTMLImageElement>document.createElement("img");
  
    // parse the json response
    var response_objects = JSON.parse(responsetext);

   let top_10_gifs = response_objects["results"];

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

    terst.src = top_10_gifs[0]["media"][0]["tinygif"]["url"];
    divImg.append(terst);

  
    

    return;

}


// function to call the trending and category endpoints
function grab_data(searchvalue:string)
{
    // set the apikey and limit
    var apikey = "LIVDSRZULELA";
    var lmt = 1;

    // test search term
    var search_term = searchvalue;

    // using default locale of en_US
    var search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url,tenorCallback_search);

    // data will be loaded by each call's callback
    return;
}


// SUPPORT FUNCTIONS ABOVE
// MAIN BELOW

// start the flow




