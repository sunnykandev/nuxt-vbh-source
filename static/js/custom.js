$(document).ready(function(){
    $("video").on("play",function(){
        $(this).closest("div").find(".video_play_button").hide()
    });
    $("video").on("pause",function(){
        $(this).closest("div").find(".video_play_button").show()
    });
});