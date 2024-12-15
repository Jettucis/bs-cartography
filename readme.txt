npm install
npm run prod
To test, disable the Leaflet Wiki gadget in your Preferences on the wiki, then paste dist/main.js into the console on the wiki
Don't forget to update the cache_buster in config.js if the map image itself has been updated
If you change the entities, do npm run links and copy dist/entity_links.txt to https://brightershoreswiki.org/w/User:Gau_Cho/EntityLinks
