const tabSwitch = () => {
    const tabMenu = document.getElementsByClassName('js-tabMenu');
        for(let i = 0; i < tabMenu.length; i++){
            tabMenu[i].addEventListener('click', (e) => {
            document.getElementsByClassName('active')[0].classList.remove('active');
            e.target.classList.add('active');
            document.getElementsByClassName('show')[0].classList.remove('show');
            const arrayTabMenu = Array.prototype.slice.call(tabMenu);
            const index = arrayTabMenu.indexOf(e.target);
            const tabContents = document.getElementsByClassName('js-tabContents');
            tabContents[index].classList.add('show'); 
        });
    };
};
tabSwitch();

