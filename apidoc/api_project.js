define({  "name": "tee-bee-dee",  "version": "0.6.0",  "description": "Webapp documentation",  "title": "tee-bee-dee",  "url": "https://www.example1.com/",  "header": {    "title": "Introduction",    "content": "<h2>Introduction</h2>\n<hr>\n<p>About all the api calls require authentication. Meaning every call must include the <code>api token</code> in the <code>Authentication</code> header to successful access resources. See <a href=\"#api-Authentication\">Authentication</a> for more.</p>\n<p>Also, ensure that the proper <code>Content-Type</code> header is always set, so the data sent is received properly.</p>\n<p>For example, when trying to get authentcated:</p>\n<pre><code>curl -X POST -i http://localhost:3000/api/auth \\\n-H &quot;Authorization: Basic bm9ydGh3b29kLmRlbnRhbEBnbWFpbC5jb206cGFzc3dvcmQ=&quot; \\\n-H &quot;Content-Type: application/json&quot; \\\n-d '{&quot;name&quot;:&quot;Frodo&quot;}'\n</code></pre>\n<p>In this case, <code>Content-Type</code> is set to <code>application/json</code>, so the JSON data <code>{&quot;name&quot;:&quot;Frodo&quot;}</code> is received as a JSON.</p>\n"  },  "sampleUrl": false,  "apidoc": "0.2.0",  "generator": {    "name": "apidoc",    "time": "2017-05-28T20:55:23.786Z",    "url": "http://apidocjs.com",    "version": "0.13.2"  }});
