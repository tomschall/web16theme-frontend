#!/bin/sh
BASE_PATH=src
#BASE_PATH=..

rsync -rva build/assets/ $BASE_PATH/fhnw.web16theme/src/fhnw/web16theme/theme/assets/
rsync -rva build/pages/ $BASE_PATH/fhnw.web16theme/src/fhnw/web16theme/theme/pages/
rsync -rva source/widgets/ $BASE_PATH/fhnw.contentwidgets/src/fhnw/contentwidgets/templates/
find $BASE_PATH/fhnw.web16theme/src/fhnw/web16theme/theme/pages/ -name "*.html" | xargs sed -i.bak 's/\/widgets\/logo/logo/'
find $BASE_PATH/fhnw.web16theme/src/fhnw/web16theme/theme/pages/ -name "*.html" | xargs sed -i.bak 's/="\/assets/="assets/'
find $BASE_PATH/fhnw.web16theme/src/fhnw/web16theme/theme/pages/ -name "*.html" | xargs sed -i.bak 's/="\/pages/="pages/'
find $BASE_PATH/fhnw.web16theme/src/fhnw/web16theme/theme/assets/css -name "*.css" | xargs sed -i.bak 's/\/assets/\/++theme++web16theme\/assets/'


# transfer search page templates

declare -a search_pages=("search_all" "search_documents" "search_edu" "search_events" "search_expertises" "search_filter" "search_irf" "search_other" "search_profiles" "search_web" "search_news")

for i in "${search_pages[@]}"
do
   awk '/{{ *#content *"content"[^}]*}}/,/{{ *\/content *}}/' source/pages/$i/$i.hbs\
    | sed -E 's/^[[:space:]]*\{\{ *[#/]content *("content" *)?\}\}[[:space:]]*//g'\
    > $BASE_PATH/fhnw.contentwidgets/src/fhnw/contentwidgets/wi_061_searchpage/templates/$i.hbs;
done


# commit & push changes
if [ "$DO_COMMIT" == "yes" ]
then
      FRONTEND_REV=`git rev-parse --short HEAD`
      cd $BASE_PATH/fhnw.contentwidgets
      git add src/fhnw/contentwidgets/templates/sidebar_news/
      git add  src/fhnw/contentwidgets/templates/event_search/
      git add  src/fhnw/contentwidgets/templates/news_search/
      git commit -am "Frontend build $FRONTEND_REV"
      git push
      cd ../../src/fhnw.web16theme
      git commit -am "Frontend build $FRONTEND_REV"
      git push
fi
