("use strict");

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("clickedElement in the first function " + clickedElement);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [DONE] add class 'active' to the clicked link */
  //console.log("clickedElement:", clickedElement);
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const linkAttr = clickedElement.getAttribute("href");

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const article = document.querySelector(linkAttr);

  /* [DONE] add class 'active' to the correct article */
  article.classList.add("active");
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

function generateTitleLinks(customSelector = "") {
  //console.log("Funkcja generateTitleLinks wywolana");

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log("generateTitleLinks i customSelector="+customSelector);
  let html = "";

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    html = html + linkHTML;
    /* insert link into titleList */
    //titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagWrappers = article.querySelector(optArticleTagsSelector);
    tagWrappers.innerHTML = "";
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    //console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "<a/></li>";
      //console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
    } /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    tagWrappers.innerHTML = html;
  } /* END LOOP: for every article: */
}
function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log("log for clickedElement " + clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log("log for const href " + href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");
  console.log("log for const tag " + tag);
  /* find all tag links with class active */
  const tagActiceLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log("log for const tagActiceLinks " + tagActiceLinks);
  /* START LOOP: for each active tag link */
  for (let tagActiveLink of tagActiceLinks) {
    /* remove class active */
    tagActiveLink.classList.remove("active");
  } /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinkWithAttr = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinkWithAttr) {
    /* add class active */
    tagLink.classList.add("active");
  } /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const linksAllTags = document.querySelectorAll('.list');
  console.log("log for const linksAllTags in addClickListenersToTags " + linksAllTags);

  /* START LOOP: for each link */
  for (let link of linksAllTags)
  {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
    console.log("log for const link in addClickListenersToTags " + link);

  }
  /* END LOOP: for each link */
}

{
  addClickListenersToTags();

  generateTitleLinks();

  generateTags();
}
