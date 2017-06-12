#!/bin/sh

rsync -rva build/assets/ src/fhnw.web16theme/src/fhnw/web16theme/theme/assets/
rsync -rva build/pages/ src/fhnw.web16theme/src/fhnw/web16theme/theme/pages/
rsync -rva source/widgets/ src/fhnw.contentwidgets/src/fhnw/contentwidgets/templates/
find src/fhnw.web16theme/src/fhnw/web16theme/theme/pages/ -name "*.html" | xargs sed -i.bak 's/\/widgets\/logo/logo/'
find src/fhnw.web16theme/src/fhnw/web16theme/theme/pages/ -name "*.html" | xargs sed -i.bak 's/="\/assets/="assets/'
find src/fhnw.web16theme/src/fhnw/web16theme/theme/pages/ -name "*.html" | xargs sed -i.bak 's/="\/pages/="pages/'
find src/fhnw.web16theme/src/fhnw/web16theme/theme/assets/css -name "*.css" | xargs sed -i.bak 's/\/assets/\/++theme++web16theme\/assets/'


# transfer search page templates

declare -a search_pages=("search_all" "search_documents" "search_edu" "search_events" "search_expertises" "search_filter" "search_irf" "search_other" "search_profiles" "search_web")

for i in "${search_pages[@]}"
do
   awk '/{{ *#content *"content"[^}]*}}/,/{{ *\/content *}}/' source/pages/$i/$i.hbs\
    | sed -E 's/^[[:space:]]*{{ *[#/]content *("content" *)?}}[[:space:]]*//g'\
    > src/fhnw.contentwidgets/src/fhnw/contentwidgets/wi_061_searchpage/templates/$i.hbs;
done


# commit & push changes

FRONTEND_REV=`git rev-parse --short HEAD`
cd src/fhnw.contentwidgets
git commit -am "Frontend build $FRONTEND_REV"
git push
cd ../../src/fhnw.web16theme
git commit -am "Frontend build $FRONTEND_REV"
git push
