"use strict";

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('clickedElement (with plus): ' + clickedElement);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const linkAttri = clickedElement.getAttribute("href");
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const allArticles = document.querySelectorAll(".posts article.post");

  for (let searchedArticle of allArticles) {
    const articleAttri = searchedArticle.getAttribute("id");
    if(articleAttri == linkAttri.slice(1))
    {
      searchedArticle.classList.add("active");
    }
  }
  /* add class 'active' to the correct article */
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
