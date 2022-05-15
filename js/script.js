("use strict");

const templates = 
{
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagBottomLink: Handlebars.compile(document.querySelector('#template-tagBottom-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
}

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
  optArticleTagsSelector = ".post-tags .list",
  optTagsListSelector = ".sidebar .tags",
  optArticleAuthorSelector = ".post .post-author",
  optAuthorsListSelector = ".sidebar .authors",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-";

function generateTitleLinks(customSelector = "") {
  //console.log("Funkcja generateTitleLinks wywolana");

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  //console.log("generateTitleLinks i customSelector="+customSelector);
  //let html = "";

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    //console.log(linkHTML);

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
  }
  //titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    //console.log(tag + ' is used ' + tags[tag] + ' times');
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    //console.log(tags[tag]);
  }
  return params;
}

function calculateTagClass (count, params)
{
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix+classNumber;
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
    //console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
      const linkHTMLData ={id: tag, title: tag};
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
  //console.log("tagsParams:", tagsParams);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = " ";

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    //console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML +=
      '<li><a class="'+tagLinkHTML+'" href="#tag-' + tag +'">' +tag +"</a></li>";
  }
  //console.log(allTagsHTML);

  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log("log for clickedElement " + clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefTagAttr = clickedElement.getAttribute("href");
  //console.log("log for const href " + hrefTagAttr);
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
  //console.log("log for const linksAllTags in addClickListenersToTags " + linksAllTags);

  /* START LOOP: for each link */
  for (let link of linksAllTags) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
    //console.log("log for const link in addClickListenersToTags " + link);
  }
  /* END LOOP: for each link */
}

function generateAuthors() {
  let allAuthors = {};
  let sidebarAuthorHtmlList = document.querySelector(optAuthorsListSelector);
  let sidebarAuthorHtml = "";
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    authorWrapper.innerHTML = "";
    const authorAttr = article.getAttribute("data-author");
    //console.log("Author for article "+article+ " is "+ authorAttr);
    /*linkHtmlAuthor =
      '<a href="#author-' + authorAttr + '">by ' + authorAttr + "</a>";*/
    const linkHTMLData = {id: authorAttr, title: authorAttr };
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log(linkHTML);
    authorWrapper.innerHTML = linkHTML;
    if (!allAuthors[authorAttr])
    {
      allAuthors[authorAttr]=1;
      //sidebarAuthorHtml += '<li>'+linkHtmlAuthor+'</li>';
      //console.log(allAuthors[authorAttr]);
    }
    else
    {
      allAuthors[authorAttr]++;
      //console.log(authorAttr+"++");
    }
  }
  for (let author in allAuthors)
  {
    sidebarAuthorHtml += '<li><a href="#author-' + author + '"> ' + author+ ' (' +allAuthors[author] +') '+'</a></li>';
  }
  //console.log(allAuthors);
  //console.log(sidebarAuthorHtml);

  //console.log(allAuthors);
  sidebarAuthorHtmlList.innerHTML = sidebarAuthorHtml;
}

function addClickListenersToAuthors() {
  const linksAllAuthors = document.querySelectorAll(".posts .post-author a, .sidebar .authors a");
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
  /*for (authorLink of authorArticleLinks)
  {
    console.log(authorLink);
  }*/
  generateTitleLinks('[data-author="' + authorJustName + '"]');
}

generateTitleLinks();

generateTags();
addClickListenersToTags();

generateAuthors();
addClickListenersToAuthors();
