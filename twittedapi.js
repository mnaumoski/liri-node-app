
// https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&trim_user=true&exclude_replies=true&user_id=3401824601&screen_name=MarijaNaumoski
var queryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&trim_user=true&exclude_replies=true&user_id=3401824601&screen_name=MarijaNaumoski"
$.ajax({url: queryURL, method: “GET”}).done(function(response))