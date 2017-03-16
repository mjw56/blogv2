# YABP

Yet Another Blog Platform
-------------------------

This is a simple blog platform which allows a user to write blog posts using the markdown language and then have those appear on a site. This is a WIP so more updates will coming in the near future.

For now, a user should create a new post by creating a new dated folder under `/posts`. So for instance, if they were creating a new blog post on Thursday, March 16 2017, they would create a folder `2017-03-16` under `/posts`.

Now, the user should include three files: `index.md`, `cover.jpg` and `config.json`. (Note: these files will be updated in the future, and in future plans they should not be necessary as there will be a backend that will contain this data. Also, the image should not have to be a jpg image).

Now, the `config.json` should be comprised like so: `{ "title": "Title of the Post" }`. Currently this is the only information that is needed for the post, this will allow us to list the posts and their titles on the home page.

Next, the user should include an `index.md` which is the content that will become the blog post. Here is an example of what a blog post could look like:

`
# Post One

![cover](cover.jpg)

This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text This is some paragraph text

Second paragraph text Second paragraph text Second paragraph text Second paragraph text Second paragraph text Second paragraph text Second paragraph text Second paragraph text

```javascript
var foo = 'bar';

function baz() {
  console.log('test');
}
```
`

As you can see, this is normal markdown and there is nothing fancy going on here. The build step will take this content and feed it through the markdown converter tool which will gernerate the actual HTML. This is nice if you prefer writing just markdown and not having to worry about the HTML or anything. That was the main driving force behind why I created this. The generated HTML follows a similar structure and it has corresponding classes and such which can be themed. So, if you want something simple that you can use markdown for, this might be your tool!

Finally, the last piece will be the `cover.jpg` which can be a cover of your post which will appear on the main page when we list the posts their. This is a nice way for the index to display the content and give your users a better picture of what the post is about.

TODO:

There are still a bunch of things I want to do here, mainly I need to build out a backend CMS which can be used to enter the content and then save it. This will eliminate the two files `config.json` and `cover.jpg` which are on the main page. Also, this will just allow the user to be faster and not have to wrangle with creating these files. Also, they should be able to upload any type of cover image they want to (not just jpg).

Also, I'd like to add theming support so that these can be themed easily. Probably can make this an option in the backend that the user can select which theme they want to use, and then we can load the correct style sheet into the DOM for them. It should not be too difficult to do!

I think this is all the ideas I have for this now, I am sure I will have more ideas in the near future but this is a short list which will be a little work so I want to get these pieces done first and then concentrate on the rest!