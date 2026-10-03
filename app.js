const C=window.ORTOMAX_CATALOG;const qs=s=>document.querySelector(s);const qsa=s=>[...document.querySelectorAll(s)];const P=Object.fromEntries(C.products.map(p=>[p.id,p]));
function catBySlug(s){return C.categories.find(c=>c.slug===s)}
function productCard(p){return `<a class="productCard" href="proizvod.html?id=${encodeURIComponent(p.id)}"><img loading="lazy" src="${p.images[0]}" alt="${esc(p.name)}"><div class="productInfo"><b>${esc(p.name)}</b><small>${esc(p.subcategory)}</small></div></a>`}
function esc(s){return String(s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]))}
function header(){let mega=C.categories.map(c=>`<a href="kategorija.html?cat=${c.slug}">${esc(c.name)} →</a>`).join('');return `<div class="topbar"><div class="wrap"><div class="top-points"><span>◉ Besplatni saveti i podrška</span><span>▣ Brza informacija i ponuda</span><span>♢ Dostupni širom Srbije</span></div><div class="top-contact"><span>☎ +381 69 3344 727</span><span>✉ info@ortomax.rs</span></div></div></div><header class="header"><div class="wrap nav"><a href="index.html"><img class="logo" src="./logo.png" alt="OrtoMax"></a><nav class="navlinks"><a href="index.html">Početna</a><a href="#" id="catToggle">Ortopedska pomagala⌄</a><a href="kategorija.html?cat=deciji-program">Dečiji program</a><a href="o-nama.html">O nama</a><a href="kontakt.html">Kontakt</a></nav><a class="nav-cta" href="kontakt.html">Besplatna konsultacija →</a><button class="menuBtn" id="menuBtn">☰</button></div><div class="mega" id="mega">${mega}</div></header>`}
function footer(){     return `     <footer class="footer">         <div class="wrap">              <div class="footerGrid">                  <div class="footerBrand">                      <div class="footerSlogan">                         Pomagala sa svrhom,<br>                         podrška sa srcem<br>                         <strong>- VAŠ ORTOMAX !</strong>                     </div>                      <p>                         Vaš pouzdan partner za ortopedska pomagala,                         medicinsku opremu i rešenja za rehabilitaciju.                     </p>                      <p>                         <b>Zdraviji ljudi danas za lepše sutra.</b>                     </p>                  </div>                  <div>                     <h4>Brzi linkovi</h4>                      <p>                         <a href="index.html">Početna</a><br>                         <a href="o-nama.html">O nama</a><br>                         <a href="kategorije.html">Kategorije</a><br>                         <a href="kontakt.html">Kontakt</a>                     </p>                 </div>                  <div>                     <h4>Kategorije</h4>                      <p>                         ${C.categories.slice(0,6).map(c =>                             `<a href="kategorija.html?cat=${c.slug}">                                 ${esc(c.name)}                             </a>`                         ).join('<br>')}                     </p>                 </div>                  <div>                     <h4>Kontakt informacije</h4>                      <p>                         ☎ +381 69 3344 727<br>                         ✉ info@ortomax.rs<br>                         ⌖ Vojvode Stepe 63, Beograd<br>                         <a href="https://www.instagram.com/orto_max.pomagala/">                             Instagram                         </a>                     </p>                 </div>              </div>              <div class="subfooter">                 © 2026 OrtoMax. Sva prava zadržana.             </div>          </div>     </footer>     `; }{return `<footer class="footer"><div class="wrap"><div class="footerGrid"><div><img class="logo" src="./logo.png"><p>Vaš pouzdan partner za ortopedska pomagala, medicinsku opremu i rešenja za rehabilitaciju.</p><p><b>Zdraviji ljudi danas za lepše sutra.</b></p></div><div><h4>Brzi linkovi</h4><p><a href="index.html">Početna</a><br><a href="o-nama.html">O nama</a><br><a href="kategorije.html">Kategorije</a><br><a href="kontakt.html">Kontakt</a></p></div><div><h4>Kategorije</h4><p>${C.categories.slice(0,6).map(c=>`<a href="kategorija.html?cat=${c.slug}">${esc(c.name)}</a>`).join('<br>')}</p></div><div><h4>Kontakt informacije</h4><p>☎ +381 69 3344 727<br>✉ info@ortomax.rs<br>⌖ Vojvode Stepe 63, Beograd<br><a href="https://www.instagram.com/orto_max.pomagala/">Instagram</a></p></div></div><div class="subfooter">© 2026 OrtoMax. Sva prava zadržana.</div></div></footer>`}
function shell(){qs('#header').innerHTML=header();qs('#footer').innerHTML=footer();const t=qs('#catToggle'),m=qs('#mega'),b=qs('#menuBtn');if(t)t.onclick=e=>{e.preventDefault();m.classList.toggle('open')};if(b)b.onclick=()=>m.classList.toggle('open');document.addEventListener('click',e=>{if(m&&!m.contains(e.target)&&e.target!==t&&e.target!==b)m.classList.remove('open')})}
function home(){shell();const chosen=['Invalidska kolica','Hodalice i štake','Ortoze i pojasevi','Dečiji program','Toaletni program','Silikonski program'];qs('#categories').innerHTML=chosen.map(n=>{let c=C.categories.find(x=>x.name===n);let pid=c?.subcategories.flatMap(s=>s.products)[0];let p=P[pid];return `<a class="catCard" href="kategorija.html?cat=${c.slug}"><div class="catImg"><img loading="lazy" src="${p.images[0]}" alt="${esc(c.name)}"></div><div class="catBody"><span>${esc(c.name)}</span><span class="circleArrow">→</span></div></a>`}).join('');let picks=[];for(let c of C.categories){let ids=c.subcategories.flatMap(s=>s.products);if(ids[0])picks.push(P[ids[Math.min(1,ids.length-1)]]);if(picks.length>=6)break}qs('#popular').innerHTML=picks.map(productCard).join('')}
function category(){shell();let u=new URLSearchParams(location.search), cs=u.get('cat')||C.categories[0].slug, ss=u.get('sub'), c=catBySlug(cs)||C.categories[0];qs('#catTitle').textContent=c.name;qs('#crumb').textContent='Početna / Kategorije / '+c.name;let buttons=[`<button data-sub="" class="${!ss?'active':''}">Svi proizvodi</button>`].concat(c.subcategories.map(s=>`<button data-sub="${s.slug}" class="${ss===s.slug?'active':''}">${esc(s.name)} (${s.products.length})</button>`));qs('#subnav').innerHTML=buttons.join('');function render(sub){let ids=sub?(c.subcategories.find(s=>s.slug===sub)?.products||[]):c.subcategories.flatMap(s=>s.products);qs('#catalogProducts').innerHTML=ids.length?ids.map(id=>productCard(P[id])).join(''):'<div class="empty">Nema proizvoda.</div>';qsa('#subnav button').forEach(x=>x.classList.toggle('active',x.dataset.sub===sub))}render(ss||'');qsa('#subnav button').forEach(x=>x.onclick=()=>render(x.dataset.sub))}

