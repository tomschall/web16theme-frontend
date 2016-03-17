# Social Sharing

*Author*: Patrick Lauterburg

## Description

Each social network has its own specificities, and APIs, but in any case we'll be using from them all the "share" functionality, and NOT other possible functionalities like "+1", or "I like". In this way we can keep consistency in users expectations and experience.

In order to increase performance, maintain design consistency, and to avoid some blocking plugins we'll be implementing this sharing functionality in the most basic form: using links with parameters.

For each social network, we'll provide a link to the social network using the URL parameters to customize what exactly is shared. In any case, the value for every parameter (denoted as "{{…}}" placeholders in the code snippets below) should be properly url-encoded.

Following there are different possible URL structures for each social network. 

### Facebook

Facebook offers a very extensive API, but for simple share functionality we can extract from their examples the following estructure:

Link template snippet:
```
https://www.facebook.com/sharer/sharer.php?u={{url}}
```

**Parameters list**. Original documentation: [https://developers.facebook.com/docs/plugins/share-button/]()

| Parameter | Description | Example Value |
|-----------|-----------------------------------------------------------------|---------------------------------------------------------------|
| u | The URL of the page to share. This value should be url encoded. | http://www.url.ch/topic/ |


### Google+

Link template snippet:
```
https://plus.google.com/share?url={{url}}
```

**Parameters list.** Original documentation: [https://developers.google.com/+/web/share/#sharelink]().

| Parameter | Description | Example Value |
|-----------|-----------------------------------------------------------------|---------------------------------------------------------------|
| url | The URL of the page to share. This value should be url encoded. | http://www.url.ch/topic/ |


### Pinterest

After a too discouraging reading of Pinterest's (anti-)API documentation, where they clearly pretend to force every developer to include THEIR JS for the solely purpose of adding THEIR link to share content to THEIR system, I've ended up with a URL structure that works to share content in Pinterest.

Link template snippet:
```
http://pinterest.com/pin/create/button/?
    url={{url}}
    &media={{image_url}}
    &description={{text_message}}
```

**Parameters list**.

| Parameter | Description | Example Value |
|-----------|-------------|---------------|
| url | URL included with the Tweet. | http://www.url.ch/topic/ |
| media | The actual image to pin |
| description | Pre-populated text to describe the pin. | This is a topic about something. |


### Twitter

Link template snippet:
```
http://twitter.com/share?
    text={{text_message}}
    &url={{url}}
    &hashtags={{hashtags}}
    &via={{username}}
```

**Parameters list**. All of them are optional. More parameters in [https://dev.twitter.com/web/tweet-button/parameters]().

| Parameter | Description | Example Value |
|-----------|-------------|---------------|
| text | Pre-populated text highlighted in the Tweet. | Checkout this topic! |
| url | URL included with the Tweet. | http://www.url.ch/topic/ |
| hashtags | A comma-separated list of hashtags to be appended to default Tweet text. | hashtag,hashtag |
| via | Attribute the source of a Tweet to a Twitter username. Appears appended to Tweet text as "via @username". | twitter_username |
