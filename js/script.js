/* eslint-disable no-unused-vars */
{
  ("use strict");

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log("clickedElement (with plus): " + clickedElement);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log("clickedElement:", clickedElement);
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
  };

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles",
    optArticleTagsSelector = ".post-tags .list";

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks() {
    //console.log("Funkcja generateTitleLinks wywolana");

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
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
  const generateTags = function () {
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
      console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(" ");
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + ', </span><a/></li>';
        console.log(linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
      } /* END LOOP: for each tag */
      /* insert HTML of all the links into the tags wrapper */
      tagWrappers.innerHTML = html;
    } /* END LOOP: for every article: */
  };

  generateTitleLinks();

  generateTags();
}