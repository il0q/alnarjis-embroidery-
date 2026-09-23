
const header=document.querySelector('header'); const menu=document.querySelector('.menu'); const links=document.querySelector('.links');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>40));
menu?.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links?.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
const cursor=document.querySelector('.cursor');
if(cursor){window.addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});document.querySelectorAll('a,.card,.tile,.btn').forEach(e=>{e.addEventListener('mouseenter',()=>cursor.classList.add('on'));e.addEventListener('mouseleave',()=>cursor.classList.remove('on'))})}
const hero=document.querySelector('.hero'); const video=document.querySelector('.hero video');
window.addEventListener('scroll',()=>{if(hero&&video&&scrollY<innerHeight*1.2){video.style.transform=`scale(${1.04+scrollY*.00035}) translateY(${scrollY*.08}px)`}});
