let navList=document.querySelector(".site-list"),navToggle=document.querySelector(".navigation__toggle"),navClue=document.querySelector(".navigation__clue");navList.classList.remove("site-list--nojs"),navToggle.classList.remove("navigation__toggle--nojs"),navToggle.addEventListener("click",(function(){navList.classList.contains("site-list--closed")?(navList.classList.remove("site-list--closed"),navToggle.classList.add("navigation__toggle--closed"),navClue.textContent="Закрыть меню."):(navList.classList.add("site-list--closed"),navToggle.classList.remove("navigation__toggle--closed"),navClue.textContent="Открыть меню.")}));