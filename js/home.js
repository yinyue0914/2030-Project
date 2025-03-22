(() =>{
    const setCopyRightYear = () =>{
        const copy = document.querySelector('footer>div>kbd');
        copy.innerHTML = `&copy; <span id="copyrightYear">${new Date().getFullYear()}</span> Mourad Bouguerra. All Rights Reserved.`;
    };
    
    document.addEventListener("DOMContentLoaded", setCopyRightYear);
})();

