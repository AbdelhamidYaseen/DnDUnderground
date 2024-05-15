-*+# DnDunderground
    
# NextJs
1) cd NextJs
2) npm i
3) npm run dev
4) create an .env.local containing the following

##
NEXT_PUBLIC_DRUPAL_BASE_URL=http://nextjs.ddev.site/

NEXT_IMAGE_DOMAIN=nextjs.ddev.site

DRUPAL_REVALIDATE_SECRET=secret
##

## Explantion
    > components
        (custom components for use on a single or on multiple pages)
    > pages
        (base structure of the project)
            > folder === pagename
                index.tsx === page
                [...slug].tsx === dynamically generated page
            every folder is 1 level down in the structure
    > public 
        (general items that are publically available and locally saved)
    > styles
        (styling of the pages, layout and components)
    > .env.local
        (contains base values to run project)
# Drupal
1) open cmd
2) cd Drupal
3) start up Docker Desktop
4) ddev start
5) ddev describe 
6) open the  http://127.0.0.1:xxxxx
## Explantion
    > Drupal is the headless CMS 
    > Endpoints are formated as such
        > http://127.0.0.1:xxxxx/jsonapi/{object_endpoint}
        > http://127.0.0.1:xxxxx/jsonapi/node/{node_endpoint}
        > http://127.0.0.1:xxxxx/jsonapi/node/articles/{node_singular_endpoint}






