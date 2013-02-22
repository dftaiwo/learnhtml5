var feedsList = new Array(
{
        title: 'Guardian Newspapers',
        description: 'IN the search of truth?',
        website: 'http://www.ngrguardiannews.com',
        feed_url: 'http://www.ngrguardiannews.com/index.php?format=feed&type=rss'
},
{
        title: 'Linda Ikeji',
        description: 'News, Events, Entertainment, Lifestyle, Fashion, Beauty, Inspiration and yes... Gossip! *Wink*',
        website: 'http://lindaikeji.blogspot.com',
        feed_url: 'http://feeds.feedburner.com/blogspot/OqshX'
},
{
        title: 'Punch Newspapers',
        description: 'Putting the Punch back on the web or in your day',
        website: 'http://www.punchng.com',
        feed_url: 'http://www.punchng.com/feed/'
}
);



$().ready(function() {


});

/**
 * Displays the list of feeds
 * @returns {undefined}
 */
function showFeeds() {

        var totalFeeds = feedsList.length;
        var htmlContent = new Array();

        htmlContent.push('<ul class="feeds">');
        for (i = 0; i < totalFeeds; i++) {
                currentFeed = feedsList[i];
                htmlContent.push('<li>');
                htmlContent.push('<a href="view.html#f=' + i + '">');
                htmlContent.push(currentFeed.title);
                htmlContent.push('</a>');
                htmlContent.push('</li>');

        }
        htmlContent.push('</ul>');

        htmlContent = htmlContent.join("\n");
        $('#mainContent').html(htmlContent);
}

/**
 * Parses the URL for the currently selected feed
 * @returns {undefined}
 */
function loadFeed() {
       if(typeof(google)=='undefined'){
                showMessage("Connection Error Detected. Please ensure you have  a working internet connection");
                goHome();
                return;
        }

        if (location.href.indexOf("#") == -1) {

                showMessage('Unable to identify selected feed (Err 1)')
                goHome();
                return;

        }

        try {
                var hash = window.location.hash.substring(1);
                feedId = hash.split('f=')[1];
                if (feedId.length == 0) {
                        showMessage('Unable to identify selected feed (Err 2)')
                        goHome();
                        return;
                }

                pullFeed(feedId);

        } catch (e) {
                showMessage('Unable to identify selected feed (Err 3)')
                goHome();
                return;
        }

}

/**
 * Displays a message to user
 * @param {type} msg
 */
function showMessage(msg) {

        alert(msg);

}
/**
 * Goes to the home page/dashboard
 * @returns {undefined}
 */

function goHome() {

        location.href = 'index.html';

}
/**
 * Load the feed using the URL of the feed
 * @param {type} feedId
 */
function pullFeed(feedId) {

        try {
                var selectedFeed = feedsList[feedId];
        } catch (e) {
                showMessage("We were unable to find the selected feed");
                goHome();
                return;
        }
        try {
                var htmlContent = new Array();
                htmlContent.push('<h1>');
                htmlContent.push(selectedFeed.title);
                htmlContent.push('</h1>');
                htmlContent.push('<span class="feedDesc">');
                htmlContent.push(selectedFeed.description);
                htmlContent.push('</span>');
                $('#feedHeader').html(htmlContent.join("\n"));
                feedUrl = selectedFeed.feed_url;
                var gFeed = new google.feeds.Feed(feedUrl);
                gFeed.setNumEntries(10);
                try{
                gFeed.load(function(result) {
                        if (!result.error) {
                                var htmlContent =new Array();
                                
                                htmlContent.push('<ul id="newsList">');
                                for (var i = 0; i < result.feed.entries.length; i++) {
                                        var entry = result.feed.entries[i];
                                        console.log(entry);
//                                        var div = document.createElement("div");
//                                        div.appendChild(document.createTextNode(entry.title));
//                                        container.appendChild(div);
                                        htmlContent.push('<li>');
                                        htmlContent.push('<span class="title">');
                                        htmlContent.push(entry.title);
                                        htmlContent.push('</span>');
                                        htmlContent.push('<div class="content">');
                                        htmlContent.push(formatAsSummary(entry.content));
                                        htmlContent.push('</div>');

                                        htmlContent.push('</li>');
                                }
                                htmlContent.push('</ul>');
                                 $('#mainContent').html(htmlContent.join("\n"));
                        }else{
                                showMessage("Error Parsing the Information from the Provider "+result.error );
                                goHome();
                        }
                });
                }catch(e){
                        
                          showMessage("It seems like we have a connection problem " +e.message );
                                goHome();
                }


        } catch (e) {
                showMessage("Unexpected error " + e.message);
//                goHome();
        }
}

function formatAsSummary(content){
        return content;
        content =  $(content).text();
        return content.substring(0,500)+'...';
        
        
}