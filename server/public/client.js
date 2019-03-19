console.log('in JS');

$(document).ready(onReady);

function onReady(){
    console.log('in JQ');
    getAllSongs()
}
// Make AJAX call to server to get all the songs
function getAllSongs(){
    $.ajax({
        method: 'GET',
        url: '/songs'
    }).then ( function(response){
        let song = response;
        console.log(`Response`, song);
        render(song);
    }).catch( function(error){
        console.log('Error getting songs');
        alert(`Sorry there was an error getting songs!`);
    })

}

function render(songArray){
    console.log('in render function');
    $('#tableSongs').empty();
    for (song of songArray){
        let publishedDate =  new Date(song.published);
    let $tr = $(`<tr>
        <td>${song.track}</td>
        <td>${song.artist}</td>
        <td>${song.rank}</td>
        <td>${publishedDate.toLocaleDateString()}</td>
        </tr>`);
        $('#tableSongs').append($tr);

    }

}
