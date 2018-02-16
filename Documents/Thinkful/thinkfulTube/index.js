'use strict';

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
const APIkey = 'AIzaSyBHHsToR8X9dSakTDaiVb25IjX7_XD01OM'


function handleSubmit () {
	$(".js-search-form").submit( function (event){
		event.preventDefault();
		console.log('button clicked');
		let searchTerm = $('.js-query').val();
		console.log(searchTerm);
		$('.js-query').val("");
		getVideosFromApi(searchTerm, displayResults);
		
	})
}

// function getVideosFromApi (searchTerm, callback) {
//  const settings = {
//  	url: YOUTUBE_SEARCH_URL,
//  	data: {
//  		// part: 'snippet'
//  		// key: `${APIkey}`
// 		// q: `${searchTerm} in: name`
// 		},
//  	dataType: 'json',
//  	type: 'GET',
//  	success: callback
//  };
//  $.ajax(settings);
// }

function getVideosFromApi(searchTerm, callback) {
  const query = {
  	part: 'snippet',
  	key: `${APIkey}`,
    q: `${searchTerm} in:name`,
  }
  console.log(YOUTUBE_SEARCH_URL);
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


function renderResults (result) {
	console.log(result.id.videoId);
	console.log(result.snippet.thumbnails.medium.url);
	console.log(result.snippet.title);
	let href = "https://www.youtube.com/watch?v=" + result.id.videoId;
	let thumbNail = result.snippet.thumbnails.medium.url;
	let title = result.snippet.title;
	return `<div>
		<img src= ${thumbNail} alt=${title} ><a href= ${href}>click this video ${title}</a>
			</div>`;
}


function displayResults (data) {
	console.log(data);
	 const display = data.items.map((item, index) => renderResults(item));

	$(".js-search-results").html(display);
}


$(handleSubmit);
