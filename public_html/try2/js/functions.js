/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var feedsList = new Array(
   {
   title:'Guardian Newspaper',
   description:'In search for the truth',
   website: 'http://ngrguardiannews.com',
   feed_url:'http://ngrguardiannews.com/index.php?format=feed&type=rss'
   }
);


function loadFeeds(){
        
        var htmlContent = new Array();
        htmlContent.push('<ul class="feedsList">');
        for(a=0;a<feedsList.length;a++){
                
                currentFeed = feedsList[a];
                htmlContent.push('<li>');
                htmlContent.push('<a href="view.html#a='+a+'">');
                htmlContent.push(currentFeed.title);
                htmlContent.push('</a>');
                htmlContent.push('</li>');
                
        }
        
        htmlContent.push('</ul>');
        
        $('#mainContent').html(htmlContent.join(''));

        
}


function loadFeedNews(){
        
        var hash = window.location.hash.substring(1);
        
        var feedId = hash.split('a=')[1];
        
        if(typeof(feedId)=='undefined'){
                return;
        }
        
        var selectedFeed = feedsList[feedId];
        
        if(typeof(google)=='undefined'){
                
                return;
                
        }
        var gFeed = new google.feeds.Feed(selectedFeed.feed_url);
        gFeed.setNumEntries(10);
        
        gFeed.load(function (result){
                
                
                
        });
        
        
        
}