function categories(){shell();const root=qs('#allCategories');root.innerHTML=C.categories.map(c=>{let first=c.subcategories.flatMap(s=>s.products)[0],p=P[first];return `<article class="allCatCard"><a class="allCatTop" href="kategorija.html?cat=${c.slug}"><img loading="lazy" src="${p?.images?.[0]||''}" alt="${esc(c.name)}"><div><div class="eyebrow">Kategorija</div><h2>${esc(c.name)}</h2><span>${c.subcategories.length} potkategorija →</span></div></a><div class="subLinks">${c.subcategories.map(sub=>`<a href="kategorija.html?cat=${c.slug}&sub=${sub.slug}">${esc(sub.name)} <b>${sub.products.length}</b></a>`).join('')}</div></article>`}).join('')}
function product(){shell();let id=new URLSearchParams(location.search).get('id'),p=P[id]||C.products[0];qs('#pCat').textContent=p.category+' / '+p.subcategory;qs('#pName').textContent=p.name;qs('#pSub').textContent=p.subcategory;qs('#mainImg').src=p.images[0];qs('#thumbs').innerHTML=p.images.map((im,i)=>`<img src="${im}" alt="${esc(p.name)} ${i+1}">`).join('');qsa('#thumbs img').forEach(x=>x.onclick=()=>qs('#mainImg').src=x.src);qs('#backCat').href='kategorija.html?cat='+slugify(p.category);function slugify(s){return C.categories.find(c=>c.name===s)?.slug||''}}
function about(){shell()}function contact(){shell()}document.addEventListener('DOMContentLoaded',()=>{let page=document.body.dataset.page;({home,categories,category,product,about,contact}[page]||shell)()});
/* =========================================================
   ORTOMAX — PREMIUM SCROLL ANIMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;


    /* ELEMENTI KOJI ULAZE ODOZDO */

    const revealSelectors = [
        ".sectionHead",
        ".catCard",
        ".productCard",
        ".allCatCard",
        ".trustItem",
        ".consult",
        ".missionPoint",
        "#pName",
        "#pSub",
        "#thumbs"
    ];


    /* ELEMENTI KOJI ULAZE SA LEVE STRANE */

    const leftSelectors = [
        ".missionCopy"
    ];


    /* ELEMENTI KOJI ULAZE SA DESNE STRANE */

    const rightSelectors = [
        ".missionPhoto",
        ".missionPoints"
    ];


    const prepareElements = () => {

        document
            .querySelectorAll(revealSelectors.join(","))
            .forEach(el => {
                if (!el.classList.contains("ortomax-visible")) {
                    el.classList.add("ortomax-reveal");
                }
            });


        document
            .querySelectorAll(leftSelectors.join(","))
            .forEach(el => {
                if (!el.classList.contains("ortomax-visible")) {
                    el.classList.add("ortomax-reveal-left");
                }
            });


        document
            .querySelectorAll(rightSelectors.join(","))
            .forEach(el => {
                if (!el.classList.contains("ortomax-visible")) {
                    el.classList.add("ortomax-reveal-right");
                }
            });

    };


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "ortomax-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );


    const observeElements = () => {

        document
            .querySelectorAll(
                ".ortomax-reveal, .ortomax-reveal-left, .ortomax-reveal-right"
            )
            .forEach(el => {

                if (!el.dataset.motionObserved) {

                    el.dataset.motionObserved = "true";

                    observer.observe(el);

                }

            });

    };


    /* PRVI LOAD */

    prepareElements();
    observeElements();


    /*
       Katalog i kartice kod tebe generiše JavaScript.
       Zato pratimo DOM i automatski animiramo
       nove kartice čim se pojave.
    */

    const mutationObserver = new MutationObserver(() => {

        prepareElements();
        observeElements();

    });


    mutationObserver.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );


    /* PRODUCT GALLERY FADE */

    const mainImage = document.querySelector("#mainImg");

    if (mainImage) {

        document.addEventListener("click", event => {

            const thumb = event.target.closest("#thumbs img");

            if (!thumb) return;

            mainImage.style.opacity = "0";
            mainImage.style.transform = "scale(.985)";

            setTimeout(() => {

                mainImage.style.opacity = "1";
                mainImage.style.transform = "scale(1)";

            }, 140);

        });

    }

});
