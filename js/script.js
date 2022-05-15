("use strict");

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  tagBottomLink: Handlebars.compile(
    document.querySelector("#template-tagBottom-link").innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector("#template-author-link").innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector("#template-tagCloud-link").innerHTML
  ),
  authorRight: Handlebars.compile(
    document.querySelector("#template-authorRight-link").innerHTML
  ),
};

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
  optArticleTagsSelector = ".post-tags .list",
  optTagsListSelector = ".sidebar .tags",
  optArticleAuthorSelector = ".post .post-author",
  optAuthorsListSelector = ".sidebar .authors",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-";

function generateTitleLinks(customSelector = "") {

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create object for HTML template of the link */
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link into titleList */
    titleList.insertAdjacentHTML("beforeend", linkHTML);
  }

  const links = document.querySelectorAll(".titles a");
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagBottomLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    } /* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    tagWrappers.innerHTML = html;
  } /* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  let tagList = document.querySelector(optTagsListSelector);
  /*calculating the parameters of the tags - amount of tags*/
  const tagsParams = calculateTagsParams(allTags);
  /* [NEW] create variable for all links HTML code */
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }
  console.log(allTagsData);
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log("log for clickedElement " + clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefTagAttr = clickedElement.getAttribute("href");
  console.log("log for const href hrefTagAttr" + hrefTagAttr);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = hrefTagAttr.replace("#tag-", "");
  console.log("log for const tag " + tag);
  /* find all tag links with class active */
  const tagArticleLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log("log for const tagArticleLinks " + tagArticleLinks);
  /* START LOOP: for each active tag link */
  for (let tagActiveLink of tagArticleLinks) {
    /* remove class active */
    tagActiveLink.classList.remove("active");
  } /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinkWithAttr = document.querySelectorAll(
    'a[href="' + hrefTagAttr + '"]'
  );
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
  const linksAllTags = document.querySelectorAll(".list li a");

  /* START LOOP: for each link */
  for (let link of linksAllTags) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
  }
  /* END LOOP: for each link */
}

function generateAuthors() {
  let allAuthors = {};
  let sidebarAuthorHtmlList = document.querySelector(optAuthorsListSelector);
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    authorWrapper.innerHTML = "";
    const authorAttr = article.getAttribute("data-author");
    const linkHTMLData = { id: authorAttr, title: authorAttr };
    const linkHTML = templates.authorLink(linkHTMLData);
    authorWrapper.innerHTML = linkHTML;
    if (!allAuthors[authorAttr]) {
      allAuthors[authorAttr] = 1;
    } else {
      allAuthors[authorAttr]++;
    }
  }
  console.log(allAuthors);
  const allAuthorsData = { authors: [] };

  for (let author in allAuthors) {
    allAuthorsData.authors.push({
      authorName: author,
      count: allAuthors[author]
    });

  }
  sidebarAuthorHtmlList.innerHTML = templates.authorRight(allAuthorsData);
}

function addClickListenersToAuthors() {
  const linksAllAuthors = document.querySelectorAll(
    ".posts .post-author a, .sidebar .authors a"
  );
  for (let link of linksAllAuthors) {
    link.addEventListener("click", authorClickHandler);
  }
}

function authorClickHandler(event) {
  event.preventDefault;
  const clickedElement = this;
  console.log("log for clickedElement in Author " + clickedElement);
  const hrefAuthorAttr = clickedElement.getAttribute("href");
  console.log(hrefAuthorAttr);
  const authorJustName = hrefAuthorAttr.replace("#author-", "");
  console.log(authorJustName);
  const authorArticleLinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );
  console.log(authorArticleLinks);
  generateTitleLinks('[data-author="' + authorJustName + '"]');
}

generateTitleLinks();

generateTags();
addClickListenersToTags();

generateAuthors();
addClickListenersToAuthors();
