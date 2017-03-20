The CMS will be responsible for gathering all the input data for a new post.

The CMS can be started as a node process on localhost:xxxx

The first time that the CMS is loaded, it will make an API to get the data. In that call, we'll check if the database exists for what we are looking for (some random string that should be unique to this app only). If the db does not exist, create the db and just return nothing to the user so that they can start setting everything up. Otherwise, fetch the list of posts and return those to the user.

(Maybe) Once the user opens that url, they might have to login with a username and password ( we will provided the admin u/p )

After they login (maybe), they'll be presented with a list of their last posts in descending order and then also given a button which might say New Post. When the user clicks this, it will present them with a form, with the inputs being the title, post content, and an upload image button. After the user clicks save here, this data will be saved in the database.

Running the site is then just a matter of making an API call to retrieve this data out of the database and display it on the site. Nothing more, nothing less.

In future, we could have an assortment of stylesheets that the user could choose from in order to style their site.

What we should support:

1) Creating New Posts

2) Editing Posts

3) Drafts
