<script>
  export let item;

</script>

<li class="search__result-normal search__result--item">
  <div class="result__top">
    <div class="breadcrumbs">
      <span>Studium</span>
      <span>Architektur, Bau & Geomatik</span>
      <span>Betoningenieur/in</span>
      <span>Lorem ipsum dolor sit amet</span>
      <span>Lorem ipsum dolor sit amet</span>
    </div>
    <div class="result__type">
      <span class="button">{item['@type']}</span>
    </div>
  </div>
  <a href={item['@id']}>
    <span class="title">{item.Title}</span>
    <span class="description">{item.Description}</span>
  </a>
</li>

<!-- Preliminary listing example
<li class="search__result-normal search__result--item">
  <div class="result__top">
    <div class="breadcrumbs">
      <span>Studium</span>
      <span>Architektur, Bau & Geomatik</span>
      <span>Betoningenieur/in</span>
      <span>Lorem ipsum dolor sit amet</span>
      <span>Lorem ipsum dolor sit amet</span>
    </div>
    <div class="result__type">
      <span class="button">{{{type}}}</span>
    </div>
  </div>
  <a href="{{combinedURL}}">
    <span class="title">{{{title}}}</span>
    <span class="description">{{{description}}}</span>
    <span class="search__result-arrow"></span>
  </a>
</li> 

JSON ATTRIBUTES
<span>{item.Title}</span>
<span>{item.description}</span>
<span>{item.fhnw_location}</span>
<span>{item.path_string}</span>
<span>{item.portal_type}</span>
<span>{item.review_state}</span>
<span>{item.taxonomy_competence}</span>
<span>{item.taxonomy_eduproducttype}</span>
<span>{item.taxonomy_subjectarea}</span>


-->