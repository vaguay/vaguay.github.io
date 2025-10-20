// set active nav via body[data-page]
(function(){
    const page = document.body.getAttribute('data-page');
    document.querySelectorAll('.nav a').forEach(a=>{
    if(a.dataset.link === page){ a.classList.add('active'); }
    });
    })();
    
    
    // footer year
    (function(){
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
    })();